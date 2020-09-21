import './ProgressSpin.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const progressSpinPropSize = ['m', 's'] as const;
export type ProgressSpinPropSize = typeof progressSpinPropSize[number];
export const progressSpinPropSizeDefault: ProgressSpinPropSize = progressSpinPropSize[0];

type Props = {
  size?: ProgressSpinPropSize;
  className?: string;
  progress?: number;
  animation?: boolean;
  children?: never;
};
export type ProgressSpinProps = PropsWithHTMLAttributes<Props, SVGElement>;

export const cnProgressSpin = cn('ProgressSpin');

const sizeMap: Record<ProgressSpinPropSize, number> = {
  s: 12,
  m: 20,
};

function getSvgParamsBySize(size: ProgressSpinPropSize): [number, number, number, number] {
  const sizeOfPixels = getSizeByMap(sizeMap, size);
  const strokeWidth = 2;
  const radius = (sizeOfPixels - strokeWidth) / 2;
  const strokeDasharray = radius * 2 * Math.PI;

  return [sizeOfPixels, strokeWidth, radius, strokeDasharray];
}

export const ProgressSpin = React.forwardRef<SVGSVGElement, ProgressSpinProps>((props, ref) => {
  const {
    size = progressSpinPropSizeDefault,
    progress = 0,
    animation,
    className,
    ...otherProps
  } = props;
  const [sizeOfPixels, strokeWidth, radius, strokeDasharray] = useMemo(
    () => getSvgParamsBySize(size),
    [size],
  );

  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100;

  return (
    <svg
      {...otherProps}
      className={cnProgressSpin(null, [className])}
      width={sizeOfPixels}
      height={sizeOfPixels}
      viewBox={`0 0 ${sizeOfPixels} ${sizeOfPixels}`}
      ref={ref}
    >
      <circle
        className={cnProgressSpin('Circle', { animation: !!animation })}
        cx={sizeOfPixels / 2}
        cy={sizeOfPixels / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
});
