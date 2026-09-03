import { action, computed, wrap } from '@reatom/core';
import React from 'react';

import { SelectDropdown } from '##/components/SelectCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectCanary/SelectItem';
import { cnCanary as cn } from '##/utils/bem';
import { factoryComponent } from '##/utils/state';

import {
  RenderItemProps,
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropRenderValue,
  SelectProps,
} from '..';
import { withDefault } from '../defaultProps';
import { model } from '../model';
import { SelectControlLayout } from '../SelectControlLayout';
import { SelectInput } from '../SelectInput';

const cnSelectSingle = cn('SelectSelectSingleMultiple');

export const SelectSingle = factoryComponent<HTMLDivElement, SelectProps>(
  (_, propsAtom) => {
    const propsWithDefaultAtom = computed(() => withDefault(propsAtom()));

    const renderValueDefault: SelectPropRenderValue<SelectItemDefault, false> =
      action(({ value }) => propsWithDefaultAtom().getItemLabel(value));

    const renderItemDefault = action(
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
          />
        );
      },
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
      disabledAtom,
    } = model<SelectItemDefault, SelectGroupDefault, false>(
      propsWithDefaultAtom,
    );

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
        dropdownContainer,
        dropdownOpen,
        ...otherProps
      } = propsWithDefault;

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
            onClear={wrap(clearValue)}
            onDropdownButton={handleToggleDropdown}
            openAtom={openAtom}
            focusAtom={focusAtom}
            view={view}
            iconClear={iconClear}
            clearButtonAtom={clearButtonAtom}
            ref={wrap(controlRef)}
          >
            <SelectInput
              onFocus={wrap(handleInputFocus)}
              onBlur={wrap(handleInputBlur)}
              ref={wrap(inputRef)}
              onClick={wrap(handleInputClick)}
              onChange={input ? wrap(handleInputChange) : undefined}
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
            getItemRef={getOptionRef}
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
  },
) as unknown as SelectComponent;
