import './FlatSelectList.css';

import { AtomLike } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import React, { Fragment, memo, useMemo } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListBox, ListItem, ListLoader } from '##/components/ListCanary';
import { PopoverPropOffset } from '##/components/Popover';
import { forkRef, useForkRef } from '##/hooks/useForkRef';
import { useVirtualScroll } from '##/hooks/useVirtualScroll';
import { cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';
import { SelectAllItem } from '##/utils/getGroups';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { FlatSelectCreateButton } from '../FlatSelectCreateButton';
import { FlatSelectGroupLabel } from '../FlatSelectGroupLabel/FlatSelectGroupLabel';
import { FlatSelectItemAll } from '../FlatSelectItemAll/FlatSelectItemAll';
import { FlatSelectLoader } from '../FlatSelectLoader/FlatSelectLoader';
import { FlatSelectRenderItem } from '../FlatSelectRenderItem';
import { CountedGroup } from '../types';
import {
  GetOptionPropsResult,
  isNotOptionForCreate,
  isOptionForCreate,
  isOptionForSelectAll,
  OptionForCreate,
  OptionProps,
} from '../useFlatSelect';

export const FlatSelectListForm = ['default', 'brick', 'round'] as const;
export type FlatSelectListPropForm = (typeof FlatSelectListForm)[number];
export const defaultFlatSelectListPropForm = FlatSelectListForm[0];

type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

type Props<ITEM, GROUP> = PropsWithJsxAttributes<{
  size: FieldPropSize;
  listRef: React.Ref<HTMLDivElement>;
  getOptionActions(props: OptionProps<ITEM>): GetOptionPropsResult;
  openAtom: AtomLike<boolean>;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: AtomLike<
    (props: RenderItemProps<ITEM>) => React.ReactNode | null
  >;
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

export const FlatSelectList = memo(<ITEM, GROUP>(props: Props<ITEM, GROUP>) => {
  const {
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
  } = props;

  const [visibleItems] = useAtom(visibleItemsAtom);

  const [hasItems] = useAtom(hasItemsAtom);

  const getItemKey = useAction((item: ITEM) => getItemKeyAtom()(item));
  const indent = form === 'round' ? 'increased' : 'normal';

  const isListShowed = useMemo(() => {
    return (
      visibleItems.filter(
        (group) =>
          isOptionForCreate(group) ||
          (Array.isArray(group.items) && group.items.length > 0),
      ).length > 0
    );
  }, [visibleItems]);

  const lengthForVirtualScroll = useMemo(
    () => getLengthElements(visibleItems),
    [visibleItems],
  );

  const {
    spaceTop,
    slice: sliceHookProp,
    listRefs,
    scrollElementRef,
  } = useVirtualScroll({
    length: lengthForVirtualScroll,
    isActive: virtualScroll,
    onScrollToBottom,
  });

  const scrollContainerRef = useForkRef([scrollElementRef, listRef]);

  const slice: [number, number] =
    sliceHookProp[0] === 0 && virtualScroll ? [0, 50] : sliceHookProp;

  const getIndex = fabricIndex();
  const getVirtualIndex = fabricIndex();

  return (
    <ListBox
      {...otherProps}
      size={size}
      ref={scrollContainerRef}
      className={cnFlatSelectList({ view }, [className])}
      tabIndex={-1}
    >
      {isLoading && !isListShowed && <FlatSelectLoader />}
      <div
        className={cnFlatSelectList('List')}
        key={cnFlatSelectList('List')}
        style={{ marginTop: spaceTop }}
      >
        {visibleItems.map((group) => {
          if (isOptionForCreate(group)) {
            const index = getIndex();
            return (
              <FlatSelectCreateButton
                size={size}
                key={cnFlatSelectList('List', { key: 'CreateButton' })}
                labelForCreate={labelForCreate}
                indent={indent}
                ref={getItemRef(index)}
                highlightedIndexAtom={highlightedIndexAtom}
                inputValueAtom={inputValueAtom}
                disabledAtom={disabledAtom}
                index={index}
                {...getOptionActions({
                  index,
                  item: group,
                })}
              />
            );
          }

          const virtualIndex = visibleItems.length > 1 ? getVirtualIndex() : 0;

          return (
            <Fragment key={group.key}>
              {group.group &&
                getGroupLabel &&
                isVisible(slice, virtualIndex) && (
                  <FlatSelectGroupLabel
                    label={getGroupLabel(group.group)}
                    size={size}
                    indent={indent}
                    ref={listRefs[virtualIndex]}
                    key={`group-${group.key}-Label`}
                  />
                )}
              {group.items.map((item) => {
                if (isOptionForSelectAll(item)) {
                  const virtualIndex = getVirtualIndex();
                  const index = getIndex();

                  if (isVisible(slice, virtualIndex)) {
                    return (
                      <FlatSelectItemAll
                        label={selectAllLabel}
                        groupId={group.key}
                        highlightedIndexAtom={highlightedIndexAtom}
                        groupsCounterAtom={groupsCounterAtom}
                        key={cnFlatSelectList('SelectItemAll', {
                          group: group.key,
                        })}
                        ref={forkRef([
                          listRefs[virtualIndex],
                          getItemRef(index),
                        ])}
                        indent={indent}
                        size={size}
                        {...getOptionActions({
                          index,
                          item,
                        })}
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
                      <FlatSelectRenderItem
                        key={cnFlatSelectList('SelectRenderItem', {
                          group: group.key,
                          item: getItemKey(item),
                        })}
                        getItemKeyAtom={getItemKeyAtom}
                        highlightedIndexAtom={highlightedIndexAtom}
                        rootRef={forkRef([
                          listRefs[virtualIndex],
                          getItemRef(index),
                        ])}
                        renderItem={renderItem}
                        item={item}
                        {...getOptionActions({
                          index,
                          item,
                        })}
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
        <ListItem size={size} label={labelForEmptyItems} innerOffset={indent}>
          {labelForEmptyItems}
        </ListItem>
      )}
    </ListBox>
  );
}) as FlatSelectListComponent;
