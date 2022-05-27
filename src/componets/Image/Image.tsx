import React from 'react';
import './Image.css';

import { cn } from '##/utils/bem';

const cnImage = cn('Image');
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const Image: React.FC<
  PropsWithHTMLAttributes<{ src?: string | (() => React.ReactElement | null) }, HTMLImageElement>
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
