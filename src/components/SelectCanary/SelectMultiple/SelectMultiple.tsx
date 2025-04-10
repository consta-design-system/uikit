import './SelectMultiple.css';

import { useAction, useAtom } from '@reatom/npm-react';
import React, { forwardRef, useRef } from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
} from '##/components/FieldComponents';
import { SelectDropdown } from '##/components/SelectCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectCanary/SelectItem';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnCanary as cn } from '##/utils/bem';
import { useSendToAtom } from '##/utils/state';
import { withCtx } from '##/utils/state/withCtx';

import {
  RenderItemProps,
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropRenderItem,
  SelectPropRenderValue,
  SelectProps,
} from '..';
import { withDefault } from '../defaultProps';
import { SelectControlLayout } from '../SelectControlLayout';
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
    name,
    ariaLabel,

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
  } = useSelect<ITEM, GROUP, true>({
    propsAtom,
  });

  const valueContainerRef = useRef<HTMLDivElement>(null);

  const renderValueDefault: SelectPropRenderValue<ITEM, true> = useAction(
    (
      ctx,
      {
        value,
        getRemove,
      }: {
        value: ITEM[];
        getRemove: (
          item: ITEM,
        ) => (e: React.SyntheticEvent<Element, Event>) => void;
      },
    ) => {
      const { disabled, getItemDisabled, getItemKey, size, getItemLabel } =
        ctx.get(propsAtom);

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
    },
  );

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
      const { getItemDisabled, size, getItemLabel, dropdownForm } =
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
          multiple
        />
      );
    },
  );

  const inlineControlRender = useAction((ctx, value: ITEM[]) => {
    const { renderValue } = ctx.get(propsAtom);

    return (renderValue || renderValueDefault)({
      value,
      getRemove: getHandleRemoveValue,
    });
  });

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
        <FieldArrayValueInlineControl
          className={cnSelectMultiple('Value', [
            cnMixScrollBar({ size: 'xs', trackSize: 'auto' }),
          ])}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClick={handleInputClick}
          value={value || undefined}
          disabled={disabled}
          placeholder={placeholder}
          renderValue={inlineControlRender}
          size={size}
          disableInput={input ? undefined : true}
          inputRef={useForkRef([inputRef, inputRefProp])}
          ref={valueContainerRef}
          // inputValue={input ? inputValue : undefined}
          inputDefaultValue={input ? inputDefaultValue : undefined}
          onChange={handleInputChange}
        />
      </SelectControlLayout>
      <SelectDropdown
        valueAtom={valueAtom}
        getItemKeyAtom={getItemKeyAtom}
        openAtom={openAtom}
        size={size}
        controlRef={controlRef}
        getOptionActions={getOptionActions}
        // TODO: были ошибки в useForkRef, проверить все вызовы
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
        // style={
        //   // TODO: мемоизировать
        //   typeof style?.zIndex === 'number'
        //     ? { zIndex: style.zIndex + 1 }
        //     : undefined
        // }
      />
    </>
  );
};

export const SelectMultiple = withCtx(
  forwardRef(SelectMultipleRender),
) as SelectComponent;
