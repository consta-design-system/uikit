import '../SelectComponentsDeprecated/Select.css';

import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelectDeprecated/useSelect';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
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

export type SimpleSelectProps<ITEM> = CommonSelectProps<ITEM> &
  Omit<SelectContainerProps, 'value' | 'onChange'> & {
    value?: ITEM | null;
    onChange?: (v: ITEM | null) => void;
  };

type Select = <ITEM>(props: SimpleSelectProps<ITEM>) => React.ReactElement | null;

export const BasicSelect: Select = (props) => {
  const defaultOptionsRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);
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
    dropdownRef = defaultOptionsRef,
    form = DefaultPropForm,
    view = DefaultPropView,
    size = DefaultPropSize,
    dropdownClassName,
    name,
    ...restProps
  } = usePropsHandler(cnSelect(), props, controlRef);
  const toggleRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  type Item = Exclude<typeof value, null | undefined>;

  const handlerChangeValue = (v: typeof value): void => {
    if (typeof onChange === 'function' && v) {
      onChange(v);
    }
  };

  const arrValue = typeof value !== 'undefined' && value !== null ? [value] : null;

  const scrollToIndex = (index: number): void => {
    if (!dropdownRef.current) {
      return;
    }

    const elements: NodeListOf<HTMLDivElement> = dropdownRef.current.querySelectorAll(
      'div[role=option]',
    );

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
        className={cnSelect('Control')}
        ref={controlRef}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id={id}
      >
        <div className={cnSelect('ControlInner')}>
          <div className={cnSelect('ControlValueContainer')}>
            <input
              {...getToggleProps()}
              type="button"
              name={name}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-label={ariaLabel}
              ref={toggleRef}
              className={cnSelect('FakeField')}
              readOnly
            />
            {arrValue ? (
              <span className={cnSelect('ControlValue')} title={getOptionLabel(arrValue[0])}>
                {getOptionLabel(arrValue[0])}
              </span>
            ) : (
              <span className={cnSelect('Placeholder')} title="placeholder">
                {placeholder || ''}
              </span>
            )}
          </div>
        </div>
        <span className={cnSelect('Indicators')}>
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
        dropdownRef={dropdownRef}
        id={id}
        selectedValues={arrValue}
        getOptionKey={getOptionKey}
        form={getSelectDropdownForm(form)}
        className={dropdownClassName}
        renderItem={renderItemDefault}
      />
    </SelectContainer>
  );
};
