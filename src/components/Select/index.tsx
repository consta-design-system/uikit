import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import orderBy from 'lodash/orderBy';

import bem from '../../utils/bem';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePrevious } from '../../hooks/usePrevious';

import Input, { InputStub } from '../Input';
import Button from '../Button/Button';
import { Popover, Directions } from '../Popover';
import IconSelect from '../Icon/icons/Select';
import {
  checkValue,
  fireCloseEvent,
  getSelectedOptions,
  scrollIntoOption,
  SELECT_CLOSE_EVENT,
  SelectCloseEventDetail,
  filterOptions as filterOptionsByLabel,
  createFlatOptionValue,
  parseFlatOptionValue,
  getFlatOptionsList,
  NEW_OPTION_VALUE,
  getOptionsRelations,
  toggleValue,
} from './utils';
import { AutoResizeInput } from './AutoResizeInput';
import { MultiValueOption, IconClose } from './MultiValueOption';
import { OptionsList } from './OptionsList';
import './styles.css';

export type SelectOptionT = {
  value: string;
  label: string;
  subOptions?: SelectOptionT[];
};

export type SelectOptionWithLevelT = {
  value: string;
  label: string;
  level: number;
  originalValue: string;
  parentValue: string | null;
  selectedParentValue: string | null;
  selectionState: 'selected' | 'part' | 'none';
};

type CommonProps = {
  options: SelectOptionT[];
  name: string;
  onClearValue: () => void;
  isError?: boolean;
  placeholder?: string;
  onInputChange?: (value: string) => void;
  autoFocus?: boolean;
  autoOpen?: boolean;
  isDisabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  wpSize?: 'xs' | 's' | 'm' | 'l';
  formatLabel?: (option: SelectOptionWithLevelT) => React.ReactNode;
  filterOptions?: (
    options: SelectOptionWithLevelT[],
    inputValue: string,
  ) => SelectOptionWithLevelT[];
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
};

type SimpleValueT = string;
export type ObjectValueT = { value: string; level: number };

export type SelectValueTypeT = SimpleValueT | ObjectValueT;

type HierarchicalSelectProps<
  NonHierarchicalValueT extends SimpleValueT | SimpleValueT[],
  HierarchicalT extends ObjectValueT | ObjectValueT[]
> =
  | {
      isHierarchical?: false;
      onChange: (selectValue: NonHierarchicalValueT | undefined) => void;
      value?: NonHierarchicalValueT;
      excludedValues?: string[];
    }
  | {
      isHierarchical: true;
      onChange: (selectValue: HierarchicalT | undefined) => void;
      value?: HierarchicalT;
      excludedValues?: ObjectValueT[];
    };

type MultiValueProps = HierarchicalSelectProps<SimpleValueT[], ObjectValueT[]>;

type SingleValueProps = HierarchicalSelectProps<SimpleValueT, ObjectValueT>;

type CreatableValueProps = {
  onNewOptionCreate: (value: SelectOptionT) => void;
  newValueText: string;
};

export type SelectProps = CommonProps & SingleValueProps;

export type MultiSelectProps = CommonProps & MultiValueProps;

export type CreatableSelectProps = CreatableValueProps & SelectProps;

type MultiProps = {
  isMulti: true;
} & MultiValueProps;

type SingleProps = {
  isMulti?: false;
} & SingleValueProps;

type NonCreatableProps = {
  isCreatable?: false;
};

type CreatableProps = {
  isCreatable: true;
} & CreatableValueProps;

type BaseSelectProps = CommonProps &
  (SingleProps | MultiProps) &
  (CreatableProps | NonCreatableProps);

const b = bem('Select');

const IconArrow = ({ className }: { className?: string }) => (
  <IconSelect size={'s'} className={className} />
);

const SELECT_MENU_DIRECTIONS: Directions[] = ['bottom-center', 'top-center'];

