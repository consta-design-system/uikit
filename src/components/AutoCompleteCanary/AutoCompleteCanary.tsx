import React, { useCallback, useRef } from 'react';

import { PropRenderItem } from '##/components/SelectCanary';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '##/components/SelectComponents/types';
import { SelectDropdown } from '##/components/SelectComponentsCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectComponentsCanary/SelectItem';
import {
  TextField,
  TextFieldPropOnChange,
} from '##/components/TextField/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cnCanary } from '##/utils/bem';

import { withDefaultGetters } from './helpers';
import {
  AutoCompleteComponent,
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompleteProps,
} from './types';
import { useAutoComplete } from './useAutoComplete';

const cnAutoComplete = cnCanary('AutoComplete');

const AutoCompleteRender = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const defaultDropdownRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    inputRef,
    onFocus,
    dropdownRef = defaultDropdownRef,
    dropdownClassName,
    dropdownForm = 'default',
    value,
    form = defaultPropForm,
    view = defaultPropView,
    size = defaultPropSize,
    onChange,
    inputContainerRef,
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
    ...otherProps
  } = withDefaultGetters(props);

  const onChangeRef = useMutableRef(onChange);

  const handleSelectChange = useCallback(
    ({ e, value }: { value: ITEM | null; e: React.SyntheticEvent }) => {
      const copyEvent = { ...e } as React.KeyboardEvent;
      const newValue = (value ? getItemLabel(value) : value) as string;
      onChangeRef.current?.(newValue, {
        e: copyEvent,
        id: id?.toString(),
        name,
      });
    },
    [id, name],
  );

  const handleInputChange: TextFieldPropOnChange = useCallback(
    ({ value, id, name, e }) => {
      onChangeRef.current?.(value, { id: id?.toString(), name, e });
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
    onChange: handleSelectChange,
    dropdownRef,
    controlRef,
    disabled,
    searchValue: value ?? '',
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

  return (
    <>
      <TextField
        {...getKeyProps()}
        form={form}
        view={view}
        id={id}
        className={cnAutoComplete(null, [className])}
        name={name}
        disabled={disabled}
        ref={useForkRef([controlRef, ref])}
        inputRef={useForkRef([inputRef, inputControlRef])}
        onBlur={handleInputBlur}
        inputContainerRef={useForkRef([containerRef, inputContainerRef])}
        onClick={handleInputFocus}
        onChange={handleInputChange}
        value={value}
        style={style}
        size={size}
        {...otherProps}
      />
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={containerRef}
        getOptionProps={getOptionProps}
        dropdownRef={dropdownRef}
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
