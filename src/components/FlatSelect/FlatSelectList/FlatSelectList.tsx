import './FlatSelectList.css';

import { action, AtomLike, computed, wrap } from '@reatom/core';
import React, { Fragment, memo } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import {
  ListBox,
  ListGroupLabel,
  ListItem,
  ListLoader,
} from '##/components/ListCanary';
import { PopoverPropOffset } from '##/components/Popover';
import { SelectCreateButton } from '##/components/SelectCanary/SelectCreateButton';
import { SelectItemAll } from '##/components/SelectCanary/SelectItemAll';
import { SelectLoader } from '##/components/SelectCanary/SelectLoader';
import {
  SelectRenderItem,
  SelectRenderItemComponent,
} from '##/components/SelectCanary/SelectRenderItem';
import { cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';
import { SelectAllItem } from '##/utils/getGroups';
import { setRefs } from '##/utils/setRef';
import { factoryComponent, virtualScrollEffect } from '##/utils/state';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import {
  GetOptionPropsResult,
  isNotOptionForCreate,
  isOptionForCreate,
  isOptionForSelectAll,
  OptionForCreate,
  OptionProps,
} from '../model';
import {
  CountedGroup,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropRenderItem,
} from '../types';

const SelectRenderItemMemo = memo(
  SelectRenderItem,
) as SelectRenderItemComponent;

const ListGroupLabelMemo = memo(ListGroupLabel);
const SelectCreateButtonMemo = memo(SelectCreateButton);
const SelectItemAllMemo = memo(SelectItemAll);

export const FlatSelectListForm = ['default', 'brick', 'round'] as const;
export type FlatSelectListPropForm = (typeof FlatSelectListForm)[number];
export const defaultFlatSelectListPropForm = FlatSelectListForm[0];

type Props<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
> = PropsWithJsxAttributes<{
  size: FieldPropSize;
  listRef: React.Ref<HTMLDivElement>;
  getOptionActions(props: OptionProps<ITEM>): GetOptionPropsResult;
  openAtom: AtomLike<boolean>;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: FlatSelectPropRenderItem<ITEM>;
  highlightedIndexAtom: AtomLike<number>;
  visibleItemsAtom: AtomLike<(OptionForCreate | CountedGroup<ITEM, GROUP>)[]>;
  getGroupLabel?: (group: GROUP) => string;
  labelForCreate?:
    | ((label: string | undefined) => React.ReactNode)
    | React.ReactNode;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
  notFound?: boolean;
  hasItemsAtom: AtomLike<boolean>;
  getItemRef: (index: number) => React.RefCallback<HTMLDivElement>;
  virtualScroll?: boolean;
  onScrollToBottom?: (length: number) => void;
  valueAtom: AtomLike<ITEM[]>;
  getItemKeyAtom: AtomLike<(item: ITEM) => string | number>;
  onChangeAll: (e: React.SyntheticEvent, items: ITEM[]) => void;
  onChange: (e: React.SyntheticEvent, item: ITEM) => void;
  inputValueAtom: AtomLike<string>;
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  selectAllLabel: string;
  view: 'default' | 'clear';
  form: 'default' | 'brick' | 'round';
  disabledAtom: AtomLike<boolean>;
}>;

type FlatSelectListComponent = <ITEM, GROUP>(
  props: Props<ITEM, GROUP>,
) => React.ReactNode | null;

const cnFlatSelectList = cn('FlatSelectList');

const getLengthElements = <ITEM, GROUP>(
  elements: (
    | OptionForCreate
    | {
        items: Array<SelectAllItem | ITEM>;
        key: string | number;
        group?: GROUP;
      }
  )[],
) => {
  let length = elements.length <= 1 ? 0 : elements.length;

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    if (isNotOptionForCreate(element) && element?.items?.length) {
      length += element.items.length;
    }
  }

  return length;
};

const isVisible = (slice: [number, number], index: number) => {
  return index >= slice[0] && index < slice[1];
};

