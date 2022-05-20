import './PortalMenuNavigationItem.css';

import React, { useMemo } from 'react';

import { useFlag } from '../../../../hooks/useFlag/useFlag';
import { IconArrowDown } from '../../../../icons/IconArrowDown/IconArrowDown';
import { cn } from '../../../../utils/bem';
import { Text } from '../../../Text/Text';
import {
  PortalMenuNavigationItemProps,
  PortalMenuPropGetNavigationActive,
  PortalMenuPropGetNavigationSubMenu,
} from '../../types';

const cnPortalMenuNavigationItem = cn('PortalMenuNavigationItem');

const isItemActive = <ITEM,>(
  item: ITEM,
  getItemActive: PortalMenuPropGetNavigationActive<ITEM>,
  getItemSubMenu: PortalMenuPropGetNavigationSubMenu<ITEM>,
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

export const PortalMenuNavigationItem = <ITEM,>(props: PortalMenuNavigationItemProps<ITEM>) => {
  const {
    item,
    deep = 0,
    onClick,
    className,
    getNavigationLabel,
    getNavigationSubMenu,
    getNavigationKey,
    getNavigationActive,
    getNavigationOnClick,
  } = props;

  const [showSubMenu, setShowSubMenu] = useFlag(true);

  const active = useMemo(() => {
    return !!isItemActive(item, getNavigationActive, getNavigationSubMenu);
  }, [item]);

  const Component = getNavigationSubMenu(item) ? 'div' : 'button';

  const toogle: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSubMenu.toogle();
  };

  const handleClick: React.MouseEventHandler = (e) => {
    onClick?.(e);
    getNavigationOnClick(item)?.(e);
  };

  const subMenu = useMemo(() => {
    return getNavigationSubMenu(item);
  }, [item, getNavigationSubMenu]);

  return (
    <div className={cnPortalMenuNavigationItem(null, [className])}>
      <Component
        style={{
          ['--menu-navigation-item-deep' as string]: deep,
        }}
        className={cnPortalMenuNavigationItem('Button', { active })}
        {...(Component === 'button' && { type: 'button' })}
        onClick={handleClick}
      >
        <Text size="m" lineHeight="m" view={active ? 'brand' : 'primary'}>
          {getNavigationLabel(item)}
        </Text>
        {subMenu && (
          <button
            className={cnPortalMenuNavigationItem('MoreButton', { open: showSubMenu })}
            type="button"
            onClick={toogle}
          >
            <IconArrowDown size="s" view="primary" />
          </button>
        )}
      </Component>
      {showSubMenu && (
        <div className={cnPortalMenuNavigationItem('List')}>
          {subMenu?.map((element) => (
            <PortalMenuNavigationItem
              item={element}
              onClick={onClick}
              deep={deep + 1}
              getNavigationActive={getNavigationActive}
              getNavigationKey={getNavigationKey}
              getNavigationLabel={getNavigationLabel}
              getNavigationSubMenu={getNavigationSubMenu}
              getNavigationOnClick={getNavigationOnClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
