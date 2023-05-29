import './SelectDropdown.css';

import React, { Fragment, useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  cnListBox,
  ListItem,
  mapVerticalSpase,
} from '##/components/ListCanary';
import { cnMixSpace } from '##/mixs/MixSpace';
import { SelectAllItem } from '##/utils/getGroups';

import {
  GetOptionPropsResult,
  isOptionForCreate,
  isOptionForSelectAll,
  OptionForCreate,
  OptionProps,
} from '../../../hooks/useSelect/useSelect';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../../utils/bem';
import { fabricIndex } from '../../../utils/fabricIndex';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Popover, PopoverPropOffset } from '../../Popover/Popover';
import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { SelectItemAll } from '../SelectItemAll/SelectSelectAll';
import { SelectLoader } from '../SelectLoader/SelectLoader';
import { PropSize, RenderItemProps } from '../types';

export const selectDropdownform = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownform[number];
export const defaultSelectDropdownPropForm = selectDropdownform[0];

type Props<ITEM, GROUP> = PropsWithJsxAttributes<{
  size: PropSize;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.Ref<HTMLDivElement>;
  getOptionProps(props: OptionProps<ITEM>): GetOptionPropsResult;
  form: SelectDropdownPropForm;
  isOpen: boolean;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => JSX.Element | null;
  visibleItems: (
    | OptionForCreate
    | {
        items: Array<SelectAllItem | ITEM>;
        key: string | number;
        group?: GROUP;
        groupIndex: number;
        checkedCount?: number;
        totalCount?: number;
      }
  )[];
  getGroupLabel?: (group: GROUP) => string;
  labelForCreate?: string;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
  notFound?: boolean;
  hasItems?: boolean;
}>;

type SelectDropdown = <ITEM, GROUP>(
  props: Props<ITEM, GROUP>,
) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');

export const SelectDropdown: SelectDropdown = (props) => {
  const {
    controlRef,
    size,
    getOptionProps,
    dropdownRef,
    labelForCreate,
    className,
    labelForNotFound,
    labelForEmptyItems,
    hasItems = true,
    form,
    isOpen,
    offset: offsetProp = 'none',
    renderItem,
    visibleItems,
    isLoading,
    getGroupLabel,
    notFound,
    ...otherProps
  } = props;

  const indent = form === 'round' ? 'increased' : 'normal';

  const popoverRef = useRef<HTMLDivElement>(null);

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

  return (
    <Transition
      in={isOpen}
      unmountOnExit
      nodeRef={popoverRef}
      timeout={animateTimeout}
    >
      {(animate) => {
        const getIndex = fabricIndex(-1);
        return (
          <Popover
            {...otherProps}
            anchorRef={controlRef}
            direction="downStartLeft"
            possibleDirections={[
              'downStartLeft',
              'upStartLeft',
              'downStartRight',
              'upStartRight',
            ]}
            offset={offset}
            ref={popoverRef}
            role="listbox"
            className={cnSelectDropdown(null, [
              cnListBox({ size, form, border: true, shadow: true }),
              cnMixPopoverAnimate({ animate }),
              className,
            ])}
            equalAnchorWidth
          >
            <div
              className={cnSelectDropdown('List', [
                cnMixSpace({
                  pV: mapVerticalSpase[size],
                }),
              ])}
              ref={dropdownRef}
            >
              {isLoading && (
                <SelectLoader mode={isListShowed ? 'blur' : 'empty'} />
              )}
              {visibleItems.map((group) => {
                if (isOptionForCreate(group)) {
                  return (
                    <SelectCreateButton
                      size={size}
                      labelForCreate={labelForCreate}
                      inputValue={group.label}
                      indent={indent}
                      {...getOptionProps({ index: getIndex(), item: group })}
                    />
                  );
                }
                return (
                  <Fragment key={group.key}>
                    {group.group && getGroupLabel && (
                      <SelectGroupLabel
                        label={getGroupLabel(group.group)}
                        size={size}
                        indent={indent}
                      />
                    )}
                    {group.items.map((item, i) => {
                      if (isOptionForSelectAll(item)) {
                        return (
                          <SelectItemAll
                            indent={indent}
                            size={size}
                            {...getOptionProps({ index: getIndex(), item })}
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
                      return (
                        <Fragment key={`${group.key}-${i}`}>
                          {renderItem({
                            item,
                            ...getOptionProps({ index: getIndex(), item }),
                          })}
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              })}
              {!isLoading && hasItems && notFound && labelForNotFound && (
                <ListItem
                  size={size}
                  label={labelForNotFound}
                  innerOffset={indent}
                >
                  {labelForNotFound}
                </ListItem>
              )}
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
          </Popover>
        );
      }}
    </Transition>
  );
};
