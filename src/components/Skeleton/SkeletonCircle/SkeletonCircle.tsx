import './SkeletonCircle.css';

import React, { CSSProperties } from 'react';

import { cn } from '../../../utils/bem';
import { cnSkeleton } from '../Skeleton';

type SkeletonCircleProps = {
  className?: string;
  size: CSSProperties['width'] & CSSProperties['height'];
};

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ className, size }) => (
  <div
    className={cnSkeletonCircle('', [cnSkeleton(), className])}
    style={{ width: size, height: size }}
  />
);

const cnSkeletonCircle = cn(SkeletonCircle.name);
