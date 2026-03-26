import './SelectDropdown.css';

import { AtomLike } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import React, { Fragment, memo, useMemo } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import {
  ListItem,
  ListLoader,
  mapVerticalSpace,
} from '##/components/ListCanary';
import { PopoverPropOffset } from '##/components/Popover';
import {
  GetOptionPropsResult,
  isNotOptionForCreate,
  isOptionForCreate,
  isOptionForSelectAll,
  OptionForCreate,
  OptionProps,
} from '##/components/SelectCanary/useSelect';
import { forkRef, useForkRef } from '##/hooks/useForkRef';
import { useVirtualScroll } from '##/hooks/useVirtualScroll';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnCanary as cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';
import { SelectAllItem } from '##/utils/getGroups';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { SelectItemAll } from '../SelectItemAll/SelectItemAll';
import { SelectLoader } from '../SelectLoader/SelectLoader';
import { SelectPopover } from '../SelectPopover';
import { SelectRenderItem } from '../SelectRenderItem';
import { CountedGroup } from '../types';

export const selectDropdownForm = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = (typeof selectDropdownForm)[number];
export const defaultSelectDropdownPropForm = selectDropdownForm[0];

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
  controlElAtom: AtomLike<HTMLDivElement | null>;
  dropdownRef: React.Ref<HTMLDivElement | null>;
  getOptionActions(props: OptionProps<ITEM>): GetOptionPropsResult;
  form: SelectDropdownPropForm;
  openAtom: AtomLike<boolean>;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
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
  getItemRef: (index: number) => React.Ref<HTMLDivElement>;
  virtualScroll?: boolean;
  onScrollToBottom?: (length: number) => void;
  valueAtom: AtomLike<ITEM[]>;
  getItemKeyAtom: AtomLike<(item: ITEM) => string | number>;
  onChangeAll: (e: React.SyntheticEvent, items: ITEM[]) => void;
  onCreate: (e: React.SyntheticEvent) => void;
  onChange: (e: React.SyntheticEvent, item: ITEM) => void;
  inputValueAtom: AtomLike<string>;
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  dropdownZIndexAtom: AtomLike<number | undefined>;
  selectAllLabel: string;
  viewportRef?: React.RefObject<HTMLElement | null>;
  container?: Element;
}>;

type SelectDropdownComponent = <ITEM, GROUP>(
  props: Props<ITEM, GROUP>,
) => React.ReactNode | null;

export const cnSelectDropdown = cn('SelectDropdown');

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

export const SelectDropdown: SelectDropdownComponent = memo((props) => {
  const {
    controlElAtom,
    size,
    getOptionActions: getOptionActionsAction,
    dropdownRef: dropdownRefProp,
    labelForCreate,
    className,
    labelForNotFound,
    labelForEmptyItems,
    hasItemsAtom,
    form,
    openAtom,
    offset: offsetProp = 'none',
    renderItem,
    visibleItemsAtom,
    isLoading,
    getGroupLabel,
    notFound,
    getItemRef: getItemRefAction,
    virtualScroll,
    onScrollToBottom,
    highlightedIndexAtom,
    valueAtom,
    getItemKeyAtom,
    onCreate,
    onChange,
    onChangeAll,
    inputValueAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
    selectAllLabel,
    container,
    viewportRef,
    ...otherProps
  } = props;

  const [visibleItems] = useAtom(visibleItemsAtom);

  const [hasItems] = useAtom(hasItemsAtom);
  const [open] = useAtom(openAtom);
  const [isListMount, setIsListMount] = useAtom(open);

  const [getItemKey] = useAtom(getItemKeyAtom);
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

  const offset = offsetProp === 'none' ? undefined : offsetProp;

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
    isActive: virtualScroll && open,
    onScrollToBottom,
  });

  const scrollContainerRef = useForkRef([scrollElementRef, dropdownRefProp]);

  const slice: [number, number] =
    sliceHookProp[0] === 0 && virtualScroll ? [0, 50] : sliceHookProp;

  const getIndex = fabricIndex();
  const getVirtualIndex = fabricIndex();
  const [zIndex] = useAtom(dropdownZIndexAtom);
  const getItemRef = useAction(getItemRefAction);

  const getOptionActions = useAction(getOptionActionsAction);

  return (
    <SelectPopover
      {...otherProps}
      controlElAtom={controlElAtom}
      offset={offset}
      role="listbox"
      className={cnSelectDropdown()}
      size={size}
      openAtom={openAtom}
      form={form}
      onMount={setIsListMount}
      style={{ zIndex }}
      container={container}
      viewportRef={viewportRef}
    >
      {isListMount && (
        <div
          className={cnSelectDropdown('ScrollContainer', [
            cnMixSpace({
              pV: mapVerticalSpace[size],
            }),
            cnMixScrollBar({ size: 'xs' }),
          ])}
          ref={scrollContainerRef}
        >
          {isLoading && !isListShowed && <SelectLoader />}
          <div
            className={cnSelectDropdown('List')}
            key={cnSelectDropdown('List')}
            style={{ marginTop: spaceTop }}
          >
            {visibleItems.map((group) => {
              if (isOptionForCreate(group)) {
                const index = getIndex();
                return (
                  <SelectCreateButton
                    size={size}
                    key={cnSelectDropdown('List', { key: 'CreateButton' })}
                    labelForCreate={labelForCreate}
                    indent={indent}
                    ref={getItemRef(index)}
                    onClick={onCreate}
                    highlightedIndexAtom={highlightedIndexAtom}
                    inputValueAtom={inputValueAtom}
                    index={index}
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
                      <SelectGroupLabel
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
                          <SelectItemAll
                            label={selectAllLabel}
                            groupId={group.key}
                            highlightedIndexAtom={highlightedIndexAtom}
                            groupsCounterAtom={groupsCounterAtom}
                            key={cnSelectDropdown('SelectItemAll', {
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
                          />
                        );
                      }
                    } else {
                      const virtualIndex = getVirtualIndex();
                      const index = getIndex();
                      if (isVisible(slice, virtualIndex)) {
                        return (
                          <SelectRenderItem
                            key={cnSelectDropdown('SelectRenderItem', {
                              group: group.key,
                              item: getItemKey(item),
                            })}
                            getItemKeyAtom={getItemKeyAtom}
                            highlightedIndexAtom={highlightedIndexAtom}
                            ref={forkRef([
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
            <ListItem
              size={size}
              label={labelForEmptyItems}
              innerOffset={indent}
            >
              {labelForEmptyItems}
            </ListItem>
          )}
        </div>
      )}
    </SelectPopover>
  );
});
