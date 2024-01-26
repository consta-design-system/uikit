import '##/components/SelectComponents/Select.css';

import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef, useRef } from 'react';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import {
  cnSelect,
  COMPONENT_NAME,
} from '##/components/SelectComponents/cnSelect';
import { defaultLabelForEmptyItems } from '##/components/SelectComponents/helpers';
import { SelectContainer } from '##/components/SelectComponents/SelectContainer';
import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown';
import { SelectItem } from '##/components/SelectComponents/SelectItem';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '##/components/SelectComponents/types';
import { useSelect } from '##/components/SelectComponents/useSelect';
import { useForkRef } from '##/hooks/useForkRef';
import { isNotNil } from '##/utils/type-guards';

import {
  iconSizeMap,
  PropRenderItem,
  PropRenderValue,
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectProps,
  withDefaultGetters,
} from './helpers';

const SelectRender = <ITEM = SelectItemDefault, GROUP = SelectGroupDefault>(
  props: SelectProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const defaultDropdownRef = useRef<HTMLDivElement>(null);
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
    dropdownRef,
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
    onDropdownOpen,
    onScrollToBottom,
    virtualScroll,
    dropdownOpen,
    ignoreOutsideClicksRefs,
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
    optionsRefs,
  } = useSelect<ITEM, GROUP, false>({
    items,
    groups,
    value,
    onChange,
    dropdownRef: defaultDropdownRef,
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
    onDropdownOpen,
    dropdownOpen,
    ignoreOutsideClicksRefs,
  });

  const inputId = id ? `${id}-input` : id;

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter, ref } = props;

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
        ref={ref}
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
                className={cnSelect('FakeField')}
                type="text"
                name={name}
                id={inputId}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                aria-label={ariaLabel}
                onClick={handleInputClick}
                ref={useForkRef([inputRef, inputRefProp])}
                readOnly
              />
              {isNotNil(value) && renderValue({ item: value })}
              {!isNotNil(value) && placeholder && (
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
                size={iconSizeMap[size]}
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
        dropdownRef={useForkRef([dropdownRef, defaultDropdownRef])}
        form={dropdownForm}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        notFound={notFound}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        hasItems={hasItems}
        itemsRefs={optionsRefs}
        virtualScroll={virtualScroll}
        onScrollToBottom={onScrollToBottom}
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
