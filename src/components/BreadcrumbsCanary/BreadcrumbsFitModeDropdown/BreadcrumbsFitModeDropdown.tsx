import './BreadcrumbsFitModeDropdown.css';

import React, { forwardRef } from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cn } from '../../../utils/bem';
import { BreadcrumbsMore } from '../BreadcrumbsMore/BreadcrumbsMore';
import { BreadcrumbsFitModeDropdownComponent } from '../types';
import { useElements } from '../useElements';

export const cnBreadcrumbsFitModeDropdown = cn('BreadcrumbsFitModeDropdown');

export const BreadcrumbsFitModeDropdown: BreadcrumbsFitModeDropdownComponent = forwardRef(
  (props, ref) => {
    const {
      items,
      getItemHref,
      getItemLabel,
      getItemIcon,
      getItemOnClick,
      onItemClick,
      size,
      className,
      renderItem,
      ...otherProps
    } = props;

    const {
      firstItem,
      lastItem,
      readyToHideItems,
      hiddenItems,
      itemsRefs,
      wrapperRef,
      moreRef,
      firstItemRef,
      lastItemRef,
      lastWidth,
      compression,
    } = useElements(items);

    const rootRef = useForkRef([ref, wrapperRef]);

    return (
      <ul
        className={cnBreadcrumbsFitModeDropdown({ compression }, [className])}
        ref={rootRef}
        {...otherProps}
        style={{ ['--breadcrumbs-item-last-width' as string]: lastWidth }}
      >
        {renderItem(firstItem, 'first', true, false, firstItemRef)}
        <BreadcrumbsMore
          size={size}
          getItemHref={getItemHref}
          getItemIcon={getItemIcon}
          getItemLabel={getItemLabel}
          getItemOnClick={getItemOnClick}
          onItemClick={onItemClick}
          items={hiddenItems}
          ref={moreRef}
          className={cnBreadcrumbsFitModeDropdown('Item', { removed: hiddenItems.length <= 0 })}
        />
        {readyToHideItems.map((item, index) =>
          renderItem(item, index, false, false, itemsRefs[index], !!hiddenItems[index]),
        )}
        {renderItem(lastItem, 'last', false, true, lastItemRef)}
      </ul>
    );
  },
);
