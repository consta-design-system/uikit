import './PortalMenuItem.css';

import React, { useMemo } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconArrowDown } from '../../../icons/IconArrowDown/IconArrowDown';
import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import {
  PortalMenuItemProps,
  PortalMenuPropGetItemActive,
  PortalMenuPropGetItemSubMenu,
} from '../types';

const cnPortalMenuItem = cn('PortalMenuItem');

const isItemActive = <ITEM,>(
  item: ITEM,
  getItemActive: PortalMenuPropGetItemActive<ITEM>,
  getItemSubMenu: PortalMenuPropGetItemSubMenu<ITEM>,
): boolean | undefined => {
  if (getItemActive(item)) {
    return true;
  }
  const items = getItemSubMenu(item);
  if (items && items.length > 0) {
    let flag = false;
    items.forEach((el) => {
      if (isItemActive(el, getItemActive, getItemSubMenu)) {
        flag = true;
      }
    });
    return flag;
  }
  return undefined;
};

export const PortalMenuItem = <ITEM,>(props: PortalMenuItemProps<ITEM>) => {
  const {
    item,
    onClick,
    className,
    deep = 0,
    getItemActive,
    getItemLabel,
    getItemDescription,
    getItemBadge,
    getItemSubMenu,
    getItemOnClick,
    getItemGroupId,
    getItemKey,
  } = props;

  const handleClick: React.MouseEventHandler = (e) => {
    if ((subMenu && getItemOnClick(item)) || !subMenu) {
      onClick?.(e);
      getItemOnClick(item)?.(e);
    } else {
      setShowSubMenu.toogle();
    }
  };

  const [showSubMenu, setShowSubMenu] = useFlag(true);

  const active = useMemo(() => {
    return !!isItemActive(item, getItemActive, getItemSubMenu);
  }, [item]);

  const Component = getItemSubMenu(item) ? 'div' : 'button';

  const subMenu = useMemo(() => {
    return getItemSubMenu(item);
  }, [item, getItemSubMenu]);

  const toogle: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSubMenu.toogle();
  };

  return (
    <div className={cnPortalMenuItem(null, [className])}>
      <Component
        style={{
          ['--menu-item-deep' as string]: deep,
        }}
        className={cnPortalMenuItem('Button', { active })}
        {...(Component === 'button' && { type: 'button' })}
        onClick={handleClick}
      >
        <div className={cnPortalMenuItem('Text')}>
          <Text
            className={cnPortalMenuItem('Label')}
            size="m"
            lineHeight="m"
            view={getItemActive(item) ? 'brand' : 'primary'}
          >
            {getItemLabel(item)}
          </Text>
          {getItemDescription(item) && (
            <Text
              className={cnPortalMenuItem('Description')}
              size="xs"
              lineHeight="m"
              view="secondary"
            >
              {getItemDescription(item)}
            </Text>
          )}
        </div>
        {(getItemBadge(item) || subMenu) && (
          <div className={cnPortalMenuItem('Controls')}>
            {getItemBadge(item)}
            {subMenu && (
              <button
                className={cnPortalMenuItem('MoreButton', { open: showSubMenu })}
                type="button"
                onClick={toogle}
              >
                <IconArrowDown size="s" view="primary" />
              </button>
            )}
          </div>
        )}
      </Component>
      {showSubMenu && (
        <div className={cnPortalMenuItem('List')}>
          {subMenu?.map((element) => (
            <PortalMenuItem
              item={element}
              onClick={onClick}
              deep={deep + 1}
              key={`${cnPortalMenuItem('List-Item')}-${deep}-${getItemKey(item)}`}
              getItemActive={getItemActive}
              getItemKey={getItemKey}
              getItemLabel={getItemLabel}
              getItemSubMenu={getItemSubMenu}
              getItemOnClick={getItemOnClick}
              getItemBadge={getItemBadge}
              getItemDescription={getItemDescription}
              getItemGroupId={getItemGroupId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
