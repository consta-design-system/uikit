import './Breadcrumbs.css';

import React, { forwardRef, useMemo } from 'react';

import { IconArrowRight } from '../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { Button } from '../Button/Button';

import { getItemClick, withDefaultGetters } from './helpers';
import { breadcrumbPropSizeDefault, BreadcrumbsComponent, BreadcrumbsProps } from './types';

export const cnBreadcrumbs = cn('Breadcrumbs');

const sizeMap = {
  xs: 'xs',
  s: 'xs',
  m: 'xs',
  l: 'm',
} as const;

const BreadcrumbsRender = (props: BreadcrumbsProps, ref: React.Ref<HTMLUListElement>) => {
  const {
    items,
    getItemHref,
    getItemLabel,
    getItemActive,
    getItemIcon,
    getItemOnClick,
    onItemClick,
    size = breadcrumbPropSizeDefault,
    maxCount = 0,
    onlyIconRoot = false,
    className,
    ...restProps
  } = withDefaultGetters(props);

  type Item = typeof items[number];

  const iconSize = getByMap(sizeMap, size);

  const { head, tail, rest } = useMemo(() => {
    const rest = items.slice();
    const head = rest.splice(0, 1);
    const tail = rest.splice(2 - maxCount);

    return {
      head,
      tail,
      rest,
    };
  }, [items, maxCount]);

  const renderPages = (items: Item[], isFirst = false) =>
    items.map((item, index) => {
      const Icon = getItemIcon(item);
      const label = getItemLabel(item);
      const href = getItemHref(item);
      const active = getItemActive(item);
      const onClick = getItemClick(item, getItemOnClick, onItemClick);

      return (
        <li className={cnBreadcrumbs('Item')} key={cnBreadcrumbs('Item', { index, href })}>
          {!isFirst && <IconArrowRight className={cnBreadcrumbs('Delimiter')} size={iconSize} />}
          <a className={cnBreadcrumbs('Link', { active })} onClick={onClick} href={href}>
            {Icon &&
              (onlyIconRoot && isFirst ? (
                <Button view="clear" onlyIcon iconLeft={Icon} size={iconSize} />
              ) : (
                <Icon className={cnBreadcrumbs('Icon')} size={iconSize} />
              ))}
            {(!isFirst || !onlyIconRoot) && <span className={cnBreadcrumbs('Label')}>{label}</span>}
          </a>
        </li>
      );
    });

  return (
    <ul className={cnBreadcrumbs({ size }, [className])} ref={ref} {...restProps}>
      {renderPages(head, true)}
      {maxCount && rest.length > 1 ? (
        <li className={cnBreadcrumbs('Item')}>
          <IconArrowRight className={cnBreadcrumbs('Delimiter')} size={iconSize} />
          <span className={cnBreadcrumbs('More')}>...</span>
        </li>
      ) : (
        renderPages(rest)
      )}
      {renderPages(tail)}
    </ul>
  );
};

export const Breadcrumbs = forwardRef(BreadcrumbsRender) as BreadcrumbsComponent;

export * from './types';
