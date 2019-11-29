import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import differenceBy from 'lodash/differenceBy';
import difference from 'lodash/difference';

import bem from '../../utils/bem';
import Input, { InputStub } from '../Input';
import Popover, { Directions } from '../Popover';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePrevious } from '../../hooks/usePrevious';
import { WpSize } from '../types';
import { Button } from '../';
import {
  checkValue,
  fireCloseEvent,
  getIntermediateMultiValues,
  getMultiValues,
  getValue,
  scrollIntoOption,
  SELECT_CLOSE_EVENT,
  SelectCloseEventDetail,
  filterOptions as filterOptionsByLabel,
} from './utils';
import { AutoResizeInput } from './AutoResizeInput';
import { MultiValueOption } from './MultiValueOption';
import { Option, EmptyOption, NewOption } from './Option';

import './styles.css';

export type SelectOptionT = {
  value: string;
  label: string;
};

type NewOptionValueType = 'new';

export const NEW_OPTION_VALUE: NewOptionValueType = 'new';

export type NewOptionT = {
  value: NewOptionValueType;
  label: string;
};

type CommonProps = {
  options: SelectOptionT[];
  name: string;
  onClearValue: () => void;
  isError?: boolean;
  allOption?: SelectOptionT;
  excludedOptions?: SelectOptionT[];
  placeholder?: string;
  onInputChange?: (value: string) => void;
  autoFocus?: boolean;
  autoOpen?: boolean;
  isDisabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  wpSize: WpSize;
  formatLabel?: (option: SelectOptionT) => React.ReactNode;
  filterOptions?: (options: SelectOptionT[], inputValue: string) => SelectOptionT[];
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
};

type MultiValueProps = {
  onChange: (selectValue: string[]) => void;
  value?: string[];
};

type SingleValueProps = {
  onChange: (selectValue: string) => void;
  value?: string;
};

type CreatableValueProps = {
  onNewOptionCreate: (value: NewOptionT) => void;
  newValueText: string;
};

export type SelectProps = CommonProps & SingleValueProps;

export type MultiSelectProps = CommonProps & MultiValueProps;

export type CreatableSelectProps = SelectProps & CreatableValueProps;

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

export const IconClose = ({ className, size }: { className?: string; size: 's' | 'xs' }) =>
  size == 's' ? (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1.757.343L.343 1.757 4.586 6 .343 10.243l1.414 1.414L6 7.414l4.243 4.243 1.414-1.414L7.414 6l4.243-4.243L10.243.343 6 4.586 1.757.343z" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M2.16423 9.15573L2.84989 9.84958L5.99996 6.69962L9.14923 9.84898L9.15003 9.84978L9.84984 9.14986L6.69987 5.99973L9.85003 2.84969L9.14293 2.14258L6.0006 5.30042L2.85076 2.15041L2.15009 2.84961L5.30242 6.00205L2.16423 9.15573Z"
        fill="black"
      />
    </svg>
  );

const IconArrow = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2 2h12v12H2z" />
    <path d="M8 10.5L12 6H4l4 4.5z" fill="currentColor" />
  </svg>
);

