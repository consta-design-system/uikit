import './FlatSelect.css';

import { computed } from '@reatom/core';
import React from 'react';

import { FieldInput } from '##/components/FieldComponents';
import { forkRef } from '##/hooks/useForkRef';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { factoryComponent } from '##/utils/state';

import { withDefault } from './defaultProps';
import { FlatSelectControlLayout } from './FlatSelectControlLayout';
import { FlatSelectFooter } from './FlatSelectFooter';
import { FlatSelectList } from './FlatSelectList';
import { FlatSelectRoot } from './FlatSelectRoot';
import { model } from './model';
import { renderItemAtom } from './renderItem';
import {
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectProps,
} from './types';

export const cnFlatSelect = cn('FlatSelect');

export const FlatSelect = factoryComponent<HTMLDivElement, FlatSelectProps>(
  (initProps, propsAtom) => {
    const propsWithDefault = computed(() => withDefault(propsAtom()));

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
      getOptionRef,
      disabledAtom,
      listRef,
      clearButtonAtom,
      highlightedIndexAtom,
      getItemKeyAtom,
      valueAtom,
      onChangeAll,
      onChange,
      inputValueAtom,
      hasItemsAtom,
      groupsCounterAtom,
      rootRef,
    } = model<FlatSelectItemDefault, FlatSelectGroupDefault, false>(
      propsWithDefault,
    );

    const renderItem = renderItemAtom(propsWithDefault);

    return (props) => {
      const propsWithDefault = withDefault(props);

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
        inputDefaultValue,
        inputValue,
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
        container,
        ...otherProps
      } = propsWithDefault;

      const view = !input || anchorRef || borderedProp ? 'clear' : viewProp;
      const bordered = anchorRef ? true : borderedProp;
      const fieldInputRef = forkRef([inputRef, inputRefProp]);
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <FlatSelectRoot
          {...otherProps}
          ref={forkRef([initProps.ref, rootRef])}
          className={cnFlatSelect(
            {
              view,
              bordered: view === 'clear' ? bordered : undefined,
              form: bordered ? form : undefined,
              size,
            },
            [className],
          )}
          style={{
            ...style,
            ['--flat-select-control-height' as string]: `var(--control-height-${size})`,
          }}
          anchorRef={anchorRef}
          openAtom={openAtom}
          tabIndex={0}
          direction={direction}
          spareDirection={spareDirection}
          possibleDirections={possibleDirections}
          container={container}
        >
          {input && (
            <div
              className={cnFlatSelect(
                'Input',
                {
                  border: view === 'clear' ? bordered : undefined,
                  form: bordered ? form : undefined,
                },
                [
                  view === 'clear'
                    ? cnMixSpace({ pV: '2xs', pH: 's' })
                    : undefined,
                ],
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
          <FlatSelectList<FlatSelectItemDefault, FlatSelectGroupDefault>
            className={cnFlatSelect(
              'List',
              {
                borderTop: view === 'clear' && !input ? bordered : undefined,
                borderHorizontal: view === 'clear' ? bordered : undefined,
                borderBottom:
                  view === 'clear' && !footer ? bordered : undefined,
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
            listRef={listRef}
            renderItem={renderItem}
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
            onChange={onChange}
            inputValueAtom={inputValueAtom}
            hasItemsAtom={hasItemsAtom}
            groupsCounterAtom={groupsCounterAtom}
            selectAllLabel={selectAllLabel}
            disabledAtom={disabledAtom}
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
  },
) as FlatSelectComponent;
