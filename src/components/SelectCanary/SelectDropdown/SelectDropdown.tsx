import './SelectDropdown.css';

import { action, AtomLike, computed, wrap } from '@reatom/core';
import React, { Fragment, memo } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import {
  ListGroupLabel,
  ListItem,
  ListLoader,
  mapVerticalSpace,
} from '##/components/ListCanary';
import { PopoverPropOffset } from '##/components/Popover';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnCanary as cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';
import { SelectAllItem } from '##/utils/getGroups';
import { setRefs } from '##/utils/setRef';
import { factoryComponent } from '##/utils/state';
import { virtualScrollEffect } from '##/utils/state/virtualScrollEffect';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import {
  GetOptionPropsResult,
  isNotOptionForCreate,
  isOptionForCreate,
  isOptionForSelectAll,
} from '../model';
import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectItemAll } from '../SelectItemAll/SelectItemAll';
import { SelectLoader } from '../SelectLoader/SelectLoader';
import { SelectPopover } from '../SelectPopover';
import {
  SelectRenderItem,
  SelectRenderItemComponent,
} from '../SelectRenderItem';
import {
  OptionForCreate,
  OptionProps,
  SelectGroupDefault,
  SelectItemDefault,
  VisibleItem,
} from '../types';

const ListGroupLabelMemo = memo(ListGroupLabel);
const SelectCreateButtonMemo = memo(SelectCreateButton);
const SelectItemAllMemo = memo(SelectItemAll);
const SelectRenderItemMemo = memo(
  SelectRenderItem,
) as SelectRenderItemComponent;

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

type Props<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
> = PropsWithJsxAttributes<{
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
  visibleItemsAtom: AtomLike<VisibleItem<ITEM, GROUP>[]>;
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
  disabledAtom: AtomLike<boolean>;
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

export const SelectDropdown = factoryComponent<HTMLDivElement, Props>(
  ({ visibleItemsAtom, onScrollToBottom }, propsAtom) => {
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
      setRefs([scrollElementAtom.set, propsAtom().dropdownRef], el),
    );

    return (props) => {
      const {
        controlElAtom,
        size,
        getOptionActions,
        dropdownRef,
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
        getItemRef,
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
        disabledAtom,
        ...otherProps
      } = props;
      const getIndex = fabricIndex();
      const getVirtualIndex = fabricIndex();
      const indent = form === 'round' ? 'increased' : 'normal';
      const offset = offsetProp === 'none' ? undefined : offsetProp;
      const spaceTop = spaceTopAtom();

      return (
        <SelectPopover
          {...otherProps}
          controlElAtom={controlElAtom}
          offset={offset}
          role="listbox"
          className={cnSelectDropdown(null, [className])}
          size={size}
          openAtom={openAtom}
          form={form}
          style={{
            zIndex: dropdownZIndexAtom(),
          }}
          container={container}
          viewportRef={viewportRef}
          key={cnSelectDropdown('Popover')}
        >
          <div
            className={cnSelectDropdown('ScrollContainer', [
              cnMixSpace({
                pV: mapVerticalSpace[size],
              }),
              cnMixScrollBar({ size: 'xs' }),
            ])}
            ref={wrap(scrollContainerRef)}
          >
            {isLoading && !isListShowedAtom() && <SelectLoader />}
            <div
              className={cnSelectDropdown('List')}
              key={cnSelectDropdown('List')}
            >
              {spaceTop > 0 && (
                <div
                  key={cnSelectDropdown('SpaceTop')}
                  style={{ height: spaceTop }}
                />
              )}
              {visibleItemsAtom().map((group) => {
                if (isOptionForCreate(group)) {
                  const index = getIndex();
                  return (
                    <SelectCreateButtonMemo
                      size={size}
                      key={cnSelectDropdown('List', { key: 'CreateButton' })}
                      labelForCreate={labelForCreate}
                      indent={indent}
                      ref={getItemRef(index)}
                      highlightedIndexAtom={highlightedIndexAtom}
                      inputValueAtom={inputValueAtom}
                      getOptionActions={getOptionActions}
                      index={index}
                      disabledAtom={disabledAtom}
                    />
                  );
                }

                const virtualIndex =
                  visibleItemsAtom().length > 1 ? getVirtualIndex() : 0;

                return (
                  <Fragment key={group.key}>
                    {group.group &&
                      getGroupLabel &&
                      isVisible(sliceAtom(), virtualIndex) && (
                        <ListGroupLabelMemo
                          label={getGroupLabel(group.group)}
                          size={size}
                          innerOffset={indent}
                          ref={wrap(listElementsAtom()[virtualIndex].set)}
                          key={`group-${group.key}-Label`}
                        />
                      )}
                    {group.items.map((item) => {
                      if (isOptionForSelectAll(item)) {
                        const virtualIndex = getVirtualIndex();
                        const index = getIndex();

                        if (isVisible(sliceAtom(), virtualIndex)) {
                          return (
                            <SelectItemAllMemo
                              label={selectAllLabel}
                              groupId={group.key}
                              highlightedIndexAtom={highlightedIndexAtom}
                              groupsCounterAtom={groupsCounterAtom}
                              key={cnSelectDropdown('SelectItemAll', {
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
                        if (isVisible(sliceAtom(), virtualIndex)) {
                          return (
                            <SelectRenderItemMemo
                              key={cnSelectDropdown('SelectRenderItem', {
                                group: group.key,
                                item: getItemKeyAtom()(item),
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
              {isLoading && isListShowedAtom() && (
                <ListLoader size={size} innerOffset={indent} />
              )}
            </div>
            {!isLoading && !hasItemsAtom() && labelForEmptyItems && (
              <ListItem
                size={size}
                label={labelForEmptyItems}
                innerOffset={indent}
              >
                {labelForEmptyItems}
              </ListItem>
            )}
          </div>
        </SelectPopover>
      );
    };
  },
) as SelectDropdownComponent;
