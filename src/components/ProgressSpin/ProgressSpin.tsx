import './ProgressSpin.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { isNumber } from '../../utils/type-guards';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const progressSpinPropSize = ['m', 's', 'l', 'xl', '2xl'] as const;
export type ProgressSpinPropSize = typeof progressSpinPropSize[number];
export const progressSpinPropSizeDefault: ProgressSpinPropSize =
  progressSpinPropSize[0];

type Props = {
  size?: ProgressSpinPropSize;
  className?: string;
  progress?: number;
  value?: number;
  animation?: boolean;
  children?: never;
};
export type ProgressSpinProps = PropsWithHTMLAttributes<Props, SVGElement>;

export const cnProgressSpin = cn('ProgressSpin');

const sizeMap: Record<ProgressSpinPropSize, number> = {
  's': 12,
  'm': 20,
  'l': 28,
  'xl': 36,
  '2xl': 44,
};

const strokeWidthMap: Record<ProgressSpinPropSize, number> = {
  's': 2,
  'm': 2,
  'l': 2.2,
  'xl': 2.7,
  '2xl': 3.5,
};

function getSvgParamsBySize(
  size: ProgressSpinPropSize,
): [number, number, number, number] {
  const sizeOfPixels = getByMap(sizeMap, size);
  const strokeWidth = getByMap(strokeWidthMap, size);
  const radius = (sizeOfPixels - strokeWidth) / 2;
  const strokeDasharray = radius * 2 * Math.PI;

  return [sizeOfPixels, strokeWidth, radius, strokeDasharray];
}

export const ProgressSpin = React.forwardRef<SVGSVGElement, ProgressSpinProps>(
  (props, ref) => {
    const {
      size = progressSpinPropSizeDefault,
      progress: progressProp,
      value,
      animation,
      className,
      ...otherProps
    } = props;
    const [sizeOfPixels, strokeWidth, radius, strokeDasharray] = useMemo(
      () => getSvgParamsBySize(size),
      [size],
    );

    const progress = value ?? progressProp;

    const animatedProgress = isNumber(progress) ? progress : 50;
    const strokeDashoffset =
      strokeDasharray - (strokeDasharray * animatedProgress) / 100;

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
  },
);
