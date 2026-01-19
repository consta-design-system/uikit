import { useAction } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

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
  SelectPropRenderValue,
  SelectProps,
} from '..';
import { withDefault } from '../defaultProps';
import { SelectControlLayout } from '../SelectControlLayout';
import { SelectInput } from '../SelectInput';
import { useSelect } from '../useSelect';

const cnSelectSingle = cn('SelectSelectSingleMultiple');

const SelectSingleRender = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
>(
  props: SelectProps<ITEM, GROUP, false>,
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
    'dropdownRef': dropdownRefProp,
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
    'inputRef': inputRefProp,
    'aria-label': ariaLabel,

    // исключаем из otherProps
    getGroupKey,
    getItemDisabled,
    getItemGroupKey,
    getItemKey,
    getItemLabel,
    items,
    'onChange': onChangeProp,
    dropdownClassName,
    onFocus,
    onBlur,
    'onCreate': onCreateProp,
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

  const renderValueDefault: SelectPropRenderValue<ITEM, false> = useAction(
    (ctx, { value }: { value: ITEM }) => ctx.get(propsAtom).getItemLabel(value),
    [],
  );

  const renderItemDefault = useAction(
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
      const { getItemLabel, size, dropdownForm, getItemDisabled } =
        ctx.get(propsAtom);

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
        />
      );
    },
    [],
  );

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
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
  } = useSelect<ITEM, GROUP, false>({
    propsAtom,
  });

  return (
    <>
      <SelectControlLayout
        {...otherProps}
        style={style}
        className={cnSelectSingle(null, [className])}
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
        <SelectInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={useForkRef([inputRef, inputRefProp])}
          onClick={handleInputClick}
          onChange={input ? handleInputChange : undefined}
          value={input ? inputValue : undefined}
          defaultValue={input ? inputDefaultValue : undefined}
          readOnly={input ? undefined : true}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={ariaLabel}
        >
          {value && (renderValue || renderValueDefault)({ value })}
        </SelectInput>
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

export const SelectSingle = withCtx(
  forwardRef(SelectSingleRender),
) as SelectComponent;
