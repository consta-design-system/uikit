import './SelectDropdown.css';

import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  GetOptionPropsResult,
  isOptionForCreate,
  OptionForCreate,
  OptionProps,
} from '../../../hooks/useSelect/useSelect';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { PropSize, RenderItemProps } from '../types';

export const selectDropdownform = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownform[number];
export const defaultSelectDropdownPropForm = selectDropdownform[0];

type Props<ITEM, GROUP> = PropsWithJsxAttributes<{
  size: PropSize;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  getOptionProps(props: OptionProps<ITEM>): GetOptionPropsResult;
  labelForCreate?: string;
  labelForNotFound?: string;
  form: SelectDropdownPropForm;
  isOpen: boolean;
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
}>;

type SelectDropdown = <ITEM, GROUP>(props: Props<ITEM, GROUP>) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');
const cnSelectDropdownCssTransition = cnForCssTransition(cnSelectDropdown);

export const SelectDropdown: SelectDropdown = (props) => {
  const {
    controlRef,
    size,
    getOptionProps,
    dropdownRef,
    labelForCreate,
    className,
    labelForNotFound,
    form,
    isOpen,
    renderItem,
    visibleItems,
    getGroupLabel,
  } = props;

  let index = -1;

  const indent = form === 'round' ? 'increased' : 'normal';

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnSelectDropdownCssTransition}
      timeout={200}
    >
      <Popover
        anchorRef={controlRef}
        direction="downStartLeft"
        possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
        offset={1}
        role="listbox"
        className={cnSelectDropdown({ form, size }, [className])}
        equalAnchorWidth
      >
        <div className={cnSelectDropdown('List', { size, form })} ref={dropdownRef}>
          {visibleItems.map((group) => {
            if (isOptionForCreate(group)) {
              index++;
              return (
                <SelectCreateButton
                  size={size}
                  labelForCreate={labelForCreate}
                  inputValue={group.label}
                  indent={indent}
                  {...getOptionProps({ index, item: group })}
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
                  index++;

                  return (
                    <Fragment key={`${group.key}-${i}`}>
                      {renderItem({
                        item,
                        ...getOptionProps({ index, item }),
                      })}
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
          {visibleItems.length === 0 && (
            <Text className={cnSelectDropdown('LabelForNotFound')}>{labelForNotFound}</Text>
          )}
        </div>
      </Popover>
    </CSSTransition>
  );
};
