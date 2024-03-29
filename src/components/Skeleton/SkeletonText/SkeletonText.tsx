import './SkeletonText.css';

import React from 'react';

import {
  TextPropLineHeight,
  textPropLineHeightDefault,
  TextPropSize,
  textPropSizeDefault,
} from '##/components/Text';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { SkeletonBrick } from '../Skeleton';

type SkeletonTextProps = PropsWithHTMLAttributes<
  {
    rows: number;
    fontSize?: TextPropSize;
    lineHeight?: TextPropLineHeight;
  },
  HTMLDivElement
>;

const cnSkeletonText = cn('SkeletonText');

export const getRowWidth = (
  idx: number,
  total: number,
): React.ComponentProps<typeof SkeletonBrick>['height'] => {
  if (idx === total - 1) {
    return '50%';
  }

  switch (idx % 3) {
    case 0:
      return '100%';
    case 1:
      return '85%';
    case 2:
      return '93%';
  }

  return '100%';
};

export const SkeletonText: React.FC<SkeletonTextProps> = (
  props: SkeletonTextProps,
) => {
  const {
    className,
    rows,
    fontSize = textPropSizeDefault,
    lineHeight = textPropLineHeightDefault,
    ...otherProps
  } = props;

  const varFontSize = `var(--size-text-${fontSize})`;
  const varLineHeight = `var(--line-height-text-${lineHeight})`;

  return (
    <div
      className={cnSkeletonText(null, [className])}
      key={
        /* форсируем полный ререндер компонента при смене количества строк,
          чтобы анимация у всех строк запустилась заново */
        rows
      }
      {...otherProps}
    >
      {new Array(rows).fill(null).map((_v, idx) => (
        <div
          key={idx}
          className={cnSkeletonText('Row')}
          style={{ fontSize: varFontSize, height: varLineHeight }}
        >
          <SkeletonBrick width={getRowWidth(idx, rows)} height={varFontSize} />
        </div>
      ))}
    </div>
  );
};
