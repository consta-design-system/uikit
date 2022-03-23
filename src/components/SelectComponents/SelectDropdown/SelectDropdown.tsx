import './SelectDropdown.css';

import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import {
  GetOptionPropsResult,
  isOptionForCreate,
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
import { Direction, Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { SelectLoader } from '../SelectLoader/SelectLoader';
import { PropSize, RenderItemProps } from '../types';

export const selectDropdownform = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownform[number];
export const defaultSelectDropdownPropForm = selectDropdownform[0];

type Props<ITEM, GROUP> = PropsWithJsxAttributes<{
  size: PropSize;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  getOptionProps(props: OptionProps<ITEM>): GetOptionPropsResult;
  form: SelectDropdownPropForm;
  isOpen: boolean;
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => JSX.Element | null;
  visibleItems: (
    | OptionForCreate
    | {
        items: ITEM[];
        key: string | number;
        group?: GROUP;
        groupIndex: number;
      }
  )[];
  getGroupLabel?: (group: GROUP) => string;
  labelForCreate?: string;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
  notFound?: boolean;
  hasItems?: boolean;
}>;

type SelectDropdown = <ITEM, GROUP>(props: Props<ITEM, GROUP>) => React.ReactElement | null;

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
    renderItem,
    visibleItems,
    isLoading,
    getGroupLabel,
    notFound,
    ...otherProps
  } = props;

  const getIndex = fabricIndex(-1);
  const [direction, setDirection] = useState<Direction>('downStartLeft');

  const indent = form === 'round' ? 'increased' : 'normal';

  const popoverRef = useRef<HTMLDivElement>(null);

  const isListShowed = useMemo(() => {
    return (
      visibleItems.filter(
        (group) =>
          isOptionForCreate(group) || (Array.isArray(group.items) && group.items.length > 0),
      ).length > 0
    );
  }, [visibleItems]);

  return (
    <Transition in={isOpen} unmountOnExit nodeRef={popoverRef} timeout={animateTimeout}>
      {(animate) => (
        <Popover
          {...otherProps}
          anchorRef={controlRef}
          direction="downStartLeft"
          possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
          offset="2xs"
          ref={popoverRef}
          role="listbox"
          onSetDirection={setDirection}
          className={cnSelectDropdown({ form, size }, [
            className,
            cnMixPopoverAnimate({ direction, animate }),
          ])}
          equalAnchorWidth
        >
          <div className={cnSelectDropdown('List', { size, form })} ref={dropdownRef}>
            {isLoading && <SelectLoader mode={isListShowed ? 'blur' : 'empty'} />}
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
            {!isLoading && notFound && labelForNotFound && (
              <Text className={cnSelectDropdown('LabelForNotFound')}>{labelForNotFound}</Text>
            )}
            {!isLoading && !hasItems && labelForEmptyItems && (
              <Text className={cnSelectDropdown('LabelForEmptyItems')}>{labelForEmptyItems}</Text>
            )}
          </div>
        </Popover>
      )}
    </Transition>
  );
};
