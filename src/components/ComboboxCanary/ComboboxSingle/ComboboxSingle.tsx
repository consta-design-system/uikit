import React, { forwardRef, useRef } from 'react';

import {
  FieldInput,
  FieldSelectControlLayout,
} from '##/components/FieldComponents';
import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown';
import { useSelect } from '##/components/SelectComponents/useSelect';
import { useForkRef } from '##/hooks/useForkRef';

import {
  cnCombobox,
  ComboboxComponent,
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxPropRenderValue,
  ComboboxProps,
} from '..';
import { withDefaultGetters } from '../helpers';

const ComboboxSingleRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
>(
  props: ComboboxProps<ITEM, GROUP, false>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    form = 'default',
    status,
    size = 'm',
    disabled,
    multiple = false,
    value,
    getItemLabel,
    renderValue,
    items,
    groups,
    onChange,
    getItemKey,
    getItemGroupKey,
    getGroupKey,
    onFocus,
    searchFunction,
    isLoading,
    onDropdownOpen,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    selectAll,
    searchValue: searchValueProp,
    getItemDisabled,
    onBlur,
    onSearchValueChange,
    onCreate,
    dropdownRef: dropdownRefProp,
    dropdownForm = 'default',
    dropdownClassName,
    renderItem,
    getGroupLabel,
    labelForNotFound,
    createButton,
    createButtonLabel,
    labelForEmptyItems,
    virtualScroll,
    onScrollToBottom,
    style,
    className,
  } = withDefaultGetters(props);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const renderValueDefault: ComboboxPropRenderValue<ITEM, false> = (value) => {
    return <>{getItemLabel(value)}</>;
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
    optionsRefs,
    allItemsSelected,
  } = useSelect<ITEM, GROUP, false>({
    items,
    groups,
    value,
    onChange,
    selectAll,
    dropdownRef,
    controlRef,
    disabled,
    getItemLabel,
    getItemKey,
    getGroupKey,
    searchValue: searchValueProp,
    getItemGroupKey,
    getItemDisabled,
    multiple,
    onBlur,
    onFocus,
    onCreate,
    searchFunction,
    onDropdownOpen,
    onSearchValueChange,
    dropdownOpen,
    ignoreOutsideClicksRefs,
  });

  return (
    <>
      <FieldSelectControlLayout
        style={style}
        ref={ref}
        className={cnCombobox(null, [className])}
        form={form}
        status={status}
        size={size}
        disabled={disabled}
        separator
        onClear={() => {}}
        open
      >
        {value ? (renderValue || renderValueDefault)(value) : <FieldInput />}
      </FieldSelectControlLayout>
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={controlRef}
        getOptionProps={getOptionProps}
        dropdownRef={useForkRef([dropdownRef, dropdownRefProp])}
        form={dropdownForm}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        labelForNotFound={labelForNotFound}
        labelForCreate={createButtonLabel}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        notFound={notFound}
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

export const ComboboxSingle = forwardRef(
  ComboboxSingleRender,
) as ComboboxComponent;
