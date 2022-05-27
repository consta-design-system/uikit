import './PortalMenu.css';

import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '@consta/uikit/useForkRef';
import { cn } from '../../utils/bem';
import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { Text } from '@consta/uikit/Text';

import { PortalMenuItem } from './PortalMenuItem/PortalMenuItem';
import { withDefaultGetters } from './helper';
import { DefaultMenuGroup, DefaultMenuItem, PortalMenuComponent, PortalMenuProps } from './types';

const cnPortalMenu = cn('PortalMenu');

const renderHeader = (
  groupLabel: string | number | undefined,
  first: boolean,
): React.ReactNode | null => {
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

    groupsByItems,
    ...otherProps
  } = withDefaultGetters(props);

  const groups = getGroups<ITEM, GROUP>(
    items,
    getItemGroupId,
    groupsProp,
    groupsByItems ? undefined : getGroupKey,
    undefined,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cnPortalMenu(null, [className])}
      ref={useForkRef([containerRef, ref])}
      {...otherProps}
    >
      {additionalControls}
      <div className={cnPortalMenu('List')}>
        {groups.map((group, groupIndex) => (
          <div className={cnPortalMenu('Group')} key={cnPortalMenu('Group', { groupIndex })}>
            {renderHeader(
              groupsByItems ? group.key : group.group && getGroupLabel(group.group),
              groupIndex === 0,
            )}
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
