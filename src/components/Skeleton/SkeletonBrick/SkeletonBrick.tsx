import React, { CSSProperties } from 'react';

import { cnSkeleton } from '../Skeleton';

type SkeletonBrickProps = {
  className?: string;
  width?: CSSProperties['width'];
  height: CSSProperties['height'];
};

export const SkeletonBrick: React.FC<SkeletonBrickProps> = ({
  className,
  width = '100%',
  height,
}) => (
  <div className={cnSkeleton(null, [className])} style={{ width, height }} />
);