const BaseSelect: React.FC<BaseSelectProps> = props => {
  const {
    isError,
    onInputChange,
    inputRef: ref,
    wpSize = 'm',
    placeholder,
    options: startOptions,
    value,
    name,
    onClearValue,
    onFocus,
    onBlur,
    isDisabled,
    isMulti,
    autoFocus,
    autoOpen,
    formatLabel,
    filterOptions = filterOptionsByLabel,
  } = props;

  const leveledValue = useMemo(() => {
    if (props.isMulti) {
      return props.isHierarchical
        ? (props.value && props.value.map(createFlatOptionValue)) || []
        : (props.value && props.value.map(v => createFlatOptionValue({ value: v, level: 0 }))) ||
            [];
    }

    return props.isHierarchical
      ? props.value && createFlatOptionValue(props.value)
      : props.value && createFlatOptionValue({ value: props.value, level: 0 });
  }, [props.value]);

  const allOptions: SelectOptionWithLevelT[] = useMemo(() => {
    const { list } = getFlatOptionsList(startOptions, leveledValue);
    return list;
  }, [JSON.stringify(startOptions), leveledValue]);

  const options = useMemo(() => {
    if (!props.excludedValues || !props.excludedValues.length) {
      return allOptions;
    }

    const excludedLeveledValues = props.isHierarchical
      ? (props.excludedValues && props.excludedValues.map(v => createFlatOptionValue(v))) || []
      : (props.excludedValues &&
          props.excludedValues.map(v => createFlatOptionValue({ value: v, level: 0 }))) ||
        [];

    return excludedLeveledValues.length
      ? allOptions.filter(
          o =>
            !excludedLeveledValues.includes(o.value) ||
            (Array.isArray(leveledValue)
              ? leveledValue.includes(o.value)
              : leveledValue === o.value),
        )
      : allOptions;
  }, [JSON.stringify(props.excludedValues), allOptions]);

  const prevOptions = usePrevious(options);

  const selectedOption = leveledValue ? getSelectedOptions(options, leveledValue) : null;
  const parentChildRelations = useMemo(() => getOptionsRelations(options, selectedOption), [
    props.value,
    options,
  ]);
  const rootRef = useRef<HTMLDivElement>(null);
  const updateScrollBuffer = useRef(false);
  const updateValuesScrollBuffer = useRef(false);
  const preserveInputValueBuffer = useRef(false);
  const blockMouseOverRef = useRef(false);
  const focusedElementRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || controlRef;

  const [inputValue, setInputValue] = useState(
    selectedOption && !Array.isArray(selectedOption) ? selectedOption.label : '',
  );
  const [availableOptions, setAvailableOptions] = useState(options);
  const [focusedOption, setFocusedOption] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);
  const [showMenu, setShowMenu] = useClickOutside();
  const availableOptionsValues = useMemo(() => {
    return availableOptions.map(item => item.value);
  }, [availableOptions]);

  const propagateEvent = useCallback(() => {
    if (rootRef.current) {
      rootRef.current.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    }
  }, [rootRef]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleCloseEvent = (e: CustomEvent<SelectCloseEventDetail>) => {
    e.stopPropagation();
    if (e.detail.target !== rootRef.current) {
      closeMenu();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setInputValue(inputValue);

    if (focusedOption) {
      setFocusedOption(undefined);
    }

    const trimmedInput = inputValue.trim();

    const addParentOptions = (
      optionsToFindParents: SelectOptionWithLevelT[],
      foundParents: SelectOptionWithLevelT[] = optionsToFindParents,
    ): SelectOptionWithLevelT[] => {
      if (!optionsToFindParents.length) {
        return [];
      }
      const parentValues = optionsToFindParents
        .filter(o => o.parentValue !== null)
        .map(o => o.parentValue);

      const parentOptions = options.filter(o => parentValues.includes(o.value));
      const notFoundParents = parentOptions.filter(o => !foundParents.includes(o));

      return [
        ...foundParents,
        ...notFoundParents,
        ...addParentOptions(notFoundParents, [...foundParents, ...notFoundParents]),
      ];
    };

    const filteredOptions = filterOptions(options, trimmedInput);
    const filteredValuesWithParents = addParentOptions(filteredOptions).map(o => o.value);
    const filteredOptionsWithParents = options.filter(o =>
      filteredValuesWithParents.includes(o.value),
    );

    const isIncludedExactLabel = filteredOptions.some(
      item => item.label.toLowerCase() === trimmedInput.toLowerCase(),
    );

    if (props.isCreatable && !isMulti && inputValue && !isIncludedExactLabel) {
      const newOption: SelectOptionWithLevelT = {
        value: createFlatOptionValue({ value: NEW_OPTION_VALUE, level: 0 }),
        originalValue: NEW_OPTION_VALUE,
        label: trimmedInput,
        level: 0,
        parentValue: null,
        selectedParentValue: null,
        selectionState: 'none',
      };

      setAvailableOptions([newOption, ...filteredOptionsWithParents]);
      props.onNewOptionCreate({
        value: newOption.originalValue,
        label: newOption.label,
      });
    } else {
      setAvailableOptions(filteredOptionsWithParents);
    }

    if (!showMenu) {
      preserveInputValueBuffer.current = true;
      setShowMenu(true);
    }

    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  const setSelectValue = useCallback(
    (newValue: string, removeValue?: boolean) => {
      if (newValue) {
        if (!props.isMulti) {
          if (props.isHierarchical) {
            props.onChange(parseFlatOptionValue(newValue));
          } else {
            props.onChange(parseFlatOptionValue(newValue).value);
          }
          closeMenu();
        }

        if (props.isMulti && Array.isArray(selectedOption) && Array.isArray(leveledValue)) {
          if (removeValue) {
            const { value: parsedNewValue } = parseFlatOptionValue(newValue);
            if (props.isHierarchical) {
              props.onChange((props.value || []).filter(v => v.value !== parsedNewValue));
            } else {
              props.onChange((props.value || []).filter(v => v !== parsedNewValue));
            }
          } else {
            const newValues = toggleValue({
              values: leveledValue,
              newValue,
              optionsRelations: parentChildRelations,
            });
            const parsedValues = orderBy(newValues.map(parseFlatOptionValue), o => o.level);

            if (props.isHierarchical) {
              props.onChange(parsedValues);
            } else {
              props.onChange(parsedValues.map(o => o.value));
            }
          }

          setInputValue('');
          setAvailableOptions(options);
        }
      }
    },
    [leveledValue, parentChildRelations],
  );

  const handleLabelClick = (e: React.MouseEvent) => {
    if (!isDisabled) {
      e.stopPropagation();

      if (!showMenu) {
        setShowMenu(true);
      }

      if (rootRef.current) {
        fireCloseEvent(rootRef.current);
      }
    }
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    if (!isDisabled) {
      e.preventDefault();
      e.stopPropagation();

      if (showMenu) {
        closeMenu();
        propagateEvent();
      } else {
        setShowMenu(true);

        if (inputRef.current) {
          inputRef.current.focus();
        }

        if (rootRef.current) {
          fireCloseEvent(rootRef.current);
        }
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClearValue) {
      onClearValue();
    }
    setInputValue('');
    setAvailableOptions(options);
    propagateEvent();
  };

  const handleDeleteMultiValue = (value: string) => {
    setSelectValue(value, true);

    if (!showMenu) {
      propagateEvent();
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!isDisabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (onFocus) {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (isFocused) {
      setIsFocused(false);

      if (onBlur) {
        onBlur(e);
      }
    }
  };

  const handleMouseMove = () => {
    blockMouseOverRef.current = false;
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    if (!blockMouseOverRef.current) {
      const target = e.target as HTMLElement;
      const value = target.dataset.value;

      if (value) {
        setFocusedOption(value);
      }
      updateScrollBuffer.current = false;
    }
  };

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (isMulti) {
        updateValuesScrollBuffer.current = true;
      } else {
        propagateEvent();
      }

      setSelectValue(value);
    },
    [isMulti, updateValuesScrollBuffer, setSelectValue],
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    blockMouseOverRef.current = true;
    if (e.key === 'ArrowUp') {
      const currentFocus = focusedOption ? availableOptionsValues.indexOf(focusedOption) : -1;

      if (currentFocus > 0) {
        setFocusedOption(availableOptionsValues[currentFocus - 1]);
      } else {
        setFocusedOption(availableOptionsValues[availableOptionsValues.length - 1]);
      }
      updateScrollBuffer.current = true;
    }

    if (e.key === 'ArrowDown') {
      const currentFocus = focusedOption ? availableOptionsValues.indexOf(focusedOption) : -1;

      setFocusedOption(availableOptionsValues[(currentFocus + 1) % availableOptionsValues.length]);
      updateScrollBuffer.current = true;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (focusedOption) {
        setSelectValue(focusedOption);
      }

      if (!isMulti) {
        setFocusedOption(undefined);
      }

      if (isMulti) {
        updateValuesScrollBuffer.current = true;
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    // Мешаем каретке возвращаться в начало или конец при выборе стрелками
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      return;
    }
  };

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;

    if (target !== menuRef.current && target !== valuesRef.current) {
      closeMenu();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showMenu) {
      e.stopPropagation();
      closeMenu();
      propagateEvent();
    }
  };

  useEffect(() => {
    if (
      !isMulti &&
      selectedOption &&
      !Array.isArray(selectedOption) &&
      selectedOption.label !== inputValue
    ) {
      setInputValue(selectedOption.label);
    } else if (!selectedOption || prevOptions !== options) {
      setInputValue('');
    }
  }, [selectedOption, isMulti, options]);

  useEffect(() => {
    const root = rootRef.current;

    if (showMenu && root && !isDisabled) {
      root.addEventListener('keydown', handleKeyDown);

      return () => {
        root.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showMenu, rootRef, focusedOption, availableOptions, selectedOption, isDisabled, isMulti]);

  useEffect(() => {
    if (!showMenu && focusedOption) {
      setFocusedOption(undefined);
    }
  }, [showMenu, focusedOption]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const focusedElement = focusedElementRef.current;

    if (updateScrollBuffer.current && menu && focusedElement) {
      scrollIntoOption(menu, focusedElement);
    }
    updateScrollBuffer.current = false;
  }, [focusedOption, menuRef, focusedElementRef, updateScrollBuffer]);

  useLayoutEffect(() => {
    const valuesContainer = valuesRef.current;

    if (updateValuesScrollBuffer.current && valuesContainer) {
      valuesContainer.scrollTop = valuesContainer.scrollHeight;
    }
    updateScrollBuffer.current = false;
  }, [updateValuesScrollBuffer, valuesRef, value]);

  useEffect(() => {
    setAvailableOptions(options);
  }, [options]);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('scroll', handleScroll, true);
    } else {
      document.removeEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [showMenu, menuRef, valuesRef]);

  useEffect(() => {
    if (showMenu) {
      if (preserveInputValueBuffer.current) {
        preserveInputValueBuffer.current = false;
      } else {
        setInputValue('');
      }

      if (!isMulti) {
        if (selectedOption && !Array.isArray(selectedOption)) {
          updateScrollBuffer.current = true;
          setFocusedOption(selectedOption.value);
          setAvailableOptions(options);
        }
      }

      window.addEventListener('keydown', handleEscape, true);
      window.addEventListener(SELECT_CLOSE_EVENT, handleCloseEvent as EventListener, true);

      return () => {
        window.removeEventListener('keydown', handleEscape, true);
        window.removeEventListener(SELECT_CLOSE_EVENT, handleCloseEvent as EventListener, true);
      };
    }

    if (!showMenu) {
      setAvailableOptions(options);
    }

    if (!showMenu && !isMulti) {
      setInputValue(selectedOption && !Array.isArray(selectedOption) ? selectedOption.label : '');
    }
  }, [showMenu, isMulti]);

  useLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    if (autoOpen) {
      setShowMenu(true);
    }
  }, []);

  const hasValue = checkValue(value);

  const popupPositionDeps = ([availableOptions.length] as any[]).concat(isMulti ? [value] : []);

  return (
    <div
      className={b({
        opened: showMenu,
        selected: hasValue,
        size: wpSize,
        isMulti,
        disabled: isDisabled,
      })}
      ref={rootRef}
    >
      <label
        className={b('label')}
        onClick={handleLabelClick}
        onMouseOver={handleMouseOver}
        onMouseMove={handleMouseMove}
      >
        {isMulti ? (
          <InputStub
            className={b('input', { focused: showMenu || isFocused, multi: true })}
            wpSize={wpSize}
            width="full"
            state={isError ? 'alert' : ''}
            disabled={isDisabled}
            view="default"
            form="default"
          >
            <div className={b('values')} ref={valuesRef}>
              {Array.isArray(selectedOption) &&
                selectedOption.map(item => (
                  <MultiValueOption
                    label={item.label}
                    value={item.value}
                    onDelete={handleDeleteMultiValue}
                    key={item.value}
                    wpSize={wpSize}
                  />
                ))}
              <div className={b('input-wrapper')}>
                <AutoResizeInput
                  autoComplete="off"
                  type="text"
                  value={inputValue}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  inputRef={inputRef}
                  disabled={isDisabled}
                  name={name}
                />
              </div>
            </div>
            {!inputValue && !hasValue && <div className={b('placeholder')}>{placeholder}</div>}
          </InputStub>
        ) : (
          <Input
            className={b('input', { focused: showMenu || isFocused })}
            wpSize={wpSize}
            width="full"
            autoComplete="off"
            view="default"
            form="default"
            state={isError ? 'alert' : ''}
            onChange={handleInputChange}
            inputRef={inputRef}
            placeholder={
              selectedOption && !Array.isArray(selectedOption) ? selectedOption.label : placeholder
            }
            value={inputValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            disabled={isDisabled}
            name={name}
          />
        )}

        <div className={b('icon', { type: 'arrow' })} onClick={handleArrowClick}>
          <div className={b('icon-wrapper')}>
            <IconArrow className={b('arrow', { opened: showMenu && !isDisabled })} />
          </div>
        </div>
        {!isDisabled && hasValue && (
          <>
            <span className={b('delimiter')} />
            <Button
              wpSize="xs"
              view="clear"
              iconOnly
              type="button"
              tabIndex={-1}
              className={b('icon', { type: 'delete' })}
              onClick={handleDeleteClick}
            >
              <div className={b('icon-wrapper')}>
                <IconClose
                  size={wpSize === 'l' || wpSize === 'm' ? 's' : 'xs'}
                  className={b('close')}
                />
              </div>
            </Button>
          </>
        )}
        <Popover
          className={b('menu')}
          anchor={rootRef}
          directions={SELECT_MENU_DIRECTIONS}
          visible={showMenu && !isDisabled}
          offset={4}
          popoverWidth={rootRef.current ? rootRef.current.offsetWidth : undefined}
          positionDependencies={popupPositionDeps}
        >
          <div className={b('options')} ref={menuRef}>
            <OptionsList
              availableOptions={availableOptions}
              selectedOption={selectedOption}
              parentChildRelations={parentChildRelations}
              isMulti={isMulti}
              focusedOption={focusedOption}
              focusedElementRef={focusedElementRef}
              formatLabel={formatLabel}
              handleOptionSelect={handleOptionSelect}
              name={name}
              isCreatable={props.isCreatable}
              newValueText={props.isCreatable ? props.newValueText : ''}
              expandAll={Boolean(inputValue)}
              isHierarchical={props.isHierarchical}
              wpSize={wpSize}
            />
          </div>
        </Popover>
      </label>
    </div>
  );
};

const MultiSelectComponent: React.FC<MultiSelectProps & { isDisabled?: false }> = props => {
  return <BaseSelect {...props} isMulti isDisabled={false} />;
};

const SelectComponent: React.FC<SelectProps> = props => {
  return <BaseSelect {...props} />;
};

const CreatableSelectComponent: React.FC<CreatableSelectProps> = props => {
  return <BaseSelect {...props} isCreatable />;
};

export const Select = memo(SelectComponent);
export const MultiSelect = memo(MultiSelectComponent);
export const CreatableSelect = memo(CreatableSelectComponent);
