import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { cnSelect } from '../SelectComponents/cnSelect';
import { getSelectDropdownForm } from '../SelectComponents/helpers';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import { SelectValueTag } from '../SelectComponents/SelectValueTag/SelectValueTag';
import { CommonSelectProps, DefaultPropForm, DefaultPropView } from '../SelectComponents/types';

type SelectContainerProps = React.ComponentProps<typeof SelectContainer>;

export const multiComboboxPropSize = ['m', 's', 'l'] as const;
export type MultiComboboxPropSize = typeof multiComboboxPropSize[number];
export const multiComboboxPropSizeDefault = multiComboboxPropSize[0];

export type MultiComboboxProps<ITEM, GROUP> = Omit<CommonSelectProps<ITEM>, 'options'> &
  Omit<SelectContainerProps, 'value' | 'onChange'> & {
    onChange?: (v: ITEM[] | null) => void;
    onCreate?: (str: string) => void;
    labelForCreate?: string;
    labelForNotFound?: string;
    value?: ITEM[] | null;
    size?: MultiComboboxPropSize;
  } & (
    | {
        options: ITEM[];
        getGroupOptions: never;
      }
    | {
        options: GROUP[];
        getGroupOptions?: (group: GROUP) => ITEM[];
      }
  );

type MultiCombobox = <ITEM, GROUP>(
  props: MultiComboboxProps<ITEM, GROUP>,
) => React.ReactElement | null;

