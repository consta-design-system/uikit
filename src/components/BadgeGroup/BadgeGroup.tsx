import './BadgeGroup.css';

import React, { forwardRef } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import { useHideElementsInLine } from '##/hooks/useHideElementsInLine';
import { cn } from '##/utils/bem';

import {
  Badge,
  badgePropFormDefault,
  badgePropSizeDefault,
} from '../Badge/Badge';
import { forkRef, withDefaultGetters } from './helper';
import { BadgeGroupComponent, BadgeGroupProps } from './types';

const cnBadgeGroup = cn('BadgeGroup');

const BadgeGroupRender = (
  props: BadgeGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items,
    fitMode = 'wrap',
    getItemAs,
    getItemAttributes,
    getItemIconLeft,
    getItemIconRight,
    getItemKey,
    getItemLabel,
    getItemStatus,
    getItemRef,
    getItemView,
    minified,
    size = badgePropSizeDefault,
    form = badgePropFormDefault,
    className,
    moreRef: moreRefProp,
    moreAttributes,
    ...otherProps
  } = withDefaultGetters(props);

  const {
    visibleItems,
    itemsRefs,
    wrapperRef,
    hiddenItems,
    moreRef: hideMoreRef,
  } = useHideElementsInLine(items);

  const moreRef = useForkRef([hideMoreRef, moreRefProp]);

  return (
    <div
      ref={useForkRef([ref, wrapperRef])}
      className={cnBadgeGroup({ size, fitMode }, [className])}
      {...otherProps}
    >
      {items.map((item, index) => {
        const as = getItemAs(item);
        return (
          <Badge
            key={getItemKey(item)}
            size={size}
            form={form}
            minified={minified}
            label={getItemLabel(item)}
            iconLeft={getItemIconLeft(item)}
            iconRight={getItemIconRight(item)}
            as={as}
            ref={forkRef([itemsRefs[index], getItemRef(item)])}
            view={getItemView(item)}
            status={getItemStatus(item)}
            className={cnBadgeGroup('Badge', {
              hidden: fitMode === 'reduction' ? !visibleItems[index] : false,
            })}
            {...(getItemAttributes(item) ?? {})}
          />
        );
      })}
      {fitMode === 'reduction' && (
        <Badge
          className={cnBadgeGroup('Badge', {
            hidden: hiddenItems.length <= 0,
            zero: hiddenItems.length <= 0,
          })}
          key="more"
          label={`+${hiddenItems.length}`}
          status="system"
          form={form}
          size={size}
          view="filled"
          ref={moreRef}
          {...moreAttributes}
        />
      )}
    </div>
  );
};

export const BadgeGroup = forwardRef(BadgeGroupRender) as BadgeGroupComponent;

export * from './types';
