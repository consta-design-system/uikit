import './BreadcrumbsMore.css';

import { IconMeatball } from '@consta/icons/IconMeatball';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Button } from '../../Button/Button';
import { ContextMenu } from '../../ContextMenu/ContextMenu';
import { BreadcrumbsItem } from '../BreadcrumbsItem/BreadcrumbsItem';
import { iconSizeMap } from '../helpers';
import {
  BreadcrumbsMoreComponent,
  BreadcrumbsMoreProps,
  BreadcrumbsPropGetItemHref,
  BreadcrumbsPropGetItemIcon,
} from '../types';

const cnBreadcrumbsMore = cn('BreadcrumbsMore');

export function getLeftSideBar<ITEM>(
  iconSize: 'xs' | 'm',
  getItemIcon?: BreadcrumbsPropGetItemIcon<ITEM>,
) {
  return function (item: ITEM) {
    const Icon = getItemIcon?.(item);
    if (Icon) {
      return <Icon size={iconSize} />;
    }
    return undefined;
  };
}

export function getItemAs<ITEM>(
  getItemHref?: BreadcrumbsPropGetItemHref<ITEM>,
) {
  return (item: ITEM) => {
    const href = getItemHref?.(item);
    return href ? 'a' : 'span';
  };
}

export function getItemAttributes<ITEM>(
  getItemHref?: BreadcrumbsPropGetItemHref<ITEM>,
) {
  return (item: ITEM) => {
    return getItemHref && { href: getItemHref(item) };
  };
}

export const contextMenuSizeMap = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
} as const;

function BreadcrumbsMoreRender<ITEM>(
  props: BreadcrumbsMoreProps<ITEM>,
  ref: React.Ref<HTMLLIElement>,
) {
  const {
    size,
    items,
    className,
    style,
    getItemHref,
    getItemIcon,
    getItemLabel,
    getItemOnClick: getItemOnClickProp,
    getItemSubMenu,
    onItemClick: onItemClickProp,
    ...otherProps
  } = props;

  const [open, setOpen] = useFlag();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const iconSize = getByMap(iconSizeMap, size);

  useEffect(setOpen.off, [items]);

  const onItemClick = ({
    e,
    item,
  }: {
    e: React.MouseEvent<HTMLDivElement>;
    item: ITEM;
  }) => {
    onItemClickProp?.({ e, item });
    getItemOnClickProp?.(item)?.(e);
  };

  const getItemOnClick =
    (element: ITEM) =>
    ({ e }: { e: React.MouseEvent<HTMLDivElement> }) => {
      return getItemOnClickProp?.(element)?.(e);
    };

  return (
    <BreadcrumbsItem
      {...otherProps}
      className={cnBreadcrumbsMore(null, [className])}
      delimiter
      size={size}
      ref={ref}
      style={{
        ...style,
        ['--breadcrumbs-more-font-size' as string]: `var(--size-text-${size})`,
      }}
    >
      <Button
        className={cnBreadcrumbsMore('Button')}
        view="clear"
        type="button"
        onlyIcon
        iconLeft={IconMeatball}
        size={iconSize}
        ref={buttonRef}
        onClick={setOpen.toggle}
      />
      <ContextMenu
        items={items}
        isOpen={open}
        getItemLabel={getItemLabel}
        getItemSubMenu={getItemSubMenu}
        getItemOnClick={getItemOnClick}
        onItemClick={onItemClick}
        getItemLeftIcon={getItemIcon}
        anchorRef={buttonRef}
        onClickOutside={setOpen.off}
        getItemAs={getItemAs(getItemHref)}
        getItemAttributes={getItemAttributes(getItemHref)}
        direction="downCenter"
        possibleDirections={[
          'downCenter',
          'upCenter',
          'downStartLeft',
          'upStartLeft',
          'downStartRight',
          'upStartRight',
        ]}
        offset="xs"
        size={contextMenuSizeMap[size]}
      />
    </BreadcrumbsItem>
  );
}

export const BreadcrumbsMore = forwardRef(
  BreadcrumbsMoreRender,
) as BreadcrumbsMoreComponent;
