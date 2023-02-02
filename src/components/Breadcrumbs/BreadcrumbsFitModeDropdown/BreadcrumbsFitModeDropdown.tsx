import './BreadcrumbsFitModeDropdown.css';

import React, { forwardRef } from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cn } from '../../../utils/bem';
import { BreadcrumbsMore } from '../BreadcrumbsMore/BreadcrumbsMore';
import { BreadcrumbsFitModeDropdownComponent } from '../types';
import { useElements } from '../useElements';

export const cnBreadcrumbsFitModeDropdown = cn('BreadcrumbsFitModeDropdown');

export const BreadcrumbsFitModeDropdown: BreadcrumbsFitModeDropdownComponent =
  forwardRef((props, ref) => {
    const {
      items,
      getItemHref,
      getItemLabel,
      getItemIcon,
      getItemOnClick,
      getItemSubMenu,
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
      visibleMap,
      elementsRefs,
      parentRef,
      hiddenItems,
      firstItemRef,
      lastItemRef,
      lastWidth,
      compression,
    } = useElements(items);

    const rootRef = useForkRef([ref, parentRef]);

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
          key={cnBreadcrumbsFitModeDropdown('More')}
          getItemHref={getItemHref}
          getItemIcon={getItemIcon}
          getItemLabel={getItemLabel}
          getItemOnClick={getItemOnClick}
          onItemClick={onItemClick}
          getItemSubMenu={getItemSubMenu}
          items={hiddenItems}
          ref={elementsRefs[0]}
          className={cnBreadcrumbsFitModeDropdown('Item', {
            removed: hiddenItems.length <= 0,
          })}
        />
        {readyToHideItems.map((item, index) =>
          renderItem(
            item,
            index,
            false,
            false,
            elementsRefs[index + 1],
            !visibleMap[index + 1],
          ),
        )}
        {renderItem(lastItem, 'last', false, true, lastItemRef)}
      </ul>
    );
  });
