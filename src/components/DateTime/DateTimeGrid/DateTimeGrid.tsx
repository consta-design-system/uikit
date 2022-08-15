import './DateTimeGrid.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Text } from '../../Text/Text';
import {
  DateTimeCell,
  DateTimeCellPropRange,
} from '../DateTimeCell/DateTimeCell';
import { DateTimeItem, DateTimeItemProps } from '../DateTimeItem/DateTimeItem';

type Item =
  | string
  | Omit<
      DateTimeItemProps & {
        range?: DateTimeCellPropRange;
      },
      'ref'
    >;

export type DateTimeGridProps = PropsWithJsxAttributes<
  {
    children?: never;
    items: Item[];
    itemsRefs?: React.RefObject<HTMLDivElement>[];
  },
  'div'
>;

export const cnDateTimeGrid = cn('DateTimeGrid');

const renderItem = (
  item: Item,
  index: number,
  ref?: React.RefObject<HTMLDivElement>,
) => {
  if (typeof item === 'string') {
    return (
      <DateTimeCell ref={ref} key={cnDateTimeGrid('String', { index, item })}>
        <Text as="span" view="ghost" size="2xs" transform="uppercase">
          {item}
        </Text>
      </DateTimeCell>
    );
  }

  const { range, ...dayProps } = item;

  return (
    <DateTimeCell
      ref={ref}
      key={cnDateTimeGrid('Item', { index, number: dayProps.label })}
      range={range}
    >
      <DateTimeItem {...dayProps} />
    </DateTimeCell>
  );
};

export const DateTimeGrid: React.FC<DateTimeGridProps> = (props) => {
  const { className, items, itemsRefs, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnDateTimeGrid(null, [className])}>
      {items.map((item, index) => renderItem(item, index, itemsRefs?.[index]))}
    </div>
  );
};
