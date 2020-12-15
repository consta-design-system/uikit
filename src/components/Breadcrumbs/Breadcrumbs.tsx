import './Breadcrumbs.css';

import React, { Fragment, useMemo } from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconArrowRight } from '../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const breadcrumbPropSize = ['m', 'xs', 's', 'l'] as const;
export type BreadcrumbPropSize = typeof breadcrumbPropSize[number];
export const breadcrumbPropSizeDefault: BreadcrumbPropSize = breadcrumbPropSize[0];

export const cnBreadcrumbs = cn('Breadcrumbs');

const sizeMap: Record<BreadcrumbPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export type BreadcrumbsPropGetLabel<ITEM> = (item: ITEM) => string | React.ReactNode;
export type BreadcrumbsPropGetIsActive<ITEM> = (item: ITEM) => boolean | undefined;
export type BreadcrumbsPropGetLink<ITEM> = (item: ITEM) => string;
export type BreadcrumbsPropGetIcon<ITEM> = (item: ITEM) => React.FC<IconProps> | undefined;

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
  props: PropsWithHTMLAttributesAndRef<BreadcrumbsProps<ITEM>, HTMLDivElement>,
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

  // type Pages = typeof pages;
  const iconSize = getSizeByMap(sizeMap, size);

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
        <Fragment key={`${label}:${link}`}>
          {!isFirst && delimiter}
          <a
            className={cnBreadcrumbs('Link', { active: isActive })}
            onClick={(e) => onClick?.(page, e)}
            href={link}
          >
            {Icon && (
              <Icon
                className={cnBreadcrumbs('Icon', {
                  onlyIcon: onlyIconRoot && isFirst,
                  size: iconSize,
                })}
                size={iconSize}
              />
            )}
            {(!isFirst || !onlyIconRoot) && <span className={cnBreadcrumbs('Label')}>{label}</span>}
          </a>
        </Fragment>
      );
    });

  return (
    <div className={cnBreadcrumbs({ size }, [className])} ref={ref} {...restProps}>
      {renderPages(head, true)}
      {maxCount && rest.length > 1 ? (
        <>
          {delimiter}
          <span className={cnBreadcrumbs('More')}>...</span>
        </>
      ) : (
        renderPages(rest)
      )}
      {renderPages(tail)}
    </div>
  );
});
