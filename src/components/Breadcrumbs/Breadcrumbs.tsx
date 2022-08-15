import './Breadcrumbs.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { BreadcrumbsFitModeDropdown } from './BreadcrumbsFitModeDropdown/BreadcrumbsFitModeDropdown';
import { BreadcrumbsFitModeScroll } from './BreadcrumbsFitModeScroll/BreadcrumbsFitModeScroll';
import { BreadcrumbsItem } from './BreadcrumbsItem/BreadcrumbsItem';
import { withDefaultGetters } from './helpers';
import {
  breadcrumbPropFitModeDefault,
  breadcrumbPropSizeDefault,
  BreadcrumbsComponent,
  BreadcrumbsPropOnItemClick,
  BreadcrumbsProps,
  RenderItem,
} from './types';

export const cnBreadcrumbs = cn('Breadcrumbs');

const BreadcrumbsRender = (
  props: BreadcrumbsProps,
  ref: React.Ref<HTMLUListElement>,
) => {
  const {
    items,
    getItemHref,
    getItemLabel,
    getItemIcon,
    getItemOnClick,
    getItemSubMenu,
    onItemClick,
    size = breadcrumbPropSizeDefault,
    onlyIconRoot = false,
    className,
    fitMode = breadcrumbPropFitModeDefault,
    lastItemIsLink,
    ...otherProps
  } = withDefaultGetters(props);

  type Item = typeof items[number];

  const shortList = items.length <= 2;

  const renderItem: RenderItem<Item> = (
    item,
    index,
    isFirst,
    isLast,
    ref,
    hidden,
  ) => {
    if (item === undefined) {
      return;
    }

    const handleClick: BreadcrumbsPropOnItemClick<Item> = ({ e, item }) => {
      getItemOnClick?.(item)?.(e);
      onItemClick?.({ e, item });
    };

    return (
      <BreadcrumbsItem
        className={cnBreadcrumbs('Item', { hidden })}
        item={item}
        getItemHref={getItemHref}
        getItemIcon={getItemIcon}
        getItemLabel={getItemLabel}
        getItemSubMenu={getItemSubMenu}
        onItemClick={handleClick}
        active={lastItemIsLink ? false : isLast}
        delimiter={!isFirst}
        onlyIcon={onlyIconRoot && isFirst}
        key={cnBreadcrumbs('Item', { index })}
        size={size}
        ref={ref}
      />
    );
  };

  if (items.length <= 2) {
    return (
      <ul
        {...otherProps}
        className={cnBreadcrumbs({ shortList }, [className])}
        ref={ref}
      >
        {items.map((item, index) =>
          renderItem(item, index, index === 0, index === items.length - 1),
        )}
      </ul>
    );
  }

  if (fitMode === 'scroll') {
    return (
      <BreadcrumbsFitModeScroll
        {...otherProps}
        className={cnBreadcrumbs(null, [className])}
        items={items}
        renderItem={renderItem}
        ref={ref}
      />
    );
  }

  return (
    <BreadcrumbsFitModeDropdown
      {...otherProps}
      size={size}
      className={cnBreadcrumbs(null, [className])}
      items={items}
      getItemHref={getItemHref}
      getItemIcon={getItemIcon}
      getItemLabel={getItemLabel}
      getItemOnClick={getItemOnClick}
      getItemSubMenu={getItemSubMenu}
      onItemClick={onItemClick}
      ref={ref}
      renderItem={renderItem}
    />
  );
};

export const Breadcrumbs = forwardRef(
  BreadcrumbsRender,
) as BreadcrumbsComponent;

export * from './types';
