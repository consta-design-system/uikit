import './SkeletonCircle.css';

import React, { CSSProperties } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { cnSkeleton } from '../Skeleton';

type SkeletonCircleProps = PropsWithHTMLAttributes<
  {
    size: CSSProperties['width'] & CSSProperties['height'];
  },
  HTMLDivElement
>;

const cnSkeletonCircle = cn('SkeletonCircle');

export const SkeletonCircle = ({
  className,
  size,
  style,
  ...otherProps
}: SkeletonCircleProps) => (
  <div
    className={cnSkeletonCircle(null, [cnSkeleton(), className])}
    style={{ width: size, height: size, ...style }}
    {...otherProps}
  />
);
