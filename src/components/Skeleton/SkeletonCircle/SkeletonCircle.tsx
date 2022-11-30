import './SkeletonCircle.css';

import React, { CSSProperties } from 'react';

import { cn } from '##/utils/bem';

import { cnSkeleton } from '../Skeleton';

type SkeletonCircleProps = {
  className?: string;
  size: CSSProperties['width'] & CSSProperties['height'];
};

const cnSkeletonCircle = cn('SkeletonCircle');

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  className,
  size,
}) => (
  <div
    className={cnSkeletonCircle(null, [cnSkeleton(), className])}
    style={{ width: size, height: size }}
  />
);