const MENU_DIRECTIONS: Directions[] = ['bottom-center', 'top-center'];

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
    allOption,
    autoFocus,
    autoOpen,
    excludedOptions,
    formatLabel,
    filterOptions = filterOptionsByLabel,
  } = props;
  const allOptions = useMemo(() => {
    if (allOption) {
      return [allOption, ...startOptions];
    }

    return startOptions;
  }, [JSON.stringify(allOption), JSON.stringify(startOptions)]);
  const options = useMemo(() => {
    return excludedOptions && excludedOptions.length
      ? differenceBy(allOptions, excludedOptions, 'value')
      : allOptions;
  }, [JSON.stringify(excludedOptions), allOptions]);
  const prevOptions = usePrevious(options);
  const selectedValue = value && getValue(allOptions, value, allOption);
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
    selectedValue && !Array.isArray(selectedValue) ? selectedValue.label : '',
  );
  const [availableOptions, setAvailableOptions] = useState(options);
  const [focusedOption, setFocusedOption] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);
  const [showMenu, setShowMenu] = useClickOutside();
  const values = useMemo(() => {
    return availableOptions.map(item => item.value);
  }, [availableOptions]);
  const isAllOptionSelected = useMemo(() => {
    if (allOption && selectedValue && Array.isArray(selectedValue)) {
      return Boolean(selectedValue.find(item => item.value === allOption.value));
    }

    return false;
  }, [allOption, selectedValue]);
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
    const filteredOptions = filterOptions(options, trimmedInput);
    const isIncludedExactLabel = filteredOptions.some(
      item => item.label.toLowerCase() === trimmedInput.toLowerCase(),
    );

    if (props.isCreatable && !isMulti && inputValue && !isIncludedExactLabel) {
      const newOption: NewOptionT = {
        value: NEW_OPTION_VALUE,
        label: trimmedInput,
      };

      setAvailableOptions([newOption, ...filteredOptions]);
      props.onNewOptionCreate(newOption);
    } else {
      setAvailableOptions(filteredOptions);
    }

    if (!showMenu) {
      preserveInputValueBuffer.current = true;
      setShowMenu(true);
    }

    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  const setSelectValue = (newValue: string, removeValue?: boolean) => {
    if (newValue) {
      if (!props.isMulti) {
        props.onChange(newValue);
        closeMenu();
      }

      if (props.isMulti) {
        const selectedValues =
          isAllOptionSelected && allOption && newValue !== allOption.value
            ? getIntermediateMultiValues(values, newValue, allOption && allOption.value)
            : getMultiValues({
                values: props.value || [],
                newValue,
                remove: removeValue,
                allOption: allOption && allOption.value,
              });

        const notSelectedOptions = difference(values, selectedValues);
        const isSelectedAllOptionsExceptCommon =
          allOption &&
          newValue !== allOption.value &&
          notSelectedOptions.length === 1 &&
          notSelectedOptions[0] === allOption.value;

        props.onChange(
          isSelectedAllOptionsExceptCommon && allOption ? [allOption.value] : selectedValues,
        );
        setInputValue('');
        setAvailableOptions(options);
      }
    }
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isDisabled && !showMenu) {
      setShowMenu(true);
    }

    if (rootRef.current) {
      fireCloseEvent(rootRef.current);
    }
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (showMenu) {
      closeMenu();
      propagateEvent();
    } else if (!isDisabled) {
      setShowMenu(true);

      if (inputRef.current) {
        inputRef.current.focus();
      }

      if (rootRef.current) {
        fireCloseEvent(rootRef.current);
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

  const handleDeleteMultiValue = (optionValue: string) => {
    setSelectValue(optionValue, true);

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

  const handleOptionSelect = (value: string) => {
    if (isMulti) {
      updateValuesScrollBuffer.current = true;
    } else {
      propagateEvent();
    }
    setSelectValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    blockMouseOverRef.current = true;
    if (e.key === 'ArrowUp') {
      const currentFocus = focusedOption ? values.indexOf(focusedOption) : -1;

      if (currentFocus > 0) {
        setFocusedOption(values[currentFocus - 1]);
      } else {
        setFocusedOption(values[values.length - 1]);
      }
      updateScrollBuffer.current = true;
    }

    if (e.key === 'ArrowDown') {
      const currentFocus = focusedOption ? values.indexOf(focusedOption) : -1;

      setFocusedOption(values[(currentFocus + 1) % values.length]);
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
      selectedValue &&
      !Array.isArray(selectedValue) &&
      selectedValue.label !== inputValue
    ) {
      setInputValue(selectedValue.label);
    }

    if (!selectedValue && prevOptions !== options) {
      setInputValue('');
    }
  }, [selectedValue, isMulti, options]);

  useEffect(() => {
    const root = rootRef.current;

    if (showMenu && root && !isDisabled) {
      root.addEventListener('keydown', handleKeyDown);

      return () => {
        root.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showMenu, rootRef, focusedOption, availableOptions, selectedValue, isDisabled, isMulti]);

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
        if (selectedValue && !Array.isArray(selectedValue)) {
          updateScrollBuffer.current = true;
          setFocusedOption(selectedValue.value);
        }
        setAvailableOptions(options);
      }

      window.addEventListener('keydown', handleEscape, true);
      window.addEventListener(SELECT_CLOSE_EVENT, handleCloseEvent as EventListener, true);

      return () => {
        window.removeEventListener('keydown', handleEscape, true);
        window.removeEventListener(SELECT_CLOSE_EVENT, handleCloseEvent as EventListener, true);
      };
    }

    if (!showMenu && !isMulti) {
      setInputValue(selectedValue && !Array.isArray(selectedValue) ? selectedValue.label : '');
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
              {Array.isArray(selectedValue) &&
                selectedValue.map(item => (
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
              selectedValue && !Array.isArray(selectedValue) ? selectedValue.label : placeholder
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
          <span className={b('delimiter')} />
          <div className={b('icon-wrapper')}>
            <IconArrow className={b('arrow', { opened: showMenu && !isDisabled })} />
          </div>
        </div>
        {!isDisabled && hasValue && (
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
        )}
        <Popover
          className={b('menu')}
          anchor={rootRef}
          directions={MENU_DIRECTIONS}
          visible={showMenu && !isDisabled}
          offset={4}
          popoverWidth={rootRef.current ? rootRef.current.offsetWidth : undefined}
          positionDependencies={isMulti ? [value] : undefined}
        >
          <div className={b('options')} ref={menuRef}>
            {!availableOptions.length && <EmptyOption>Нет подходящих вариантов</EmptyOption>}
            {availableOptions.map(option => {
              const { value, label } = option;
              const isSelected = Array.isArray(selectedValue)
                ? Boolean(selectedValue.find(item => item.value === value))
                : selectedValue && selectedValue.value === value;
              const isIntermediate =
                isMulti &&
                Boolean(allOption && allOption.value === value) &&
                !isAllOptionSelected &&
                Array.isArray(selectedValue) &&
                selectedValue.length > 0;

              return (
                <Option
                  key={value}
                  isSelected={Boolean(isSelected) || isAllOptionSelected}
                  isNewOption={value === 'new'}
                  isIntermediate={isIntermediate}
                  isFocused={value === focusedOption}
                  isAllOption={allOption && allOption.value === value}
                  isSubOption={allOption && allOption.value !== value}
                  value={value}
                  isMulti={isMulti}
                  focusedRef={value === focusedOption ? focusedElementRef : undefined}
                  onSelect={handleOptionSelect}
                  wpSize={wpSize}
                >
                  {props.isCreatable && value === 'new' ? (
                    <NewOption placeholder={props.newValueText}>{label}</NewOption>
                  ) : formatLabel ? (
                    formatLabel(option)
                  ) : (
                    label
                  )}
                </Option>
              );
            })}
          </div>
        </Popover>
      </label>
    </div>
  );
};

const MultiSelectComponent: React.FC<MultiSelectProps> = props => {
  return <BaseSelect {...props} isMulti />;
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
