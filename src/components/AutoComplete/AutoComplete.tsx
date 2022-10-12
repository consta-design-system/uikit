import React, { useMemo, useRef } from 'react';

import { SelectDropdown } from '##/components/SelectComponents/SelectDropdown/SelectDropdown';
import { SelectItem } from '##/components/SelectComponents/SelectItem/SelectItem';
import { TextField } from '##/components/TextField/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { useSelect } from '##/hooks/useSelect';

import { PropRenderItem } from '../Select';
import {
  defaultLabelForEmptyItems,
  defaultlabelForNotFound,
} from '../SelectComponents/helpers';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
} from '../SelectComponents/types';
import { withDefaultGetters } from './helpers';
import {
  AutoCompleteComponent,
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompleteProps,
} from './types';

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
    style,
    labelForNotFound = defaultlabelForNotFound,
    labelForEmptyItems = defaultLabelForEmptyItems,
    renderItem,
    searchFunction,
    id,
    name,
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
    isOpen: isOpenProp,
    getKeyProps,
    visibleItems,
    handleInputFocus,
    handleInputBlur,
    inputRef: inputControlRef,
    handleInputClick,
    notFound,
    hasItems,
  } = useSelect({
    items,
    groups,
    value: null,
    multiple: false,
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
    withoutClearSearch: true,
    onFocus,
    searchFunction,
  });

  const isOpen = useMemo(
    () => isOpenProp && (value ?? '').trim() !== '',
    [isOpenProp, value],
  );

  const renderItemDefault: PropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter } = props;

    return (
      <SelectItem
        label={getItemLabel(item)}
        active={active}
        hovered={hovered}
        multiple={false}
        disabled={false}
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
        name={name}
        ref={useForkRef([controlRef, ref])}
        inputRef={useForkRef([inputRef, inputControlRef])}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onChange={onChange}
        value={value}
        onClick={handleInputClick}
        style={style}
        {...otherProps}
      />
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
        labelForEmptyItems={labelForEmptyItems}
        isLoading={isLoading}
        labelForNotFound={labelForNotFound}
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

export const AutoComplete = React.forwardRef(
  AutoCompleteRender,
) as AutoCompleteComponent;

export * from './types';
