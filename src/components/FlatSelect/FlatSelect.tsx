import './FlatSelect.css';

import React, { forwardRef } from 'react';

import { FieldInput } from '##/components/FieldComponents';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { useSendToAtom, withCtx } from '##/utils/state';

import { withDefault } from './defaultProps';
import { FlatSelectControlLayout } from './FlatSelectControlLayout';
import { FlatSelectFooter } from './FlatSelectFooter';
import { FlatSelectList } from './FlatSelectList';
import { FlatSelectRoot } from './FlatSelectRoot';
import {
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectProps,
} from './types';
import { useFlatSelect } from './useFlatSelect';
import { useRenderItem } from './useRenderItem';

const cnFlatSelect = cn('FlatSelect');

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
    isLoading,
    listRef: listRefProp,
    renderItem: renderItemProp,
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
    view: viewProp,
    bordered: borderedProp,
    getGroupKey,
    getItemDisabled,
    getItemGroupKey,
    getItemKey,
    getItemLabel,
    items,
    onChange: onChangeProp,
    onFocus,
    onBlur,
    onCreate: onCreateProp,
    onInput,
    multiple,
    groups,
    onOpen,
    ignoreOutsideClicksRefs,
    clearButton,
    selectAll,
    selectAllLabel,
    autoFocus,
    footer,
    listClassName,
    anchorRef,
    iconLeft: IconLeft,
    direction,
    spareDirection,
    possibleDirections,
    ...otherProps
  } = props;

  const {
    getOptionActions,
    openAtom,
    visibleItemsAtom,
    inputFocusAtom,
    handleInputFocus,
    handleInputBlur,
    inputRef,
    handleInputChange,
    clearValue,
    optionsRefs,

    listRef,
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
    rootRef,
    createButtonOnMouseEnter,
    handleRootFocus,
    handleRootBlur,
    handleRootMouseDown,
    handleRootMouseUp,
    useKeysRefPropsAtom,
  } = useFlatSelect<FlatSelectItemDefault, FlatSelectGroupDefault, false>({
    propsAtom,
  });

  const renderItem = useRenderItem({
    getItemLabel,
    getItemDisabled,
    multiple,
    disabled,
    size,
    renderItem: renderItemProp,
  });

  const view = !input || anchorRef ? 'clear' : viewProp;
  const bordered = anchorRef ? true : borderedProp;
  const fieldInputRef = useForkRef([inputRef, inputRefProp]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <FlatSelectRoot
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
      anchorRef={anchorRef}
      openAtom={openAtom}
      useKeysRefPropsAtom={useKeysRefPropsAtom}
      onFocus={handleRootFocus}
      onBlur={handleRootBlur}
      onMouseDown={handleRootMouseDown}
      onMouseUp={handleRootMouseUp}
      tabIndex={0}
      direction={direction}
      spareDirection={spareDirection}
      possibleDirections={possibleDirections}
    >
      {input && (
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
            form={form}
            disabled={disabled}
            separator
            onClear={clearValue}
            focusAtom={inputFocusAtom}
            iconClear={iconClear}
            leftSide={IconLeft && <IconLeft size="s" />}
            clearButtonAtom={clearButtonAtom}
            size={size}
            view={view}
          >
            <FieldInput
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              ref={fieldInputRef}
              onChange={handleInputChange}
              value={inputValue}
              defaultValue={inputDefaultValue}
              disabled={disabled}
              placeholder={placeholder}
            />
          </FlatSelectControlLayout>
        </div>
      )}
      <FlatSelectList
        className={cnFlatSelect(
          'List',
          {
            borderTop: view === 'clear' && !input ? bordered : undefined,
            borderHorizontal: view === 'clear' ? bordered : undefined,
            borderBottom: view === 'clear' && !footer ? bordered : undefined,
            formTop: bordered && !input ? form : undefined,
            formBottom: bordered && !footer ? form : undefined,
          },
          [listClassName],
        )}
        view={view}
        size={size}
        form={form}
        valueAtom={valueAtom}
        getItemKeyAtom={getItemKeyAtom}
        openAtom={openAtom}
        getOptionActions={getOptionActions}
        listRef={useForkRef([listRef, listRefProp])}
        renderItem={renderItem}
        getGroupLabel={getGroupLabel}
        visibleItemsAtom={visibleItemsAtom}
        labelForCreate={labelForCreate}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        itemsRefs={optionsRefs}
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
        createButtonOnMouseEnter={createButtonOnMouseEnter}
      />
      {footer && (
        <FlatSelectFooter
          view={view}
          bordered={bordered}
          form={form}
          footer={footer}
        />
      )}
    </FlatSelectRoot>
  );
};

export const FlatSelect = withCtx(
  forwardRef(FlatSelectRender),
) as FlatSelectComponent;
