import './ProgressStepBar.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const propSize = ['s', 'xs', 'm'] as const;
export type PropSize = typeof propSize[number];
export const propSizeDefault = propSize[0];

export const propDirection = ['horizontal', 'vertical'] as const;
export type PropDirection = typeof propDirection[number];
export const propDirectionDefault = propDirection[0];

export const propLineColor = ['system', 'normal', 'success', 'warning', 'alert'] as const;
export type PropLineColor = typeof propLineColor[number];
export const propLineColorDefault = propLineColor[0];

type Props = {
  lineColor: PropLineColor;
  direction: PropDirection;
  size: PropSize;
};

const cnProgressStepBar = cn('ProgressStepBar');

export const ProgressStepBar = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = propSizeDefault,
    direction = propDirectionDefault,
    lineColor = propLineColorDefault,
    className,
    ...otherProps
  } = props;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cnProgressStepBar({ direction, lineColor, size }, [className])}
      {...otherProps}
    />
  );
});
