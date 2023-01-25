import './ListGroupLabel.css';

import React, { forwardRef } from 'react';

import { Text, TextPropSize } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
import {
  mapGroupVerticalSpaseBottom,
  mapGroupVerticalSpaseTop,
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
} from '../maps';
import {
  defaultListPropSize,
  ListGroupLabelProps,
  ListPropSize,
} from '../types';

export const cnListGroupLabel = cn('ListGroupLabel');

const mapFontSize: Record<ListPropSize, TextPropSize> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 's',
};

export const ListGroupLabel = forwardRef<HTMLDivElement, ListGroupLabelProps>(
  (props, ref) => {
    const {
      rightSide,
      size = defaultListPropSize,
      label,
      innerOffset,
      className,
      space,
      ...otherProps
    } = props;

    return (
      <Text
        {...otherProps}
        ref={ref}
        className={cnListGroupLabel(null, [
          cnListItemGrid(),
          cnMixSpace(
            space || {
              mH:
                innerOffset === 'increased'
                  ? mapHorisontalSpaseIncreased[size]
                  : mapHorisontalSpase[size],
              pT: mapGroupVerticalSpaseTop[size],
              pB: mapGroupVerticalSpaseBottom[size],
            },
          ),
          className,
        ])}
        size={mapFontSize[size]}
        view="secondary"
        lineHeight="xs"
        spacing="xs"
        transform="uppercase"
      >
        {!rightSide ? (
          label
        ) : (
          <span className={cnListItemGrid('Slot', { position: 'center' })}>
            {label}
          </span>
        )}
        {renderSlot(rightSide, 'right', size, undefined)}
      </Text>
    );
  },
);
