import './SelectMultiple.css';

import { useAction } from '@reatom/npm-react';
import React, { forwardRef, useRef } from 'react';

import { FieldArrayValueItem } from '##/components/FieldComponents';
import { SelectDropdown } from '##/components/SelectCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectCanary/SelectItem';
import { useForkRef } from '##/hooks/useForkRef';
import { cnCanary as cn } from '##/utils/bem';
import { useSendToAtom } from '##/utils/state';
import { withCtx } from '##/utils/state/withCtx';

import {
  RenderItemProps,
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropRenderItem,
  SelectProps,
} from '..';
import { withDefault } from '../defaultProps';
import { SelectControlLayout } from '../SelectControlLayout';
import { SelectMultipleValue } from '../SelectMultipleValue';
import { useSelect } from '../useSelect';

const cnSelectMultiple = cn('SelectMultiple');

const SelectMultipleRender = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
>(
  props: SelectProps<ITEM, GROUP, true>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const propsWithDefault = withDefault(props);

  const propsAtom = useSendToAtom(propsWithDefault);

  const {
    form,
    status,
    size,
    disabled,
    value,
    renderValue,
    isLoading,
    dropdownRef: dropdownRefProp,
    dropdownForm,
    renderItem,
    getGroupLabel,
    labelForCreate,
    labelForEmptyItems,
    virtualScroll,
    onScrollToBottom,
    style,
    className,
    placeholder,
    view,
    iconClear,
    input,
    inputValue,
    inputDefaultValue,
    inputRef: inputRefProp,

    // исключаем из otherProps
    getGroupKey,
    getItemDisabled,
    getItemGroupKey,
    getItemKey,
    getItemLabel,
    items,
    onChange: onChangeProp,
    dropdownClassName,
    onFocus,
    onBlur,
    onCreate: onCreateProp,
    onInput,
    multiple,
    groups,
    onDropdownOpen,
    ignoreOutsideClicksRefs,
    clearButton,
    selectAll,
    selectAllLabel,
    dropdownViewportRef,
    ...otherProps
  } = propsWithDefault;

  const {
    getOptionActions,
    openAtom,
    visibleItemsAtom,
    focusAtom,
    handleInputFocus,
    handleInputBlur,
    handleToggleDropdown,
    inputRef,
    handleInputClick,
    handleInputChange,
    clearValue,
    optionsRefs,
    controlRef,
    dropdownRef,
    clearButtonAtom,
    highlightedIndexAtom,
    getItemKeyAtom,
    valueAtom,
    onChangeAll,
    highlightIndex,
    onCreate,
    onChange,
    inputValueAtom,
    getHandleRemoveValue,
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
  } = useSelect<ITEM, GROUP, true>({
    propsAtom,
  });

  const valueContainerRef = useRef<HTMLDivElement>(null);

  const renderItemDefault: SelectPropRenderItem<ITEM> = useAction(
    (
      ctx,
      {
        item,
        active,
        hovered,
        onClick,
        onMouseEnter,
        ref,
      }: RenderItemProps<ITEM>,
    ) => {
      return (
        <SelectItem
          label={getItemLabel(item)}
          active={active}
          hovered={hovered}
          size={size}
          indent={dropdownForm === 'round' ? 'increased' : 'normal'}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          disabled={getItemDisabled(item)}
          ref={ref}
          multiple
        />
      );
    },
    [getItemDisabled, size, getItemLabel, dropdownForm],
  );

  const inlineControlRender = useAction(
    (ctx, value: ITEM[]) => {
      const renderValueDefault = ({
        value,
        getRemove,
      }: {
        value: ITEM[];
        getRemove: (
          item: ITEM,
        ) => (e: React.SyntheticEvent<Element, Event>) => void;
      }) => {
        return value.map((item) => {
          const itemDisabled = disabled || getItemDisabled(item);
          return (
            <FieldArrayValueItem
              key={getItemKey(item)}
              size={size}
              label={getItemLabel(item)}
              disabled={itemDisabled}
              onRemove={itemDisabled ? undefined : getRemove(item)}
            />
          );
        });
      };

      return (renderValue || renderValueDefault)({
        value,
        getRemove: getHandleRemoveValue,
      });
    },
    [disabled, getItemDisabled, getItemKey, size, getItemLabel, renderValue],
  );

  return (
    <>
      <SelectControlLayout
        {...otherProps}
        style={style}
        className={cnSelectMultiple(null, [className])}
        form={form}
        status={status}
        size={size}
        disabled={disabled}
        separator
        onClear={clearValue}
        onDropdownButton={handleToggleDropdown}
        openAtom={openAtom}
        focusAtom={focusAtom}
        view={view}
        iconClear={iconClear}
        clearButtonAtom={clearButtonAtom}
        ref={useForkRef([ref, controlRef])}
      >
        <SelectMultipleValue
          propsAtom={propsAtom}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClick={handleInputClick}
          onChange={handleInputChange}
          renderValue={inlineControlRender}
          inputRef={useForkRef([inputRef, inputRefProp])}
          ref={valueContainerRef}
        />
      </SelectControlLayout>
      <SelectDropdown
        valueAtom={valueAtom}
        getItemKeyAtom={getItemKeyAtom}
        openAtom={openAtom}
        size={size}
        controlRef={controlRef}
        getOptionActions={getOptionActions}
        dropdownRef={useForkRef([dropdownRef, dropdownRefProp])}
        form={dropdownForm}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItemsAtom={visibleItemsAtom}
        labelForCreate={labelForCreate}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        itemsRefs={optionsRefs}
        virtualScroll={virtualScroll}
        onScrollToBottom={onScrollToBottom}
        highlightedIndexAtom={highlightedIndexAtom}
        highlightIndex={highlightIndex}
        onChangeAll={onChangeAll}
        onCreate={onCreate}
        onChange={onChange}
        inputValueAtom={inputValueAtom}
        hasItemsAtom={hasItemsAtom}
        groupsCounterAtom={groupsCounterAtom}
        dropdownZIndexAtom={dropdownZIndexAtom}
        selectAllLabel={selectAllLabel}
        viewportRef={dropdownViewportRef}
      />
    </>
  );
};

export const SelectMultiple = withCtx(
  forwardRef(SelectMultipleRender),
) as SelectComponent;
