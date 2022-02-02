import '../SelectComponents/Select.css';

import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { cnSelect, COMPONENT_NAME } from '../SelectComponents/cnSelect';
import { getSelectDropdownForm } from '../SelectComponents/helpers';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import { SelectItem } from '../SelectComponents/SelectItem/SelectItem';
import { defaultPropForm, defaultPropSize, defaultPropView } from '../SelectComponents/types';

import {
  DefaultGroup,
  DefaultItem,
  PropRenderItem,
  PropRenderValue,
  SelectComponent,
  SelectProps,
  withDefaultGetters,
} from './helpers';

function SelectRender<ITEM = DefaultItem, GROUP = DefaultGroup>(
  props: SelectProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) {
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
    getItemKey,
    getItemGroupKey,
    getItemDisabled,
    getGroupKey,
    getGroupLabel,
    renderItem,
    renderValue: renderValueProp,
    inputRef: inputRefProp,
    style,
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

  const dropdownForm = getSelectDropdownForm(form);

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
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      view={view}
      form={form}
      required={required}
      ref={ref}
      style={style}
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
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </span>
      </div>
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
        style={typeof style?.zIndex === 'number' ? { zIndex: style.zIndex + 1 } : undefined}
      />
    </SelectContainer>
  );
}

export const Select = forwardRef(SelectRender) as SelectComponent;

export * from './helpers';
