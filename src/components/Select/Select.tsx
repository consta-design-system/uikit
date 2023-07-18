import '../SelectComponents/Select.css';

import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useSelect } from '../../hooks/useSelect/useSelect';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { cnSelect, COMPONENT_NAME } from '../SelectComponents/cnSelect';
import { defaultLabelForEmptyItems } from '../SelectComponents/helpers';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import { SelectItem } from '../SelectComponents/SelectItem/SelectItem';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '../SelectComponents/types';
import {
  DefaultGroup,
  DefaultItem,
  PropRenderItem,
  PropRenderValue,
  SelectComponent,
  SelectProps,
  withDefaultGetters,
} from './helpers';

const SelectRender = <ITEM = DefaultItem, GROUP = DefaultGroup>(
  props: SelectProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const defaultDropdownRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  const {
    placeholder,
    onBlur,
    onFocus,
    items,
    onChange,
    value,
    required,
    disabled,
    ariaLabel,
    id,
    dropdownRef = defaultDropdownRef,
    form = defaultPropForm,
    view = defaultPropView,
    size = defaultPropSize,
    dropdownClassName,
    name,
    groups = [],
    getItemLabel,
    labelForEmptyItems = defaultLabelForEmptyItems,
    getItemKey,
    getItemGroupKey,
    getItemDisabled,
    getGroupKey,
    getGroupLabel,
    renderItem,
    isLoading,
    renderValue: renderValueProp,
    inputRef: inputRefProp,
    style,
    dropdownForm = 'default',
    ...restProps
  } = usePropsHandler(COMPONENT_NAME, withDefaultGetters(props), controlRef);

  const {
    getKeyProps,
    getOptionProps,
    isOpen,
    visibleItems,
    isFocused,
    handleInputFocus,
    handleInputBlur,
    handleToggleDropdown,
    inputRef,
    handleInputClick,
    notFound,
    hasItems,
  } = useSelect<ITEM, GROUP, false>({
    items,
    groups,
    value,
    onChange,
    dropdownRef,
    controlRef,
    disabled,
    getItemLabel,
    getItemKey,
    getGroupKey,
    getItemGroupKey,
    getItemDisabled,
    multiple: false,
    onBlur,
    onFocus,
  });

  const inputId = id ? `${id}-input` : id;

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter } = props;

    return (
      <SelectItem
        label={getItemLabel(item)}
        active={active}
        hovered={hovered}
        multiple={false}
        size={size}
        indent={dropdownForm === 'round' ? 'increased' : 'normal'}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        disabled={getItemDisabled(item)}
      />
    );
  };

  const renderValueDefault: PropRenderValue<ITEM> = (props) => {
    const label = getItemLabel(props.item);

    return (
      <span className={cnSelect('ControlValue')} title={label}>
        {label}
      </span>
    );
  };

  const renderValue = renderValueProp || renderValueDefault;

  return (
    <>
      <SelectContainer
        focused={isFocused}
        disabled={disabled}
        size={size}
        view={view}
        form={form}
        required={required}
        ref={ref}
        style={style}
        id={inputId}
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
                {...getKeyProps()}
                type="button"
                name={name}
                id={inputId}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                aria-label={ariaLabel}
                onClick={handleInputClick}
                ref={useForkRef([inputRef, inputRefProp])}
                className={cnSelect('FakeField')}
                readOnly
              />
              {value && renderValue({ item: value })}
              {(typeof value === 'undefined' || value === null) && placeholder && (
                <span className={cnSelect('Placeholder')} title="placeholder">
                  {placeholder}
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
              <IconSelect
                size="xs"
                className={cnSelect('DropdownIndicatorIcon')}
              />
            </button>
          </span>
        </div>
      </SelectContainer>
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={controlRef}
        getOptionProps={getOptionProps}
        dropdownRef={dropdownRef}
        form={dropdownForm}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        notFound={notFound}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        hasItems={hasItems}
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex + 1 }
            : undefined
        }
      />
    </>
  );
};

export const Select = forwardRef(SelectRender) as SelectComponent;

export * from './helpers';
