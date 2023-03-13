import './Breadcrumbs.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../Button/Button';

export const breadcrumbPropSize = ['m', 'xs', 's', 'l'] as const;
export type BreadcrumbPropSize = typeof breadcrumbPropSize[number];
export const breadcrumbPropSizeDefault: BreadcrumbPropSize =
  breadcrumbPropSize[0];

export const cnBreadcrumbs = cn('Breadcrumbs');

const sizeMap: Record<BreadcrumbPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 'xs',
  l: 'm',
};

export type BreadcrumbsPropGetLabel<ITEM> = (
  item: ITEM,
) => string | React.ReactNode;
export type BreadcrumbsPropGetIsActive<ITEM> = (item: ITEM) => boolean;
export type BreadcrumbsPropGetLink<ITEM> = (item: ITEM) => string;
export type BreadcrumbsPropGetIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;

export type BreadcrumbsProps<ITEM> = {
  pages: ITEM[];
  getLabel: BreadcrumbsPropGetLabel<ITEM>;
  getIsActive?: BreadcrumbsPropGetIsActive<ITEM>;
  getLink: BreadcrumbsPropGetLink<ITEM>;
  getIcon?: BreadcrumbsPropGetIcon<ITEM>;
  size?: BreadcrumbPropSize;
  maxCount?: number;
  onClick?: (page: ITEM, e: React.MouseEvent) => void;
  onlyIconRoot?: boolean;
  className?: string;
};

type Breadcrumbs = <ITEM>(
  props: PropsWithHTMLAttributesAndRef<
    BreadcrumbsProps<ITEM>,
    HTMLUListElement
  >,
) => React.ReactElement | null;

export const Breadcrumbs: Breadcrumbs = React.forwardRef((props, ref) => {
  const {
    pages,
    getLabel,
    getIsActive,
    getLink,
    getIcon,
    size = breadcrumbPropSizeDefault,
    maxCount = 0,
    onClick,
    onlyIconRoot = false,
    className,
    ...restProps
  } = props;

  const iconSize = getByMap(sizeMap, size);

  const { head, tail, rest } = useMemo(() => {
    const rest = pages.slice();
    const head = rest.splice(0, 1);
    const tail = rest.splice(2 - maxCount);

    return {
      head,
      tail,
      rest,
    };
  }, [pages, maxCount]);

  const delimiter = useMemo(
    () => (
      <IconArrowRight
        size={iconSize}
        className={cnBreadcrumbs('Delimiter', {
          size: iconSize,
        })}
      />
    ),
    [iconSize],
  );

  const renderPages = (pages: any, isFirst = false) =>
    pages.map((page: any) => {
      const Icon = getIcon?.(page);
      const label = getLabel(page);
      const link = getLink(page);
      const isActive = getIsActive?.(page);

      return (
        <li key={`${label}:${link}`} className={cnBreadcrumbs('Item')}>
          {!isFirst && delimiter}
          <a
            className={cnBreadcrumbs('Link', { active: isActive })}
            onClick={(e) => onClick?.(page, e)}
            href={link}
          >
            {Icon &&
              (onlyIconRoot && isFirst ? (
                <Button
                  type="button"
                  view="clear"
                  onlyIcon
                  iconLeft={Icon}
                  size={iconSize}
                />
              ) : (
                <Icon className={cnBreadcrumbs('Icon')} size={iconSize} />
              ))}
            {(!isFirst || !onlyIconRoot) && (
              <span className={cnBreadcrumbs('Label')}>{label}</span>
            )}
          </a>
        </li>
      );
    });

  return (
    <ul
      className={cnBreadcrumbs({ size }, [className])}
      ref={ref}
      {...restProps}
    >
      {renderPages(head, true)}
      {maxCount && rest.length > 1 ? (
        <li className={cnBreadcrumbs('Item')}>
          {delimiter}
          <span className={cnBreadcrumbs('More')}>...</span>
        </li>
      ) : (
        renderPages(rest)
      )}
      {renderPages(tail)}
    </ul>
  );
});
