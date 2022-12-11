import React, { useRef } from 'react';

import { PropRenderItem } from '##/components/Select';
import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown/SelectDropdown';
import { SelectItem } from '##/components/SelectComponents/SelectItem/SelectItem';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '##/components/SelectComponents/types';
import { TextField } from '##/components/TextField/TextField';
import { useForkRef } from '##/hooks/useForkRef';
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
    ...otherProps
  } = withDefaultGetters(props);

  const handleSelectChange = ({
    e,
    value,
  }: {
    value: ITEM | null;
    e: React.SyntheticEvent;
  }) => {
    const copyEvent = { ...e } as React.KeyboardEvent;
    const newValue = (value ? getItemLabel(value) : value) as string;
    onChange?.({ e: copyEvent, value: newValue, id, name });
  };

  const {
    getOptionProps,
    isOpen,
    getKeyProps,
    visibleItems,
    handleInputFocus,
    handleInputBlur,
    inputRef: inputControlRef,
  } = useAutoComplete({
    items,
    groups,
    onChange: ({ e, value }) =>
      handleSelectChange({ e, value: Array.isArray(value) ? value[0] : value }),
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
  });

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter } = props;

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
        onFocus={handleInputFocus}
        onChange={onChange}
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
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex + 1 }
            : undefined
        }
      />
    </>
  );
};

export const AutoComplete = React.forwardRef(
  AutoCompleteRender,
) as AutoCompleteComponent;

export * from './types';
