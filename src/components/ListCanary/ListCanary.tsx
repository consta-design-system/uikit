import './List.css';

import React, { forwardRef, useMemo } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { cn } from '##/utils/bem';
import { getGroups } from '##/utils/getGroups';

import { withDefaultGetters } from './helper';
import { ListGroupLabel } from './ListGroupLabel/ListGroupLabel';
import { ListItem } from './ListItem/ListItem';
import { ListLoader } from './ListLoader/ListLoader';
import {
  DefaultListItem,
  defaultListPropForm,
  defaultListPropSize,
  ListComponent,
  ListPropRenderItem,
  ListProps,
} from './types';

export const cnList = cn('List');

const ListRender = (props: ListProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    items,
    isLoading,
    className,
    onItemClick,
    groups: groupsProp,
    disabled,
    getItemLabel,
    getItemLeftIcon,
    getItemLeftSide,
    getItemRightIcon,
    getItemRightSide,
    getItemKey,
    getItemAs,
    getItemAttributes,
    getItemGroupKey,
    getItemDisabled,
    getItemActive,
    getItemOnClick,
    getGroupKey,
    getGroupLabel,
    getGroupRightSide,
    renderItem,
    form = defaultListPropForm,
    onBlur,
    onFocus,
    size = defaultListPropSize,
    ...otherProps
  } = withDefaultGetters(props);

  const groups = useMemo(
    () => getGroups(items, getItemGroupKey, groupsProp, getGroupKey, undefined),
    [groupsProp, items],
  );

  type ITEM = typeof items[number];

  const refs = useRefs<HTMLDivElement>(items.length);

  const renderItemDefault: ListPropRenderItem<ITEM> = (item) => {
    const params: Omit<DefaultListItem, 'id'> = {
      label: getItemLabel(item),
      disabled: getItemDisabled(item) || disabled,
      leftSide: getItemLeftSide(item),
      leftIcon: getItemLeftIcon(item),
      rightSide: getItemRightSide(item),
      rightIcon: getItemRightIcon(item),
      active: getItemActive(item),
      as: getItemAs(item) ?? 'div',
    };

    const onClick = getItemOnClick(item);

    const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
      onClick?.(e);
      onItemClick?.({ e, item });
    };

    return (
      <ListItem
        {...params}
        size={size}
        onClick={onClick || onItemClick ? handleClick : undefined}
        indent={form === 'round' ? 'increased' : 'normal'}
        {...(getItemAttributes(item) ?? {})}
        ref={refs[items.indexOf(item)]}
      />
    );
  };

  return (
    <div className={cnList({ size }, [className])} ref={ref} {...otherProps}>
      {groups.map((group) => {
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
                  {(renderItem ?? renderItemDefault)(item)}
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
