import '../SelectComponents/Select.css';
import './Select.css';

import React, { forwardRef, useRef } from 'react';
import { cn } from '@bem-react/classname';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cnMixCaption } from '../../mixs/MixCaption/MixCaption';
import { cnMixLabel } from '../../mixs/MixLabel/MixLabel';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { cnSelect } from '../SelectComponents/cnSelect';
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

const cnSelectComponent = cn('SelectComponent');

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
    className,
    labelAlign = 'top',
    label,
    caption,
    renderValue: renderValueProp,
    inputRef: inputRefProp,
    ...restProps
  } = usePropsHandler('Select', withDefaultGetters(props), controlRef);

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
    <div
      className={cnSelectComponent(null, [cnMixLabel({ align: labelAlign, size }), className])}
      {...restProps}
    >
      {label && <FieldLabel size={size}>{label}</FieldLabel>}
      <div className={cnSelectComponent('CaptionContainer', [cnMixCaption({ size })])}>
        <SelectContainer
          focused={isFocused}
          disabled={disabled}
          size={size}
          view={view}
          form={form}
          ref={ref}
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
                {!value && placeholder && (
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
          />
        </SelectContainer>
        {caption && <FieldCaption>{caption}</FieldCaption>}
      </div>
    </div>
  );
}

export const Select = forwardRef(SelectRender) as SelectComponent;

export * from './helpers';
