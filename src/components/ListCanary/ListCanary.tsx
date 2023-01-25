import React, { useMemo } from 'react';

import { MixSpaceProps } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { getGroups } from '##/utils/getGroups';

import { withDefaultGetters } from './helper';
import { ListDivider } from './ListDivider';
import { ListGroupLabel } from './ListGroupLabel';
import { ListItem } from './ListItem';
import {
  defaultListPropInnerOffset,
  defaultListPropSize,
  ListComponent,
  ListPropRenderItem,
  ListPropSize,
} from './types';

export const cnList = cn('List');

const renderHeader = (
  label: string | undefined,
  first: boolean,
  size: ListPropSize,
  rightSide: React.ReactNode,
  labelSpace: MixSpaceProps | undefined,
  dividerSpase: MixSpaceProps | undefined,
  className: string | undefined,
): React.ReactNode | null => {
  if (label) {
    return (
      <ListGroupLabel
        size={size}
        label={label}
        rightSide={rightSide}
        space={labelSpace}
        className={className}
      />
    );
  }

  if (!label && !first) {
    return (
      <ListDivider size={size} space={dividerSpase} className={className} />
    );
  }

  return null;
};

export const List: ListComponent = (props) => {
  const {
    items,
    onItemClick,
    groups: groupsProp,
    disabled: disabledProp,
    itemSpase,
    groupLabelSpase,
    dividerSpase,
    getItemLabel,
    getItemLeftIcon,
    getItemLeftSide,
    getItemRightIcon,
    getItemRightSide,
    getItemAs,
    getItemAttributes,
    getItemGroupKey,
    getItemDisabled,
    getItemActive,
    getItemChecked,
    getItemOnClick,
    getItemRef,
    getItemStatus,
    getItemAdditionalClassName,
    getGroupKey,
    getGroupLabel,
    getGroupRightSide,
    getGroupAdditionalClassName,
    renderItem,
    innerOffset = defaultListPropInnerOffset,
    size = defaultListPropSize,
    sortGroup,
  } = withDefaultGetters(props);

  const groups = useMemo(
    () => getGroups(items, getItemGroupKey, groupsProp, getGroupKey, sortGroup),
    [groupsProp, items],
  );

  type ITEM = typeof items[number];

  const renderItemDefault: ListPropRenderItem<ITEM> = (item) => {
    const onClick = getItemOnClick(item);
    const disabled = getItemDisabled(item) ?? disabledProp;

    const handleClick: React.MouseEventHandler<HTMLElement> | undefined =
      !disabled && (onClick || onItemClick)
        ? (e) => {
            onClick?.(e);
            onItemClick?.(item, { e, item });
          }
        : undefined;

    const params = {
      ...(getItemAttributes?.(item) ?? {}),
      label: getItemLabel(item),
      disabled,
      leftSide: getItemLeftSide(item),
      leftIcon: getItemLeftIcon(item),
      rightSide: getItemRightSide(item),
      rightIcon: getItemRightIcon(item),
      active: getItemActive(item),
      checked: getItemChecked(item),
      status: getItemStatus(item),
      as: getItemAs?.(item),
      size,
      onClick: handleClick,
      innerOffset,
      ref: (getItemRef?.(item) as React.RefObject<HTMLDivElement>) || undefined,
      space: itemSpase,
      className: getItemAdditionalClassName?.(item),
    };

    return <ListItem {...params} />;
  };

  return (
    <>
      {groups.map((group, groupIndex) => {
        return (
          <React.Fragment key={group.key}>
            {renderHeader(
              group.group && getGroupLabel(group.group),
              groupIndex === 0,
              size,
              group.group && getGroupRightSide(group.group),
              groupLabelSpase,
              dividerSpase,
              getGroupAdditionalClassName &&
                group.group &&
                getGroupAdditionalClassName(group.group),
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
    </>
  );
};
