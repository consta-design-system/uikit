import './SelectDropdown.css';

import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
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

export const selectDropdownForm = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownForm[number];
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
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.Ref<HTMLDivElement>;
  getOptionActions(props: OptionProps<ITEM>): GetOptionPropsResult;
  form: SelectDropdownPropForm;
  openAtom: AtomMut<boolean>;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
  highlightedIndexAtom: AtomMut<number>;
  visibleItemsAtom: AtomMut<
    (
      | OptionForCreate
      | {
          items: Array<SelectAllItem | ITEM>;
          key: string | number;
          group?: GROUP;
          groupIndex: number;
          checkedCount?: number;
          totalCount?: number;
        }
    )[]
  >;
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
  highlightIndex: (index: number) => void;
  onCreate: (e: React.SyntheticEvent) => void;
  onChange: (e: React.SyntheticEvent, item: ITEM) => void;
  inputValueAtom: AtomMut<string>;
  groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
}>;

type SelectDropdownComponent = <ITEM, GROUP>(
  props: Props<ITEM, GROUP>,
) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');

const getLengthElements = <ITEM, GROUP>(
  elements: (
    | OptionForCreate
    | {
        items: Array<SelectAllItem | ITEM>;
        key: string | number;
        group?: GROUP;
        groupIndex: number;
        checkedCount?: number;
        totalCount?: number;
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
    controlRef,
    size,
    getOptionActions,
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
    itemsRefs,
    virtualScroll,
    onScrollToBottom,
    highlightedIndexAtom,
    valueAtom,
    getItemKeyAtom,
    highlightIndex,
    onCreate,
    onChange,
    onChangeAll,
    inputValueAtom,
    groupsCounterAtom,
    ...otherProps
  } = props;

  const [visibleItems] = useAtom(visibleItemsAtom);
  const [hasItems] = useAtom(hasItemsAtom);

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
    isActive: virtualScroll,
    onScrollToBottom,
  });

  const slice: [number, number] =
    sliceHookProp[0] === 0 && virtualScroll ? [0, 50] : sliceHookProp;

  const getIndex = fabricIndex();
  const getVirtualIndex = fabricIndex();

  return (
    <SelectPopover
      {...otherProps}
      anchorRef={controlRef}
      offset={offset}
      role="listbox"
      className={cnSelectDropdown()}
      size={size}
      controlRef={controlRef}
      openAtom={openAtom}
      form={form}
    >
      <div
        className={cnSelectDropdown('ScrollContainer', [
          cnMixSpace({
            pV: mapVerticalSpace[size],
          }),
          cnMixScrollBar({ size: 'xs' }),
        ])}
        ref={useForkRef([scrollElementRef, dropdownRefProp])}
      >
        {isLoading && !isListShowed && <SelectLoader />}
        <div
          className={cnSelectDropdown('List')}
          key={cnSelectDropdown('List')}
          style={{ marginTop: spaceTop }}
        >
          {visibleItems.map((group, groupIndex) => {
            if (isOptionForCreate(group)) {
              const index = getIndex();
              return (
                <SelectCreateButton
                  size={size}
                  key={cnSelectDropdown('List', { key: 'CreateButton' })}
                  labelForCreate={labelForCreate}
                  indent={indent}
                  ref={itemsRefs[index]}
                  onClick={onCreate}
                  highlightedIndexAtom={highlightedIndexAtom}
                  inputValueAtom={inputValueAtom}
                  highlightIndex={highlightIndex}
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
                      groupsCounterAtom={groupsCounterAtom}
                      label={getGroupLabel(group.group)}
                      size={size}
                      indent={indent}
                      ref={listRefs[virtualIndex]}
                      key={`group-${group.key}`}
                    />
                  )}
                {group.items.map((item, i) => {
                  if (isOptionForSelectAll(item)) {
                    const virtualIndex = getVirtualIndex();
                    const index = getIndex();

                    if (isVisible(slice, virtualIndex)) {
                      return (
                        <SelectItemAll
                          key={`group-${group.key}-SelectItemAll`}
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
                          intermediate={
                            item.checkedCount && item.totalCount
                              ? item.checkedCount !== item.totalCount
                              : false
                          }
                          checked={item.checkedCount === item.totalCount}
                          countItems={item.checkedCount}
                          total={item.totalCount}
                        />
                      );
                    }
                  } else {
                    const virtualIndex = getVirtualIndex();
                    const index = getIndex();
                    if (isVisible(slice, virtualIndex)) {
                      return (
                        <SelectRenderItem
                          key={`${group.key}-${i}`}
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
      </div>
    </SelectPopover>
  );
});
