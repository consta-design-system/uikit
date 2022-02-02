import './BreadcrumbsMore.css';

import React, { forwardRef, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import {
  animateTimeout,
  cnMixDropdownAnimateForCssTransition,
} from '../../../mixs/MixDropdownAnimate/MixDropdownAnimate';
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

function getLeftSideBar<ITEM>(getItemIcon: BreadcrumbsPropGetItemIcon<ITEM>, iconSize: 'xs' | 'm') {
  return (item: ITEM) => {
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

function getItemHTMLAttributes<ITEM>(getItemHref: BreadcrumbsPropGetItemHref<ITEM>) {
  return (item: ITEM) => {
    return { href: getItemHref(item) };
  };
}

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
    getItemOnClick,
    onItemClick,
    ...otherProps
  } = props;

  const [open, setOpen] = useFlag();

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
      <CSSTransition
        in={open}
        classNames={cnMixDropdownAnimateForCssTransition}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={menuRef}
      >
        <ContextMenu
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
        />
      </CSSTransition>
    </BreadcrumbsItem>
  );
}

export const BreadcrumbsMore = forwardRef(BreadcrumbsMoreRender) as BreadcrumbsMoreComponent;
