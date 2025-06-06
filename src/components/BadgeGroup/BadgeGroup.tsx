import './BadgeGroup.css';

import React, { forwardRef } from 'react';

import {
  Badge,
  badgePropFormDefault,
  badgePropSizeDefault,
} from '##/components/Badge';
import { forkRef, useForkRef } from '##/hooks/useForkRef';
import { useHideElementsInLine } from '##/hooks/useHideElementsInLine';
import { cn } from '##/utils/bem';

import { withDefaultGetters } from './helper';
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

  const length = items.length + 1;
  const moreIndex = length - 1;

  const { visibleMap, elementsRefs, parentRef } = useHideElementsInLine(
    length,
    moreIndex,
    0,
    [fitMode, form],
  );

  const moreRef = useForkRef([elementsRefs[moreIndex], moreRefProp]);

  return (
    <div
      ref={useForkRef([ref, parentRef])}
      className={cnBadgeGroup({ size, fitMode }, [className])}
      {...otherProps}
    >
      {items.map((item, index) => {
        return (
          <Badge
            key={getItemKey(item)}
            size={size}
            form={form}
            minified={minified}
            label={getItemLabel(item)}
            iconLeft={getItemIconLeft(item)}
            iconRight={getItemIconRight(item)}
            as={getItemAs(item)}
            ref={forkRef([elementsRefs[index], getItemRef(item)])}
            view={getItemView(item)}
            status={getItemStatus(item)}
            className={cnBadgeGroup('Badge', {
              hidden: fitMode === 'reduction' ? !visibleMap[index] : false,
            })}
            {...getItemAttributes(item)}
          />
        );
      })}
      {fitMode === 'reduction' && (
        <Badge
          className={cnBadgeGroup('Badge', {
            hidden: !visibleMap[items.length],
          })}
          key="more"
          label={`+${visibleMap.filter((item) => !item).length}`}
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
