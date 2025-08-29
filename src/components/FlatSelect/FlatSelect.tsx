import './FlatSelect.css';

import { TextFieldTypeText } from '@consta/uikit/TextFieldCanary';
import { useAction } from '@reatom/npm-react';
import React, { forwardRef, useEffect, useRef } from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldInput } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { useSendToAtom, withCtx } from '##/utils/state';
import { isNotNil } from '##/utils/type-guards';

import { withDefault } from './defaultProps';
import { FlatSelectControlLayout } from './FlatSelectControlLayout';
import { FlatSelectList } from './FlatSelectList';
import { inputSpaceMap } from './helpers';
import {
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropRenderItem,
  FlatSelectProps,
  RenderItemProps,
} from './types';
import { useFlatSelect } from './useFlatSelect';

const cnFlatSelect = cn('FlatSelect');

const renderSlot = (slot: React.ReactNode) => {
  if (Array.isArray(slot)) {
    return slot.filter(isNotNil).map((item, index) => (
      <div className={cnFlatSelect('Slot')} key={index}>
        {item}
      </div>
    ));
  }
  return renderSlot([slot]);
};

const FlatSelectRender = (
  p: FlatSelectProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const props = withDefault(p);
  const propsAtom = useSendToAtom(props);

  const {
    form,

    disabled,
    value,
    // renderValue,
    isLoading,
    dropdownRef: dropdownRefProp,

    renderItem,
    getGroupLabel,
    labelForCreate,
    labelForEmptyItems,
    virtualScroll,
    onScrollToBottom,
    style,
    className,
    placeholder,

    iconClear,
    input,
    inputValue,
    inputDefaultValue,
    inputRef: inputRefProp,
    size,
    view,
    bordered,
    // исключаем из otherProps
    getGroupKey,
    getItemDisabled,
    getItemGroupKey,
    getItemKey,
    getItemLabel,
    items,
    onChange: onChangeProp,
    // dropdownClassName,
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
    autoFocus,
    footer,
    ...otherProps
  } = props;

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
    rootRef,
  } = useFlatSelect<FlatSelectItemDefault, FlatSelectGroupDefault, false>({
    propsAtom,
  });

  const renderItemDefault: FlatSelectPropRenderItem<FlatSelectItemDefault> =
    useAction(
      (
        ctx,
        {
          item,
          active,
          hovered,
          onClick,
          onMouseEnter,
          ref,
        }: RenderItemProps<FlatSelectItemDefault>,
      ) => {
        return (
          <ListItem
            {...otherProps}
            ref={ref}
            // className={cnSelectItem(null, [className])}
            aria-selected={active}
            aria-disabled={getItemDisabled(item) || disabled}
            role="option"
            label={getItemLabel(item)}
            size={size}
            active={hovered}
            checked={!multiple && active}
            disabled={disabled}
            onClick={onClick}
            leftSide={
              multiple && (
                <Checkbox
                  checked={active}
                  disabled={disabled}
                  size="s"
                  tabIndex={-1}
                />
              )
            }
          />
        );
      },
      [getItemLabel, getItemDisabled, multiple, disabled, size],
    );

  // Flat Select

  // useEffect(() => {
  //   console.log('rootRef.current', rootRef.current);
  //   rootRef.current?.focus();
  // }, [rootRef]);

  return (
    <div
      {...otherProps}
      ref={useForkRef([ref, rootRef])}
      className={cnFlatSelect(
        {
          view,
          bordered: view === 'clear' ? bordered : undefined,
          form: bordered ? form : undefined,
        },

        [className],
      )}
      style={{
        ...style,
        ['--flat-select-control-height' as string]: `var(--control-height-${size})`,
      }}
      tabIndex={0}
      role="listbox"
    >
      <div
        className={cnFlatSelect(
          'Input',
          {
            border: view === 'clear' ? bordered : undefined,
            form: bordered ? form : undefined,
          },
          [view === 'clear' ? cnMixSpace({ pV: '2xs', pH: 's' }) : undefined],
        )}
      >
        <FlatSelectControlLayout
          // {...otherProps}
          form={form}
          disabled={disabled}
          separator
          onClear={clearValue}
          onDropdownButton={handleToggleDropdown}
          openAtom={openAtom}
          focusAtom={focusAtom}
          // view={view}
          iconClear={iconClear}
          clearButtonAtom={clearButtonAtom}
          ref={useForkRef([ref, controlRef])}
          size={size}
          view={view}
        >
          <FieldInput
            //   className={cnSelectInput('Input', { readOnly })}
            //   readOnly={readOnly}
            //   {...props}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={useForkRef([inputRef, inputRefProp])}
            onClick={handleInputClick}
            onChange={handleInputChange}
            value={inputValue}
            defaultValue={inputDefaultValue}
            disabled={disabled}
            placeholder={placeholder}

            // aria-label={ariaLabel}
            // ref={inputRef}
          />
        </FlatSelectControlLayout>
      </div>
      <FlatSelectList
        className={cnFlatSelect('List', {
          borderHorizontal: view === 'clear' ? bordered : undefined,
          borderBottom: view === 'clear' && !footer ? bordered : undefined,
          form: bordered && !footer ? form : undefined,
        })}
        view={view}
        size={size}
        form={form}
        valueAtom={valueAtom}
        getItemKeyAtom={getItemKeyAtom}
        openAtom={openAtom}
        // size={size}
        controlRef={controlRef}
        getOptionActions={getOptionActions}
        // dropdownRef={useForkRef([dropdownRef, dropdownRefProp])}
        // form={dropdownForm}
        // className={dropdownClassName}
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
      />
      {footer && (
        <div
          className={cnFlatSelect(
            'Footer',
            {
              border: view === 'clear' ? bordered : undefined,
              form: bordered ? form : undefined,
            },
            [
              Array.isArray(footer)
                ? cnMixFlex({ flex: 'flex', justify: 'flex-end', gap: 'xs' })
                : undefined,
              cnMixSpace({ pV: 'xs', pH: 's' }),
            ],
          )}
        >
          {renderSlot(footer)}
        </div>
      )}
    </div>
  );
};

export const FlatSelect = withCtx(
  forwardRef(FlatSelectRender),
) as FlatSelectComponent;
