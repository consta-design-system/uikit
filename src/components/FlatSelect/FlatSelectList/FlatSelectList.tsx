import './FlatSelectList.css';

import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
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
import { SelectItemAll } from '../FlatSelectItemAll/FlatSelectItemAll';
import { FlatSelectLoader } from '../FlatSelectLoader/FlatSelectLoader';
// import { SelectPopover } from '../SelectPopover';
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
export type FlatSelectListPropForm = typeof FlatSelectListForm[number];
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
  //   form: FlatSelectListPropForm;
  openAtom: AtomMut<boolean>;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
  highlightedIndexAtom: AtomMut<number>;
  visibleItemsAtom: AtomMut<(OptionForCreate | CountedGroup<ITEM, GROUP>)[]>;
  getGroupLabel?: (group: GROUP) => string;
  labelForCreate?:
    | ((label: string | undefined) => React.ReactNode)
    | React.ReactNode;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
  notFound?: boolean;
  hasItemsAtom: AtomMut<boolean>;
  itemsRefs: React.RefObject<HTMLDivElement>[];
  virtualScroll?: boolean;
  onScrollToBottom?: (length: number) => void;
  valueAtom: AtomMut<ITEM[]>;
  getItemKeyAtom: AtomMut<(item: ITEM) => string | number>;
  onChangeAll: (e: React.SyntheticEvent, items: ITEM[]) => void;
  onCreate: (e: React.SyntheticEvent) => void;
  onChange: (e: React.SyntheticEvent, item: ITEM) => void;
  inputValueAtom: AtomMut<string>;
  groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
  dropdownZIndexAtom: AtomMut<number | undefined>;
  selectAllLabel: string;
  view: 'default' | 'clear';
  form: 'default' | 'brick' | 'round';
  createButtonOnMouseEnter: () => void;
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

export const FlatSelectList: FlatSelectListComponent = memo((props) => {
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
    // offset: offsetProp = 'none',
    renderItem,
    visibleItemsAtom,
    isLoading,
    getGroupLabel,
    notFound,
    itemsRefs,
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
    view,
    createButtonOnMouseEnter,

    ...otherProps
  } = props;

  const [visibleItems] = useAtom(visibleItemsAtom);

  const [hasItems] = useAtom(hasItemsAtom);
  //   const [isListMount, setIsListMount] = useAtom(false);
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

  //   const offset = offsetProp === 'none' ? undefined : offsetProp;

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
  //   const [zIndex] = useAtom(dropdownZIndexAtom);

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
                ref={itemsRefs[index]}
                onClick={onCreate}
                highlightedIndexAtom={highlightedIndexAtom}
                inputValueAtom={inputValueAtom}
                onMouseEnter={createButtonOnMouseEnter}
                index={index}
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
                      <SelectItemAll
                        label={selectAllLabel}
                        groupId={group.key}
                        highlightedIndexAtom={highlightedIndexAtom}
                        groupsCounterAtom={groupsCounterAtom}
                        key={cnFlatSelectList('SelectItemAll', {
                          group: group.key,
                        })}
                        ref={forkRef([
                          listRefs[virtualIndex],
                          itemsRefs[index],
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
                      <FlatSelectRenderItem
                        key={cnFlatSelectList('SelectRenderItem', {
                          group: group.key,
                          item: getItemKey(item),
                        })}
                        getItemKeyAtom={getItemKeyAtom}
                        highlightedIndexAtom={highlightedIndexAtom}
                        rootRef={forkRef([
                          listRefs[virtualIndex],
                          itemsRefs[index],
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
});
