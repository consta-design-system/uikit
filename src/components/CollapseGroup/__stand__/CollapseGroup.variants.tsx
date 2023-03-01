import './CollapseGroup.variants.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import {
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIcon,
  collapsePropDirectionIconDefault,
  collapsePropHorizontalSpace,
  collapsePropIconPosition,
  collapsePropIconPositionDefault,
  collapsePropIconView,
  collapsePropIconViewDefault,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
} from '##/components/Collapse';
import { cn } from '##/utils/bem';

import { CollapseGroup } from '..';
import { Item, items } from '../__mocks__/mock.data';

const cnCollapseGroupVariants = cn('CollapseGroupVariants');

const Variants = () => {
  const size = useSelect('size', collapsePropSize, collapsePropSizeDefault);
  const hoverEffect = useBoolean('hoverEffect', false);
  const isAccordion = useBoolean('isAccordion', false);
  const view = useSelect('view', collapsePropView, collapsePropViewDefault);
  const iconView = useSelect(
    'iconView',
    collapsePropIconView,
    collapsePropIconViewDefault,
  );
  const divider = useBoolean('divider', false);
  const horizontalSpace = useSelect(
    'horizontalSpace',
    collapsePropHorizontalSpace,
    collapsePropHorizontalSpace[0],
  );
  const directionIcon = useSelect(
    'directionIcon',
    collapsePropDirectionIcon,
    collapsePropDirectionIconDefault,
  );
  const closeDirectionIcon = useSelect(
    'closeDirectionIcon',
    collapsePropDirectionIcon,
    collapsePropCloseDirectionIconDefault,
  );
  const iconPosition = useSelect(
    'iconPosition',
    collapsePropIconPosition,
    collapsePropIconPositionDefault,
  );
  const rightSide = useBoolean('rightSide', false);
  const withCustomIcon = useBoolean('withCustomIcon', false);

  const getItemRightSide = (item: Item) => {
    if (rightSide) {
      return <Badge size="s" status={item.status} label={item.status} />;
    }

    return undefined;
  };

  return (
    <div style={{ maxWidth: 300 }} className={cnCollapseGroupVariants()}>
      <div className={cnCollapseGroupVariants('Component')}>
        <CollapseGroup
          items={items}
          isAccordion={isAccordion}
          size={size}
          hoverEffect={hoverEffect}
          view={view}
          divider={divider}
          horizontalSpace={horizontalSpace}
          iconView={iconView}
          {...(iconPosition === 'left'
            ? {
                iconPosition,
                getItemRightSide,
              }
            : { iconPosition })}
          {...(withCustomIcon
            ? {
                icon: IconAdd,
                closeIcon: IconRemove,
              }
            : {
                directionIcon,
                closeDirectionIcon,
              })}
        />
      </div>
    </div>
  );
};

export default Variants;
