import React, { useCallback, useRef } from 'react';

import { PropRenderItem } from '##/components/Select';
import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown';
import { SelectItem } from '##/components/SelectComponents/SelectItem';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '##/components/SelectComponentsDeprecated/types';
import {
  TextFieldTypeText,
  TextFieldTypeTextArray,
} from '##/components/TextFieldCanary';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cn } from '##/utils/bem';

import {
  getSearchValue,
  isMultipleProps,
  isNotMultipleProps,
  withDefaultGetters,
} from './helpers';
import {
  AutoCompleteComponent,
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompletePropOnChange,
  AutoCompleteProps,
  AutoCompletePropValue,
} from './types';
import { useAutoComplete } from './useAutoComplete';

const cnAutoComplete = cn('AutoComplete');

const AutoCompleteRender = <
  MULTIPLE extends boolean = false,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<MULTIPLE, ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const propsWithDefaultGetters = withDefaultGetters(props);
  const {
    items,
    groups = [],
    disabled,
    getItemLabel,
    getItemKey,
    isLoading,
    getItemGroupKey,
    getGroupKey,
    getGroupLabel,
    onBlur,
    inputRef: inputRefProp,
    onFocus,
    dropdownRef: dropdownRefProp,
    dropdownClassName,
    dropdownForm = 'default',
    value,
    form = defaultPropForm,
    view = defaultPropView,
    size = defaultPropSize,
    onChange,
    style,
    renderItem,
    searchFunction,
    id,
    name,
    className,
    virtualScroll,
    onScrollToBottom,
    onDropdownOpen,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    onInputChange,
    multiple,
    inputValue,
    defaultValue,

    ...otherProps
  } = propsWithDefaultGetters;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const propsRef = useMutableRef(propsWithDefaultGetters);

  const handleSelect = useCallback(
    ({
      value,
      e,
    }: {
      value: ITEM;
      e: React.MouseEvent | React.KeyboardEvent;
    }) => {
      const props = propsRef.current;
      if (isMultipleProps(props) && props?.onInputChange) {
        props.onInputChange(props.getItemLabel(value), { e });
      }
      if (isNotMultipleProps(props) && props?.onChange) {
        props.onChange(props.getItemLabel(value), { e });
      }
    },
    [],
  );

  const {
    getOptionProps,
    isOpen,
    getKeyProps,
    visibleItems,
    handleInputFocus,
    handleInputBlur,
    inputRef: inputControlRef,
    optionsRefs,
  } = useAutoComplete({
    items,
    groups,
    onChange: handleSelect,
    dropdownRef,
    disabled,
    getItemLabel,
    getItemKey,
    getItemGroupKey,
    getGroupKey,
    onBlur,
    onFocus,
    searchFunction,
    isLoading,
    onDropdownOpen,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    searchValue: getSearchValue(props),
  });

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter, ref } = props;

    return (
      <SelectItem
        label={getItemLabel(item)}
        active={active}
        hovered={hovered}
        multiple={false}
        disabled={disabled}
        size={size}
        indent={dropdownForm === 'round' ? 'increased' : 'normal'}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        ref={ref}
      />
    );
  };

  const textFieldRef = useForkRef([rootRef, ref]);
  const textFieldInputRef = useForkRef([
    inputRef,
    inputControlRef,
    inputRefProp,
  ]);

  return (
    <>
      {multiple ? (
        <TextFieldTypeTextArray
          {...getKeyProps()}
          form={form}
          view={view}
          id={id}
          className={cnAutoComplete(null, [className])}
          name={name}
          disabled={disabled}
          ref={textFieldRef}
          inputRef={textFieldInputRef}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          onChange={onChange as AutoCompletePropOnChange<true>}
          onInputChange={onInputChange}
          value={value as AutoCompletePropValue<true>}
          style={style}
          size={size}
          {...otherProps}
        />
      ) : (
        <TextFieldTypeText
          {...getKeyProps()}
          form={form}
          view={view}
          id={id}
          className={cnAutoComplete(null, [className])}
          name={name}
          disabled={disabled}
          ref={textFieldRef}
          inputRef={textFieldInputRef}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          onChange={onChange as AutoCompletePropOnChange<false>}
          type="text"
          // value={value}
          style={style}
          size={size}
          {...otherProps}
        />
      )}
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={rootRef}
        getOptionProps={getOptionProps}
        dropdownRef={useForkRef([dropdownRef, dropdownRefProp])}
        form={dropdownForm}
        className={cnAutoComplete('List', [dropdownClassName])}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        isLoading={isLoading}
        hasItems={items.length !== 0}
        itemsRefs={optionsRefs}
        virtualScroll
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex + 1 }
            : undefined
        }
        onScrollToBottom={onScrollToBottom}
      />
    </>
  );
};

export const AutoComplete = React.forwardRef(
  AutoCompleteRender,
) as AutoCompleteComponent;

export * from './types';
