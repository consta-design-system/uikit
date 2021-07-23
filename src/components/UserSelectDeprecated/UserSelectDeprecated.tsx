import React, { RefObject, useRef, useState } from 'react';

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
import {
  DefaultPropForm,
  DefaultPropView,
  PropForm,
  PropView,
} from '../SelectComponentsDeprecated/types';

import { UserSelectItem } from './UserSelectItem/UserSelectItem';
import { UserSelectValue } from './UserSelectValue/UserSelectValue';

export const userSelectPropSize = ['m', 's', 'l'] as const;
export type UserSelectPropSize = typeof userSelectPropSize[number];
export const userSelectPropSizeDefault = userSelectPropSize[0];

export type UserSelectProps<ITEM, GROUP> = {
  placeholder?: string;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (v: ITEM[] | null) => void;
  getOptionLabel(arg: ITEM): string;
  getOptionKey?(arg: ITEM): string | number;
  getOptionAvatarUrl?(arg: ITEM): string;
  getOptionAdditionalInfo?(arg: ITEM): string;
  searchFunction?(item: ITEM, searchValue: string): boolean;
  ariaLabel?: string;
  id: string;
  dropdownClassName?: string;
  dropdownRef?: RefObject<HTMLDivElement>;
  name?: string;
  labelForNotFound?: string;
  value?: ITEM[] | null;
  size?: UserSelectPropSize;
  disabled?: boolean;
  form?: PropForm;
  view?: PropView;
  multiple?: boolean;
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

type UserSelect = <ITEM, GROUP>(props: UserSelectProps<ITEM, GROUP>) => React.ReactElement | null;

export const UserSelect: UserSelect = (props) => {
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
    getOptionAdditionalInfo,
    getOptionAvatarUrl,
    searchFunction,
    disabled,
    ariaLabel,
    id,
    form = DefaultPropForm,
    view = DefaultPropView,
    size = userSelectPropSizeDefault,
    getGroupOptions,
    labelForNotFound = 'Не найдено',
    dropdownClassName,
    dropdownRef = defaultOptionsRef,
    name,
    multiple = false,
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

  const handlerChangeValue = (values: Items): void => {
    if (typeof onChange === 'function' && values) {
      onChange(values);
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

  const searchFunctionDefault = (item: Item, searchValue: string): boolean => {
    const searchValueLowerCase = searchValue.toLowerCase();
    const label = getOptionLabel(item)
      .toLowerCase()
      .includes(searchValueLowerCase);
    const additionalInfo = getOptionAdditionalInfo
      ? getOptionAdditionalInfo(item)
          .toLowerCase()
          .includes(searchValueLowerCase)
      : false;
    return label || additionalInfo;
  };

  const searchFn = searchFunction || searchFunctionDefault;

  const {
    visibleOptions,
    highlightedIndex,
    getToggleProps,
    getOptionProps,
    isOpen,
    setOpen,
  } = useSelect({
    options: options as Item[],
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef: dropdownRef,
    controlRef,
    scrollToIndex,
    disabled,
    getOptionLabel,
    getOptionKey,
    searchFunction: searchFn,
    getGroupOptions: getGroupOptions as undefined,
    multiple,
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

  const renderItemDefault = (props: RenderItemProps<Item>) => {
    const { item, id: itemId, active, hovered, ...restProps } = props;
    const label = getOptionLabel(item);
    const subLabel = getOptionAdditionalInfo ? getOptionAdditionalInfo(item) : '';
    const url = getOptionAvatarUrl ? getOptionAvatarUrl(item) : '';
    const indent = form === 'round' ? 'increased' : 'normal';
    return (
      <UserSelectItem
        id={itemId}
        label={label}
        subLabel={subLabel}
        url={url}
        active={active}
        hovered={hovered}
        size={size}
        indent={indent}
        {...restProps}
      />
    );
  };

  const inputStyle = React.useMemo(() => getInputStyle(), [inputData.value, arrValue]);

  return (
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      view={view}
      form={form}
      multiple
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
            <div className={cnSelect('ControlValue', { isUserSelect: true })}>
              {arrValue?.map((option) => {
                const label = getOptionLabel(option);
                const subLabel = getOptionAdditionalInfo ? getOptionAdditionalInfo(option) : '';
                const url = getOptionAvatarUrl ? getOptionAvatarUrl(option) : '';
                const handleRemove = (e: React.SyntheticEvent): void => {
                  e.stopPropagation();
                  handleRemoveValue(option);
                };

                return (
                  <UserSelectValue
                    url={url}
                    label={label}
                    subLabel={subLabel}
                    key={label}
                    size={size}
                    disabled={Boolean(disabled)}
                    onCancel={handleRemove}
                  />
                );
              })}
              <input
                {...getToggleProps({ onChange: handleInputChange })}
                type="text"
                name={name}
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
          {arrValue && arrValue.length !== 0 && !disabled && (
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
        dropdownRef={dropdownRef}
        inputValue={inputData.value}
        id={id}
        hasGroup={hasGroup}
        selectedValues={arrValue}
        labelForNotFound={labelForNotFound}
        getOptionKey={getOptionKey}
        form={getSelectDropdownForm(form)}
        className={dropdownClassName}
        renderItem={renderItemDefault}
      />
      <div className={cnSelect('HelperInputFakeElement')} ref={helperInputFakeElement}>
        {inputData.value}
      </div>
    </SelectContainer>
  );
};
