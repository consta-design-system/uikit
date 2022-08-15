import './DateTimeTimeColumn.css';

import React, { memo, useRef } from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Text } from '../../Text/Text';
import { DateTimeCell } from '../DateTimeCell/DateTimeCell';
import { DateTimeGrid } from '../DateTimeGrid/DateTimeGrid';
import { useScrollToElement } from './useScrollToElement/useScrollToElement';

type DateTimeTimeColumnPropItem = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  selected?: boolean;
};

type DateTimeTimeColumnProps = PropsWithJsxAttributes<
  {
    children?: never;
    label: string;
    items: DateTimeTimeColumnPropItem[];
  },
  'div'
>;

export const cnDateTimeTimeColumn = cn('DateTimeTimeColumn');

export const DateTimeTimeColumn: React.FC<DateTimeTimeColumnProps> = memo(
  (props) => {
    const { label, items, className, ...otherProps } = props;

    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    const [itemsRefs] = useScrollToElement(items, scrollWrapperRef);

    if (items.length === 0) {
      return null;
    }

    return (
      <div {...otherProps} className={cnDateTimeTimeColumn(null, [className])}>
        <DateTimeCell className={cnDateTimeTimeColumn('Label')}>
          <Text view="ghost" size="2xs">
            {label}
          </Text>
        </DateTimeCell>
        <div
          className={cnDateTimeTimeColumn('ScrollWrapper')}
          ref={scrollWrapperRef}
        >
          <DateTimeGrid
            className={cnDateTimeTimeColumn('List')}
            items={items}
            itemsRefs={itemsRefs}
          />
          <div className={cnDateTimeTimeColumn('FakeElemet')} />
        </div>
      </div>
    );
  },
);
