import './Image.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

const cnImage = cn('Image');

export const Image: React.FC<
  PropsWithHTMLAttributes<
    { src?: string | (() => React.ReactElement | null) | React.FC },
    HTMLImageElement
  >
> = ({ className, src, ...props }) => {
  if (typeof src === 'undefined') {
    return null;
  }

  if (typeof src === 'string') {
    return <img {...props} src={src} className={cnImage(null, [className])} />;
  }

  const Src = src;

  return (
    <div {...props} className={cnImage(null, [className])}>
      <Src />
    </div>
  );
};
