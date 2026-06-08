import './FlatSelect.css';

import { action, computed, wrap } from '@reatom/core';
import React from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldInput } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { Radio } from '##/components/Radio';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { setRefs } from '##/utils/setRef';
import { factoryComponent } from '##/utils/state';

import { withDefault } from './defaultProps';
import { FlatSelectControlLayout } from './FlatSelectControlLayout';
import { FlatSelectFooter } from './FlatSelectFooter';
import { FlatSelectList } from './FlatSelectList';
import { FlatSelectRoot } from './FlatSelectRoot';
import { model } from './model';
import {
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropRenderItem,
  FlatSelectProps,
} from './types';

export const cnFlatSelect = cn('FlatSelect');

export const FlatSelect = factoryComponent<HTMLDivElement, FlatSelectProps>(
  (initProps, propsAtom) => {
    const propsWithDefaultAtom = computed(() => withDefault(propsAtom()));

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
      propsWithDefaultAtom,
    );

    const renderItemDefault: FlatSelectPropRenderItem<FlatSelectItemDefault> =
      action(({ item, active, hovered, onClick, onMouseEnter, ref }) => {
        const disabled =
          propsWithDefaultAtom().getItemDisabled?.(item) ||
          propsWithDefaultAtom().disabled;

        const label = propsWithDefaultAtom().getItemLabel(item);
        const { size, multiple } = propsWithDefaultAtom();

        return (
          <ListItem
            ref={ref}
            aria-selected={active}
            aria-disabled={disabled}
            role="option"
            label={label}
            size={size}
            active={hovered}
            onMouseEnter={onMouseEnter}
            disabled={disabled}
            onClick={onClick}
            leftSide={
              multiple ? (
                <Checkbox
                  checked={active}
                  disabled={disabled}
                  size={size}
                  tabIndex={-1}
                />
              ) : (
                <Radio
                  checked={active}
                  disabled={disabled}
                  size={size}
                  tabIndex={-1}
                />
              )
            }
          />
        );
      });

    const fieldInputRef = action((el: HTMLDivElement | null) =>
      setRefs([inputRef, propsWithDefaultAtom().inputRef], el),
    );
    const ref = action((el: HTMLDivElement | null) =>
      setRefs([propsWithDefaultAtom().ref, rootRef], el),
    );

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
        renderItem,
        isOpen,
        ...otherProps
      } = propsWithDefault;

      const view = !input || anchorRef || borderedProp ? 'clear' : viewProp;
      const bordered = anchorRef ? true : borderedProp;

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <FlatSelectRoot
          {...otherProps}
          ref={wrap(ref)}
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
                  onFocus={wrap(handleInputFocus)}
                  onBlur={wrap(handleInputBlur)}
                  ref={wrap(fieldInputRef)}
                  onChange={wrap(handleInputChange)}
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
            listRef={wrap(listRef)}
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
