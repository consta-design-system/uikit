import React, { CSSProperties } from 'react';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { cnSkeleton } from '../Skeleton';

type SkeletonBrickProps = PropsWithHTMLAttributes<
  {
    width?: CSSProperties['width'];
    height: CSSProperties['height'];
  },
  HTMLDivElement
>;

export const SkeletonBrick = ({
  className,
  width = '100%',
  height,
  style,
  ...otherProps
}: SkeletonBrickProps) => (
  <div
    className={cnSkeleton(null, [className])}
    style={{ width, height, ...style }}
    {...otherProps}
  />
);
