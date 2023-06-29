import '../SelectComponents/Select.css';

import { IconClose } from '@consta/icons/IconClose';
import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useSelect } from '../../hooks/useSelect/useSelect';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { cnSelect } from '../SelectComponents/cnSelect';
import {
  defaultlabelForCreate,
  defaultLabelForEmptyItems,
  defaultlabelForNotFound,
  getInputWidth,
} from '../SelectComponents/helpers';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '../SelectComponents/types';
import {
  DefaultGroup,
  DefaultItem,
  isMultipleParams,
  isNotMultipleParams,
  PropRenderItem,
  PropRenderValue,
  searchCompare,
  UserSelectComponent,
  UserSelectProps,
  withDefaultGetters,
} from './helpers';
import { UserSelectItem } from './UserSelectItem/UserSelectItem';
import { UserSelectValue } from './UserSelectValue/UserSelectValue';

export const COMPONENT_NAME = 'UserSelect' as const;

const UserSelectRender = <
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(
  props: UserSelectProps<ITEM, GROUP, MULTIPLE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const defaultDropdownRef = useRef<HTMLDivElement | null>(null);
  const controlInnerRef = useRef<HTMLDivElement>(null);
  const helperInputFakeElement = useRef<HTMLDivElement>(null);
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
    isLoading,
    required,
    dropdownRef = defaultDropdownRef,
    form = defaultPropForm,
    view = defaultPropView,
    size = defaultPropSize,
    dropdownClassName,
    searchValue: searchValueProp,
    name,
    groups = [],
    getItemKey,
    getItemLabel,
    getItemSubLabel,
    getItemAvatarUrl,
    getItemGroupKey,
    getItemDisabled,
    getGroupKey,
    getGroupLabel,
    renderItem,
    renderValue: renderValueProp,
    onCreate,
    inputRef: inputRefProp,
    labelForNotFound = defaultlabelForNotFound,
    labelForCreate = defaultlabelForCreate,
    labelForEmptyItems = defaultLabelForEmptyItems,
    multiple = false,
    searchFunction,
    style,
    dropdownForm = 'default',
    ...restProps
  } = usePropsHandler(COMPONENT_NAME, withDefaultGetters(props), controlRef);

  const searchFunctionDefault = (item: ITEM, searchValue: string): boolean => {
    const searchOfLabel = searchCompare(searchValue, getItemLabel(item));

    if (searchOfLabel) {
      return searchOfLabel;
    }

    return searchCompare(searchValue, getItemSubLabel(item));
  };

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
    handleInputChange,
    searchValue,
    clearValue,
    getHandleRemoveValue,
    notFound,
    hasItems,
  } = useSelect({
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
    searchValue: searchValueProp,
    getItemDisabled,
    multiple,
    onBlur,
    onFocus,
    onCreate,
    searchFunction: searchFunction || searchFunctionDefault,
  });

  const inputId = id ? `${id}-input` : id;

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter } = props;

    return (
      <UserSelectItem
        label={getItemLabel(item)}
        subLabel={getItemSubLabel(item)}
        avatarUrl={getItemAvatarUrl(item)}
        active={active}
        hovered={hovered}
        size={size}
        indent={dropdownForm === 'round' ? 'increased' : 'normal'}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        disable={getItemDisabled(item)}
        multiple={multiple}
      />
    );
  };

  const renderValueDefault: PropRenderValue<ITEM> = ({
    item,
    handleRemove,
  }) => {
    return (
      <UserSelectValue
        label={getItemLabel(item)}
        subLabel={getItemSubLabel(item)}
        avatarUrl={getItemAvatarUrl(item)}
        key={getItemKey(item)}
        size={size}
        handleRemove={handleRemove}
        multiple={multiple}
        disabled={disabled || getItemDisabled(item)}
      />
    );
  };

  const renderValue = renderValueProp || renderValueDefault;

  const inputRefForRender = useForkRef([inputRef, inputRefProp]);

  const renderControlValue = () => {
    const width = multiple
      ? getInputWidth(controlInnerRef, helperInputFakeElement)
      : undefined;
    return (
      <>
        {isMultipleParams(props) &&
          Array.isArray(props.value) &&
          props.value.map((item) =>
            renderValue({ item, handleRemove: getHandleRemoveValue(item) }),
          )}
        {isNotMultipleParams(props) &&
          props.value &&
          renderValue({ item: props.value })}
        {(!value || (Array.isArray(value) && value.length === 0)) &&
          !searchValue &&
          placeholder && (
            <span className={cnSelect('Placeholder')} title="placeholder">
              {placeholder}
            </span>
          )}
        <input
          {...getKeyProps()}
          type="text"
          name={name}
          id={inputId}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-label={ariaLabel}
          onChange={handleInputChange}
          ref={inputRefForRender}
          className={cnSelect('Input', {
            size,
            hide: !multiple && !!value,
            multiple,
            isUserSelect: true,
          })}
          value={searchValue}
          style={{ width }}
        />
      </>
    );
  };

  return (
    <>
      <SelectContainer
        focused={isFocused}
        disabled={disabled}
        size={size}
        required={required}
        id={inputId}
        view={view}
        type="userselect"
        form={form}
        multiple
        ref={ref}
        style={style}
        {...restProps}
      >
        <div
          className={cnSelect('Control', { hasInput: true })}
          ref={controlRef}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          id={id}
        >
          <div
            className={cnSelect('ControlInner')}
            onClick={handleInputClick}
            role="button"
            ref={controlInnerRef}
            aria-hidden="true"
          >
            <div className={cnSelect('ControlValueContainer')}>
              {multiple ? (
                <div
                  className={cnSelect('ControlValue', { isUserSelect: true })}
                >
                  {renderControlValue()}
                </div>
              ) : (
                renderControlValue()
              )}
            </div>
          </div>
          <span className={cnSelect('Indicators')}>
            {value && (
              <button
                type="button"
                onClick={clearValue}
                className={cnSelect('ClearIndicator', [cnMixFocus()])}
              >
                <IconClose
                  size="xs"
                  className={cnSelect('ClearIndicatorIcon')}
                />
              </button>
            )}
            <span className={cnSelect('Delimiter')} />
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
        <div
          className={cnSelect('HelperInputFakeElement')}
          ref={helperInputFakeElement}
        >
          {searchValue}
        </div>
      </SelectContainer>
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={controlRef}
        getOptionProps={getOptionProps}
        dropdownRef={dropdownRef}
        form={dropdownForm}
        isLoading={isLoading}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        labelForNotFound={labelForNotFound}
        labelForCreate={labelForCreate}
        notFound={notFound}
        hasItems={hasItems}
        labelForEmptyItems={labelForEmptyItems}
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex + 1 }
            : undefined
        }
      />
    </>
  );
};

export const UserSelect = forwardRef(UserSelectRender) as UserSelectComponent;

export * from './helpers';
