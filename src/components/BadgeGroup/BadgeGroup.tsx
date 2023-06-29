import './BadgeGroup.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

import {
  Badge,
  badgePropFormDefault,
  badgePropSizeDefault,
} from '../Badge/Badge';
import { withDefaultGetters } from './helper';
import { BadgeGroupComponent, BadgeGroupProps } from './types';

const cnBadgeGroup = cn('BadgeGroup');

const BadgeGroupRender = (
  props: BadgeGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items,
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
    ...otherProps
  } = withDefaultGetters(props);

  return (
    <div
      ref={ref}
      className={cnBadgeGroup({ size }, [className])}
      {...otherProps}
    >
      {items.map((item) => {
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
            ref={getItemRef(item)}
            view={getItemView(item)}
            status={getItemStatus(item)}
            {...(getItemAttributes(item) ?? {})}
          />
        );
      })}
    </div>
  );
};

export const BadgeGroup = forwardRef(BadgeGroupRender) as BadgeGroupComponent;

export * from './types';
