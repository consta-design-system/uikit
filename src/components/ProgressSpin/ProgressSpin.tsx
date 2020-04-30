import './ProgressSpin.css';

import React, { useMemo } from 'react';
import { cn } from '../../utils/bem';

export type ProgressSpinPropSize = 'm' | 's';
export type ProgressSpinProps = {
  size?: ProgressSpinPropSize;
  innerRef?: React.Ref<SVGSVGElement>;
  className?: string;
  progress?: number;
  animation?: boolean;
};
export type IProgressSpin = ProgressSpinProps &
  (Omit<React.HTMLAttributes<SVGElement>, keyof ProgressSpinProps>);

export const cnProgressSpin = cn('ProgressSpin');

function getSizeOfPixel(size: ProgressSpinPropSize): number {
  const sizeObj: Record<ProgressSpinPropSize, number> = {
    s: 12,
    m: 20,
  };
  return sizeObj[size];
}

function getSvgParamsBySize(size: ProgressSpinPropSize): [number, number, number, number] {
  const sizeOfPixels = getSizeOfPixel(size);
  const strokeWidth = 2;
  const radius = (sizeOfPixels - strokeWidth) / 2;
  const strokeDasharray = radius * 2 * Math.PI;

  return [sizeOfPixels, strokeWidth, radius, strokeDasharray];
}

export function ProgressSpin(props: IProgressSpin): React.ReactElement {
  const { size = 'm', progress = 0, animation, innerRef, className, ...otherProps } = props;
  const [sizeOfPixels, strokeWidth, radius, strokeDasharray] = useMemo(
    () => getSvgParamsBySize(size),
    [size]
  );

  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100;

  return (
    <svg
      className={cnProgressSpin(null, [className])}
      width={sizeOfPixels}
      height={sizeOfPixels}
      viewBox={`0 0 ${sizeOfPixels} ${sizeOfPixels}`}
      ref={innerRef}
      {...otherProps}
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
}
