import './PortalMenu.css';

import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { getGroups } from '../../utils/getGroups';
import { Text } from '../Text/Text';

import { PortalMenuItem } from './PortalMenuItem/PortalMenuItem';
import { withDefaultGetters } from './helper';
import { DefaultMenuGroup, DefaultMenuItem, PortalMenuComponent, PortalMenuProps } from './types';

const cnPortalMenu = cn('PortalMenu');

const renderHeader = (groupLabel: string | undefined, first: boolean): React.ReactNode | null => {
  if (!groupLabel) {
    if (first) {
      return null;
    }
    return <div className={cnPortalMenu('Divider')} />;
  }
  return (
    <Text
      className={cnPortalMenu('Header', { first })}
      size="xs"
      lineHeight="m"
      view="ghost"
      transform="uppercase"
    >
      {groupLabel}
    </Text>
  );
};

function PortalMenuRender<ITEM = DefaultMenuItem, GROUP = DefaultMenuGroup>(
  props: PortalMenuProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    additionalControls,
    sortGroup,

    // groups
    groups: groupsProp,
    getGroupKey,
    getGroupLabel,

    // packages

    items,
    onItemClick,
    getItemActive,
    getItemDescription,
    getItemLabel,
    getItemOnClick,
    getItemGroupId,
    getItemBadge,
    getItemSubMenu,
    getItemKey,
    ...otherProps
  } = withDefaultGetters(props);

  const groups = getGroups<ITEM, GROUP>(
    items,
    getItemGroupId,
    groupsProp,
    getGroupKey,
    sortGroup && ((a, b) => sortGroup(a.key, b.key)),
  );

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cnPortalMenu(null, [className])}
      ref={useForkRef([containerRef, ref])}
      {...otherProps}
    >
      {additionalControls}
      <div className={cnPortalMenu('List', [className])}>
        {groups.map((group, groupIndex) => (
          <div className={cnPortalMenu('Group')} key={group.key}>
            {renderHeader(group.group && getGroupLabel(group.group), groupIndex === 0)}
            {group.items.map((item, itemIndex) => (
              <PortalMenuItem
                key={cnPortalMenu('Item', { groupIndex, itemIndex })}
                item={item}
                onClick={(e) => onItemClick?.({ e, item })}
                getItemActive={getItemActive}
                getItemDescription={getItemDescription}
                getItemLabel={getItemLabel}
                getItemOnClick={getItemOnClick}
                getItemGroupId={getItemGroupId}
                getItemBadge={getItemBadge}
                getItemSubMenu={getItemSubMenu}
                getItemKey={getItemKey}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const PortalMenu = forwardRef(PortalMenuRender) as PortalMenuComponent;

export * from './types';
