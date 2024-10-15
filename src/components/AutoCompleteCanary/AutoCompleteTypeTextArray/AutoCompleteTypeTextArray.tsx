import React, { forwardRef, useRef } from 'react';

import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '##/components/SelectComponentsDeprecated/types';
import { TextFieldTypeTextArray } from '##/components/TextFieldCanary';
import { useForkRef } from '##/hooks/useForkRef';

import { withDefaultGetters } from '../helpers';
import { AutoCompleteTypeComponent } from '../types';
import { useAutoComplete } from '../useAutoComplete';
import { useRenderItemDefault } from '../useRenderItemDefault';

export const AutoCompleteTypeTextArray: AutoCompleteTypeComponent<'textarray'> =
  forwardRef((props, componentRef) => {
    const withDefaultGettersProps = withDefaultGetters(props);
    const {
      items = [],
      groups = [],
      disabled = false,
      getItemLabel,
      getItemKey,
      isLoading,
      getItemGroupKey,
      getGroupKey,
      getGroupLabel,
      inputRef,
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
      inputValue,
      ...otherProps
    } = withDefaultGettersProps;

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const controlRef = useRef<HTMLDivElement>(null);

    const {
      getOptionProps,
      isOpen,
      getKeyProps,
      visibleItems,
      handleInputFocus,
      inputRef: inputControlRef,
      optionsRefs,
      handleChange,
      highlightedIndex,
    } = useAutoComplete({
      items,
      groups,
      onChange: onInputChange,
      dropdownRef,
      disabled,
      searchValue: inputValue || '',
      getItemLabel,
      getItemKey,
      getItemGroupKey,
      getGroupKey,
      onFocus,
      searchFunction,
      isLoading,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs: [controlRef, ...(ignoreOutsideClicksRefs || [])],
    });

    const renderItemDefault = useRenderItemDefault(
      getItemLabel,
      disabled,
      size,
      dropdownForm,
    );

    return (
      <>
        <TextFieldTypeTextArray
          {...getKeyProps()}
          form={form}
          view={view}
          id={id}
          className={className}
          name={name}
          disabled={disabled}
          ref={useForkRef([controlRef, componentRef])}
          inputRef={useForkRef([inputRef, inputControlRef])}
          onFocus={handleInputFocus}
          onChange={highlightedIndex < 0 ? onChange : undefined}
          onInputChange={handleChange}
          value={value}
          style={style}
          size={size}
          {...otherProps}
        />
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
  });