export const MultiCombobox: MultiCombobox = (props) => {
  const defaultOptionsRef = useRef<HTMLDivElement | null>(null);
  const {
    placeholder,
    onBlur,
    onFocus,
    options,
    onChange,
    value,
    getOptionLabel,
    disabled,
    ariaLabel,
    id,
    form = DefaultPropForm,
    view = DefaultPropView,
    size = multiComboboxPropSizeDefault,
    onCreate,
    getGroupOptions,
    labelForCreate = 'Добавить',
    labelForNotFound = 'Не найдено',
    dropdownClassName,
    dropdownRef = defaultOptionsRef,
    ...restProps
  } = props;

  type Items = typeof value;
  type Item = Exclude<Items, null | undefined>[number];

  const [isFocused, setIsFocused] = useState(false);
  const [inputData, setInputData] = useState<{ value: string | undefined }>({
    value: '',
  });

  const toggleRef = useRef<HTMLInputElement>(null);
  const controlInnerRef = useRef<HTMLDivElement>(null);
  const helperInputFakeElement = useRef<HTMLDivElement>(null);

  const handlerChangeValue = (v: Items): void => {
    if (typeof onChange === 'function' && v) {
      onChange(v);
    }
    setInputData({ value: toggleRef.current?.value });
  };

  const controlRef = useRef<HTMLDivElement | null>(null);
  const arrValue: Items = typeof value !== 'undefined' && value !== null ? [...value] : null;
  const hasGroup = typeof getGroupOptions === 'function';

  const scrollToIndex = (index: number): void => {
    if (!dropdownRef.current) {
      return;
    }

    const elements: NodeListOf<HTMLDivElement> = dropdownRef.current.querySelectorAll(
      'div[role=option]',
    );

    scrollIntoView(elements[index], dropdownRef.current);
  };

  const onSelectOption = (): void => {
    setInputData({ value: '' });
  };

  const {
    visibleOptions,
    highlightedIndex,
    getToggleProps,
    getOptionProps,
    isOpen,
    setOpen,
    // пирвел к типам в дальнейшем надо будет нормально типизировать useSelect
  } = useSelect({
    options: options as Item[],
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef: dropdownRef,
    controlRef,
    scrollToIndex,
    disabled,
    getOptionLabel,
    onCreate,
    getGroupOptions: getGroupOptions as undefined,
    multi: true,
    onSelectOption,
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (isFocused) {
      setIsFocused(false);

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    }
  };

  const handleToggleDropdown = (): void => {
    if (isOpen) {
      setOpen(false);
      setIsFocused(false);
    } else {
      setOpen(true);
      setIsFocused(true);
      toggleRef.current?.focus();
    }
  };

  const handleClear = (): void => {
    setInputData({ value: '' });
    typeof onChange === 'function' && onChange(null);
    setIsFocused(false);
  };

  const handleClearButtonFocus = (): void => {
    setIsFocused(true);
  };

  const handleClearButtonBlur = (): void => {
    setIsFocused(false);
  };

  const handleInputChange = (): void => {
    if (!isOpen) {
      setOpen(true);
    }
    const inputValue = toggleRef.current?.value ?? '';
    setInputData({ value: inputValue });
  };

  const handleControlClick = (): void => {
    toggleRef.current?.focus();
    if (!isFocused) {
      setOpen(!isOpen);
    }
  };

  const showPlaceholder =
    (!arrValue?.length && inputData.value === '') || (arrValue === null && inputData.value === '');

  const handleCreate = (): void => {
    if (typeof onCreate === 'function') {
      const newValue = toggleRef.current?.value.trim();
      newValue && onCreate(newValue);
    }
  };

  const handleRemoveValue = (option: Item): void => {
    const newVal = arrValue?.filter((arrVal) => getOptionLabel(arrVal) !== getOptionLabel(option));
    handlerChangeValue(newVal);
  };

  const getInputStyle = (): {
    width: number;
  } => {
    if (!controlInnerRef.current || !helperInputFakeElement.current) {
      return {
        width: 0,
      };
    }
    const fakeElWidth = helperInputFakeElement.current.offsetWidth + 20;
    const maxWidth = controlInnerRef.current ? controlInnerRef.current.offsetWidth - 15 : 0;
    const width = fakeElWidth > maxWidth ? maxWidth : fakeElWidth;

    return {
      width,
    };
  };

  const inputStyle = React.useMemo(() => getInputStyle(), [inputData.value, arrValue]);

  return (
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      view={view}
      form={form}
      multi
      {...restProps}
    >
      <div
        className={cnSelect('Control', { hasInput: true })}
        ref={controlRef}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id={id}
      >
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          className={cnSelect('ControlInner')}
          onClick={handleControlClick}
          onKeyDown={handleControlClick}
          role="button"
          ref={controlInnerRef}
        >
          <div className={cnSelect('ControlValueContainer')}>
            <div className={cnSelect('ControlValue')}>
              {arrValue?.map((option) => {
                const label = getOptionLabel(option);
                const handleRemove = (e: React.SyntheticEvent): void => {
                  e.stopPropagation();
                  handleRemoveValue(option);
                };
                return (
                  <SelectValueTag
                    label={label}
                    key={label}
                    size={size}
                    disabled={Boolean(disabled)}
                    handleRemove={handleRemove}
                  />
                );
              })}
              <input
                {...getToggleProps({ onChange: handleInputChange })}
                type="text"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                aria-label={ariaLabel}
                ref={toggleRef}
                value={inputData.value}
                className={cnSelect('Input', { size })}
                style={inputStyle}
              />
              <div className={cnSelect('Placeholder', { isHidden: !showPlaceholder })}>
                {placeholder}
              </div>
            </div>
          </div>
        </div>
        <div className={cnSelect('Indicators')}>
          {arrValue && arrValue.length !== 0 && (
            <button
              type="button"
              onClick={handleClear}
              className={cnSelect('ClearIndicator', [cnMixFocus()])}
              onFocus={handleClearButtonFocus}
              onBlur={handleClearButtonBlur}
            >
              <IconClose size="xs" className={cnSelect('ClearIndicatorIcon')} />
            </button>
          )}
          <div className={cnSelect('Delimiter')} />
          <button
            type="button"
            className={cnSelect('IndicatorsDropdown')}
            tabIndex={-1}
            onClick={handleToggleDropdown}
          >
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </div>
      </div>
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={controlRef}
        visibleOptions={visibleOptions}
        highlightedIndex={highlightedIndex}
        getOptionProps={getOptionProps}
        onCreate={handleCreate}
        dropdownRef={dropdownRef}
        inputValue={inputData.value}
        id={id}
        hasGroup={hasGroup}
        selectedValues={arrValue}
        labelForCreate={labelForCreate}
        labelForNotFound={labelForNotFound}
        multi
        getOptionLabel={getOptionLabel}
        form={getSelectDropdownForm(form)}
        className={dropdownClassName}
      />
      <div className={cnSelect('HelperInputFakeElement')} ref={helperInputFakeElement}>
        {inputData.value}
      </div>
    </SelectContainer>
  );
};