export const FlatSelectList = factoryComponent<HTMLDivElement, Props>(
  (initProps, propsAtom) => {
    const { visibleItemsAtom, getItemKeyAtom, onScrollToBottom } = initProps;

    const getItemKey = action((item: FlatSelectItemDefault) =>
      getItemKeyAtom()(item),
    );

    const isListShowedAtom = computed(
      () =>
        visibleItemsAtom().filter(
          (group) =>
            isOptionForCreate(group) ||
            (Array.isArray(group.items) && group.items.length > 0),
        ).length > 0,
    );

    const lengthForVirtualScrollAtom = computed(() =>
      getLengthElements(visibleItemsAtom()),
    );

    const { spaceTopAtom, sliceAtom, listElementsAtom, scrollElementAtom } =
      virtualScrollEffect({
        length: lengthForVirtualScrollAtom,
        isActive: computed(() => !!propsAtom().virtualScroll),
        onScrollToBottom,
      });

    const scrollContainerRef = action((el: HTMLDivElement) =>
      setRefs([scrollElementAtom.set, propsAtom().listRef], el),
    );

    return ({
      size,
      getOptionActions,
      listRef,
      labelForCreate,
      className,
      labelForNotFound,
      labelForEmptyItems,
      hasItemsAtom,
      form,
      openAtom,
      renderItem,
      visibleItemsAtom,
      isLoading,
      getGroupLabel,
      notFound,
      getItemRef,
      virtualScroll,
      onScrollToBottom,
      highlightedIndexAtom,
      valueAtom,
      getItemKeyAtom,
      onChange,
      onChangeAll,
      inputValueAtom,
      groupsCounterAtom,
      selectAllLabel,
      view,
      disabledAtom,

      ...otherProps
    }) => {
      const indent = form === 'round' ? 'increased' : 'normal';
      const getIndex = fabricIndex();
      const getVirtualIndex = fabricIndex();
      const spaceTop = spaceTopAtom();
      const visibleItems = visibleItemsAtom();
      const slice = sliceAtom();
      const listRefs = listElementsAtom();
      const isListShowed = isListShowedAtom();
      const hasItems = hasItemsAtom();

      return (
        <ListBox
          {...otherProps}
          size={size}
          ref={wrap(scrollContainerRef)}
          className={cnFlatSelectList({ view }, [className])}
          tabIndex={-1}
        >
          {isLoading && !isListShowedAtom() && <SelectLoader />}
          <div
            className={cnFlatSelectList('List')}
            key={cnFlatSelectList('List')}
          >
            {spaceTop > 0 && (
              <div
                key={cnFlatSelectList('SpaceTop')}
                style={{ height: spaceTop }}
              />
            )}
            {visibleItems.map((group) => {
              if (isOptionForCreate(group)) {
                const index = getIndex();
                return (
                  <SelectCreateButtonMemo
                    size={size}
                    key={cnFlatSelectList('List', { key: 'CreateButton' })}
                    labelForCreate={labelForCreate}
                    indent={indent}
                    ref={getItemRef(index)}
                    highlightedIndexAtom={highlightedIndexAtom}
                    inputValueAtom={inputValueAtom}
                    index={index}
                    getOptionActions={getOptionActions}
                    disabledAtom={disabledAtom}
                  />
                );
              }

              const virtualIndex =
                visibleItems.length > 1 ? getVirtualIndex() : 0;

              return (
                <Fragment key={group.key}>
                  {group.group &&
                    getGroupLabel &&
                    isVisible(slice, virtualIndex) && (
                      <ListGroupLabelMemo
                        label={getGroupLabel(group.group)}
                        size={size}
                        innerOffset={indent}
                        ref={listRefs[virtualIndex].set}
                        key={`group-${group.key}-Label`}
                      />
                    )}
                  {group.items.map((item) => {
                    if (isOptionForSelectAll(item)) {
                      const virtualIndex = getVirtualIndex();
                      const index = getIndex();

                      if (isVisible(slice, virtualIndex)) {
                        return (
                          <SelectItemAllMemo
                            label={selectAllLabel}
                            groupId={group.key}
                            highlightedIndexAtom={highlightedIndexAtom}
                            groupsCounterAtom={groupsCounterAtom}
                            key={cnFlatSelectList('SelectItemAll', {
                              group: group.key,
                            })}
                            listElementsAtom={listElementsAtom}
                            virtualIndex={virtualIndex}
                            getItemRef={getItemRef}
                            indent={indent}
                            size={size}
                            getOptionActions={getOptionActions}
                            index={index}
                            disabledAtom={disabledAtom}
                          />
                        );
                      }
                    } else {
                      const virtualIndex = getVirtualIndex();
                      const index = getIndex();
                      if (isVisible(slice, virtualIndex)) {
                        return (
                          <SelectRenderItemMemo
                            key={cnFlatSelectList('SelectRenderItem', {
                              group: group.key,
                              item: getItemKey(item),
                              index,
                            })}
                            item={item}
                            getItemKeyAtom={getItemKeyAtom}
                            virtualIndex={virtualIndex}
                            highlightedIndexAtom={highlightedIndexAtom}
                            getItemRef={getItemRef}
                            getOptionActions={getOptionActions}
                            listElementsAtom={listElementsAtom}
                            renderItem={renderItem}
                            index={index}
                            valueAtom={valueAtom}
                          />
                        );
                      }
                    }
                  })}
                </Fragment>
              );
            })}
            {isLoading && isListShowed && (
              <ListLoader size={size} innerOffset={indent} />
            )}
          </div>
          {!isLoading && !hasItems && labelForEmptyItems && (
            <ListItem
              size={size}
              label={labelForEmptyItems}
              innerOffset={indent}
            >
              {labelForEmptyItems}
            </ListItem>
          )}
        </ListBox>
      );
    };
  },
) as FlatSelectListComponent;
