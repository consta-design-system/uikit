import './ProgressSpin.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { isNumber } from '../../utils/type-guards';
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
    progress,
    animation,
    className,
    ...otherProps
  } = props;
  const [sizeOfPixels, strokeWidth, radius, strokeDasharray] = useMemo(
    () => getSvgParamsBySize(size),
    [size],
  );

  const animatedProgress = isNumber(progress) ? progress : 50;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * animatedProgress) / 100;

  return (
    <svg
      {...otherProps}
      className={cnProgressSpin({ spin: !isNumber(progress) }, [className])}
      width={sizeOfPixels}
      height={sizeOfPixels}
      viewBox={`0 0 ${sizeOfPixels} ${sizeOfPixels}`}
      ref={ref}
    >
      <circle
        className={cnProgressSpin('Circle', { animation })}
        cx={sizeOfPixels / 2}
        cy={sizeOfPixels / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
});
