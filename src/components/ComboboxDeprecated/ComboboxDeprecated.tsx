import React, { useRef, useState } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useSelect } from '../../hooks/useSelectDeprecated/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { cnSelect } from '../SelectComponentsDeprecated/cnSelect';
import { getSelectDropdownForm } from '../SelectComponentsDeprecated/helpers';
import { SelectContainer } from '../SelectComponentsDeprecated/SelectContainer/SelectContainer';
import {
  RenderItemProps,
  SelectDropdown,
} from '../SelectComponentsDeprecated/SelectDropdown/SelectDropdown';
import { SelectItem } from '../SelectComponentsDeprecated/SelectItem/SelectItem';
import {
  CommonSelectProps,
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
} from '../SelectComponentsDeprecated/types';

type SelectContainerProps = React.ComponentProps<typeof SelectContainer>;

export type ComboboxSelectProps<ITEM> = CommonSelectProps<ITEM> &
  Omit<SelectContainerProps, 'value' | 'onChange' | 'children'> & {
    value?: ITEM | null | undefined;
    onChange?(v: ITEM | null): void;
    onCreate?(str: string): void;
    getGroupOptions?(group: ITEM): ITEM[];
    labelForCreate?: string;
    labelForNotFound?: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
  };

type ComboboxType = <ITEM>(props: ComboboxSelectProps<ITEM>) => React.ReactElement | null;

export const Combobox: ComboboxType = (props) => {
  const defaultOptionsRef = useRef<HTMLDivElement | null>(null);
  const getOptionKeyDefault = props.getOptionLabel;
  const {
    placeholder,
    onBlur,
    onFocus,
    options,
    onChange,
    value,
    getOptionLabel,
    getOptionKey = getOptionKeyDefault,
    disabled,
    ariaLabel,
    id,
    form = DefaultPropForm,
    view = DefaultPropView,
    size = DefaultPropSize,
    dropdownClassName,
    onCreate,
    getGroupOptions,
    labelForCreate = 'Добавить',
    labelForNotFound = 'Не найдено',
    dropdownRef = defaultOptionsRef,
    name,
    inputRef,
    ...restProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [inputData, setInputData] = useState<{ value: string | undefined }>({
    value: '',
  });
  const toggleRef = useRef<HTMLInputElement>(null);

  type Item = Exclude<typeof value, null | undefined>;

  const handlerChangeValue = (v: typeof value): void => {
    if (typeof onChange === 'function' && v) {
      onChange(v);
    }
    setInputData({ value: toggleRef.current?.value });
  };

  const controlRef = useRef<HTMLDivElement | null>(null);
  const arrValue = typeof value !== 'undefined' && value !== null ? [value] : null;
  const hasGroup = typeof getGroupOptions === 'function';

  const scrollToIndex = (index: number): void => {
    if (!dropdownRef.current) {
      return;
    }

    const elements: NodeListOf<HTMLDivElement> = dropdownRef.current.querySelectorAll(
      'div[role=option]',
    );

    if (index > elements.length - 1 || index < 0) {
      return;
    }

    scrollIntoView(elements[index], dropdownRef.current);
  };

  const searchFunctionDefault = (item: typeof value, searchValue: string): boolean => {
    const searchValueLowerCase = searchValue.toLowerCase();

    return getOptionLabel(item as Item)
      .toLowerCase()
      .includes(searchValueLowerCase);
  };

  const {
    visibleOptions,
    highlightedIndex,
    getToggleProps,
    getOptionProps,
    isOpen,
    setOpen,
  } = useSelect({
    options,
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef: dropdownRef,
    controlRef,
    scrollToIndex,
    disabled,
    getOptionLabel,
    getOptionKey,
    searchFunction: searchFunctionDefault,
    onCreate,
    getGroupOptions,
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
    if (isOpen) {
      toggleRef.current?.focus();
      return;
    }

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
    typeof onChange === 'function' && onChange(null);
    const inputValue = toggleRef.current?.value ?? '';
    setInputData({ value: inputValue });
  };

  const handleControlClick = (): void => {
    toggleRef.current?.focus();
  };

  const showPlaceholder =
    (!arrValue?.length && inputData.value === '') || (arrValue === null && inputData.value === '');

  const showInput = arrValue !== null && arrValue.length > 0;

  const handleCreate = (): void => {
    if (typeof onCreate === 'function') {
      const newValue = toggleRef.current?.value.trim();
      newValue && onCreate(newValue);
    }
  };

  const renderItemDefault = (props: RenderItemProps<typeof value>) => {
    const { item, id: itemId, active, hovered, ...restProps } = props;
    if (!item) {
      return null;
    }
    const label = getOptionLabel(item);
    const indent = form === 'round' ? 'increased' : 'normal';
    return (
      <SelectItem
        id={itemId}
        label={label}
        item={item}
        active={active}
        hovered={hovered}
        multiple={false}
        size={size}
        indent={indent}
        {...restProps}
      />
    );
  };

  return (
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      view={view}
      form={form}
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
        >
          <div className={cnSelect('ControlValueContainer')}>
            {arrValue && (
              <span className={cnSelect('ControlValue')}>{getOptionLabel(arrValue[0])}</span>
            )}
            {showPlaceholder && <span className={cnSelect('Placeholder')}>{placeholder}</span>}
            <input
              {...getToggleProps({ onChange: handleInputChange })}
              type="text"
              name={name}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-label={ariaLabel}
              ref={useForkRef([toggleRef, inputRef])}
              value={inputData.value}
              className={cnSelect('Input', { size, hide: showInput })}
            />
          </div>
        </div>
        <span className={cnSelect('Indicators')}>
          {arrValue && (
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
          <span className={cnSelect('Delimiter')} />
          <button
            type="button"
            className={cnSelect('IndicatorsDropdown')}
            tabIndex={-1}
            onClick={handleToggleDropdown}
          >
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </span>
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
        getOptionKey={getOptionKey}
        labelForCreate={labelForCreate}
        labelForNotFound={labelForNotFound}
        form={getSelectDropdownForm(form)}
        className={dropdownClassName}
        renderItem={renderItemDefault}
      />
    </SelectContainer>
  );
};
