import './BreadcrumbsMore.css';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Button } from '../../Button/Button';
import { ContextMenu } from '../../ContextMenu/ContextMenu';
import { Direction } from '../../Popover/Popover';
import { BreadcrumbsItem } from '../BreadcrumbsItem/BreadcrumbsItem';
import { iconSizeMap } from '../helpers';
import {
  BreadcrumbsMoreComponent,
  BreadcrumbsMoreProps,
  BreadcrumbsPropGetItemHref,
  BreadcrumbsPropGetItemIcon,
} from '../types';

const cnBreadcrumbsMore = cn('BreadcrumbsMore');

function getLeftSideBar<ITEM>(
  getItemIcon: BreadcrumbsPropGetItemIcon<ITEM>,
  iconSize: 'xs' | 'm',
) {
  return function (item: ITEM) {
    const Icon = getItemIcon(item);
    if (Icon) {
      return <Icon size={iconSize} />;
    }
    return undefined;
  };
}

function getItemAs<ITEM>(getItemHref: BreadcrumbsPropGetItemHref<ITEM>) {
  return (item: ITEM) => {
    const href = getItemHref(item);
    return href ? 'a' : 'span';
  };
}

function getItemHTMLAttributes<ITEM>(
  getItemHref: BreadcrumbsPropGetItemHref<ITEM>,
) {
  return (item: ITEM) => {
    return { href: getItemHref(item) };
  };
}

export const contextMenuSizeMap = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
} as const;

const BreadcrumbsMoreRender: <ITEM>(
  props: BreadcrumbsMoreProps<ITEM>,
  ref: React.Ref<HTMLLIElement>,
) => React.ReactElement | null = (props, ref) => {
  const {
    size,
    items,
    className,
    style,
    getItemHref,
    getItemIcon,
    getItemLabel,
    getItemOnClick,
    onItemClick,
    ...otherProps
  } = props;

  const [open, setOpen] = useFlag();
  const [direction, setDirection] = useState<Direction>();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const iconSize = getByMap(iconSizeMap, size);

  useEffect(setOpen.off, [items]);

  if (!items.length) {
    return null;
  }

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
        label="..."
        size={iconSize}
        ref={buttonRef}
        onClick={setOpen.toogle}
      />
      <Transition
        in={open}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={menuRef}
      >
        {(animate) => (
          <ContextMenu
            className={cnMixPopoverAnimate({ animate, direction })}
            ref={menuRef}
            items={items}
            getLabel={getItemLabel}
            getItemOnClick={getItemOnClick}
            onItemClick={onItemClick}
            getLeftSideBar={getLeftSideBar(getItemIcon, iconSize)}
            anchorRef={buttonRef}
            onClickOutside={setOpen.off}
            getItemAs={getItemAs(getItemHref)}
            getItemHTMLAttributes={getItemHTMLAttributes(getItemHref)}
            direction="downCenter"
            possibleDirections={[
              'downCenter',
              'upCenter',
              'downStartLeft',
              'upStartLeft',
              'downStartRight',
              'upStartRight',
            ]}
            onSetDirection={setDirection}
            offset={8}
            size={contextMenuSizeMap[size]}
          />
        )}
      </Transition>
    </BreadcrumbsItem>
  );
};

export const BreadcrumbsMore = forwardRef(
  BreadcrumbsMoreRender,
) as BreadcrumbsMoreComponent;
