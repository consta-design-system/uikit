import React, { forwardRef, useMemo } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { getGroups } from '##/utils/getGroups';

import { withDefaultGetters } from './helper';
import { ListDivider } from './ListDivider';
import { ListGroupLabel } from './ListGroupLabel';
import { ListItem } from './ListItem';
import { ListLoader } from './ListLoader';
import {
  DefaultListItem,
  defaultListPropIndent,
  defaultListPropSize,
  ListComponent,
  ListPropRenderItem,
  ListProps,
  ListPropSize,
} from './types';

export const cnList = cn('List');

const mapGroupVerticalSpase: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 'xs',
};

const renderHeader = (
  label: string | undefined,
  first: boolean,
  size: ListPropSize,
  rightSide: React.ReactNode,
): React.ReactNode | null => {
  console.log(label);
  if (label) {
    return <ListGroupLabel size={size} label={label} rightSide={rightSide} />;
  }

  if (!label && !first) {
    return <ListDivider size={size} />;
  }

  return null;
};

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
    indent = defaultListPropIndent,
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
        {...(getItemAttributes(item) ?? {})}
        ref={refs[items.indexOf(item)]}
        size={size}
        onClick={onClick || onItemClick ? handleClick : undefined}
        indent={indent}
      />
    );
  };

  console.log(groups);

  return (
    <div
      {...otherProps}
      className={cnList(null, [
        cnMixSpace({ pV: mapGroupVerticalSpase[size] }),
        className,
      ])}
      ref={ref}
    >
      {groups.map((group, groupIndex) => {
        return (
          <React.Fragment key={group.key}>
            {renderHeader(
              group.group && getGroupLabel(group.group),
              groupIndex === 0,
              size,
              group.group && getGroupRightSide(group.group),
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
