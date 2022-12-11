import './List.css';

import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import { isOptionForCreate, useSelect } from '##/hooks/useSelect';
import { cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';

import { withDefaultGetters } from './helper';
import { ListGroupLabel } from './ListGroupLabel/ListGroupLabel';
import { ListItem } from './ListItem/ListItem';
import { ListLoader } from './ListLoader/ListLoader';
import {
  DefaultListGroup,
  DefaultListItem,
  defaultListPropForm,
  defaultListPropSize,
  ListComponent,
  ListPropOnChange,
  ListPropRenderItem,
  ListProps,
} from './types';

export const cnList = cn('List');

const ListRender = <
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
  MULTIPLE extends boolean = false,
>(
  props: ListProps<ITEM, GROUP, MULTIPLE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items,
    isLoading,
    className,
    groups,
    value,
    onChange: onChangeProp,
    disabled,
    getItemLabel,
    getItemLeftIcon,
    getItemLeftSide,
    getItemRightIcon,
    getItemRightSide,
    getItemKey,
    getItemGroupKey,
    getItemDisabled,
    getGroupKey,
    getGroupLabel,
    getGroupRightSide,
    multiple = false,
    renderItem,
    form = defaultListPropForm,
    onBlur,
    onFocus,
    size = defaultListPropSize,
    ...otherProps
  } = withDefaultGetters(props);

  const onChange: ListPropOnChange<ITEM, MULTIPLE> = (params) => {
    onChangeProp?.(params);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const { visibleItems, getOptionProps, getKeyProps } = useSelect({
    items,
    groups,
    value,
    onChange,
    dropdownRef: containerRef,
    controlRef: { current: null },
    disabled,
    getItemLabel,
    getItemKey,
    getGroupKey,
    getItemGroupKey,
    getItemDisabled,
    multiple,
    onBlur,
    onFocus,
  });

  const renderItemDefault: ListPropRenderItem<ITEM> = (props) => {
    const { item, active, hovered, onClick, onMouseEnter } = props;
    const params: Omit<DefaultListItem, 'id'> = {
      label: getItemLabel(item),
      disabled: getItemDisabled(item) || disabled,
      leftSide: getItemLeftSide(item),
      leftIcon: getItemLeftIcon(item),
      rightSide: getItemRightSide(item),
      rightIcon: getItemRightIcon(item),
    };

    return (
      <ListItem
        {...params}
        multiple={multiple}
        size={size}
        active={active}
        indent={form === 'round' ? 'increased' : 'normal'}
        hovered={hovered}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      />
    );
  };

  const getIndex = fabricIndex(-1);
  containerRef.current?.focus();

  return (
    <div
      className={cnList({ size }, [className])}
      ref={useForkRef([ref, containerRef])}
      {...getKeyProps()}
      {...otherProps}
    >
      {visibleItems.map((group) => {
        if (isOptionForCreate(group)) {
          return null;
        }
        return (
          <React.Fragment key={group.key}>
            {group.group && (
              <ListGroupLabel
                size={size}
                label={getGroupLabel(group.group)}
                rightSide={getGroupRightSide(group.group)}
              />
            )}
            {group.items.map((item, index) => {
              return (
                <React.Fragment key={`${group.key}-${index}`}>
                  {(renderItem ?? renderItemDefault)({
                    item,
                    ...getOptionProps({ index: getIndex(), item }),
                  })}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {isLoading && <ListLoader size={size} />}
    </div>
  );
};

export const List = forwardRef(ListRender) as ListComponent;
