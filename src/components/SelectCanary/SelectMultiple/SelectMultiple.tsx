import './SelectMultiple.css';

import { action, computed, wrap } from '@reatom/core';
import React from 'react';

import { FieldArrayValueItem } from '##/components/FieldComponents';
import { SelectDropdown } from '##/components/SelectCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectCanary/SelectItem';
import { cnCanary as cn } from '##/utils/bem';
import { factoryComponent } from '##/utils/state';

import {
  RenderItemProps,
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropRenderItem,
  SelectProps,
} from '..';
import { withDefault } from '../defaultProps';
import { model } from '../model';
import { SelectControlLayout } from '../SelectControlLayout';
import { SelectMultipleValue } from '../SelectMultipleValue';

const cnSelectMultiple = cn('SelectMultiple');

export const SelectMultiple = factoryComponent<
  HTMLDivElement,
  SelectProps<SelectItemDefault, SelectGroupDefault, true>
>((_, propsAtom) => {
  const propsWithDefaultAtom = computed(
    () => withDefault(propsAtom()),
    'propsWithDefaultAtom',
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
    getOptionRef,
    controlRef,
    dropdownRef,
    clearButtonAtom,
    highlightedIndexAtom,
    getItemKeyAtom,
    valueAtom,
    onChangeAll,
    onCreate,
    onChange,
    inputValueAtom,
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
    controlElAtom,
    getHandleRemoveValue,
    disabledAtom,
  } = model<SelectItemDefault, SelectGroupDefault, true>(propsWithDefaultAtom);

  const renderItemDefault: SelectPropRenderItem<SelectItemDefault> = wrap(
    action(
      ({
        item,
        active,
        hovered,
        onClick,
        onMouseEnter,
        ref,
      }: RenderItemProps<SelectItemDefault>) => {
        const { getItemLabel, size, dropdownForm, getItemDisabled } =
          propsWithDefaultAtom();

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
    ),
  );

  const inlineControlRender = action((value: SelectItemDefault[]) => {
    const {
      getItemDisabled,
      getItemKey,
      getItemLabel,
      size,
      disabled,
      renderValue,
    } = propsWithDefaultAtom();

    const renderValueDefault = ({
      value,
      getRemove,
    }: {
      value: SelectItemDefault[];
      getRemove: (
        item: SelectItemDefault,
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
  });

  return (props) => {
    const propsWithDefault = withDefault(props);

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

      // исключаем из otherProps
      inputRef: inputRefProp,
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
      dropdownContainer,
      dropdownOpen,
      ...otherProps
    } = propsWithDefault;

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
          ref={wrap(controlRef)}
        >
          <SelectMultipleValue
            rootPropsAtom={propsWithDefaultAtom}
            onFocus={wrap(handleInputFocus)}
            onBlur={wrap(handleInputBlur)}
            onClick={wrap(handleInputClick)}
            onChange={wrap(handleInputChange)}
            renderValue={inlineControlRender}
            inputRef={wrap(inputRef)}
          />
        </SelectControlLayout>
        <SelectDropdown
          valueAtom={valueAtom}
          getItemKeyAtom={getItemKeyAtom}
          openAtom={openAtom}
          size={size}
          controlElAtom={controlElAtom}
          getOptionActions={getOptionActions}
          dropdownRef={dropdownRef}
          form={dropdownForm}
          className={dropdownClassName}
          renderItem={renderItem || renderItemDefault}
          getGroupLabel={getGroupLabel}
          visibleItemsAtom={visibleItemsAtom}
          labelForCreate={labelForCreate}
          isLoading={isLoading}
          labelForEmptyItems={labelForEmptyItems}
          getItemRef={wrap(getOptionRef)}
          virtualScroll={virtualScroll}
          onScrollToBottom={onScrollToBottom}
          highlightedIndexAtom={highlightedIndexAtom}
          onChangeAll={onChangeAll}
          onCreate={onCreate}
          onChange={onChange}
          inputValueAtom={inputValueAtom}
          hasItemsAtom={hasItemsAtom}
          groupsCounterAtom={groupsCounterAtom}
          dropdownZIndexAtom={dropdownZIndexAtom}
          selectAllLabel={selectAllLabel}
          viewportRef={dropdownViewportRef}
          container={dropdownContainer}
          disabledAtom={disabledAtom}
        />
      </>
    );
  };
}) as SelectComponent;
