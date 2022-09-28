import './ResponsesImage.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type ResponsesImageProps = PropsWithHTMLAttributes<{}, HTMLDivElement>;

export const cnResponsesImage = cn('ResponsesImage');

export const ResponsesImage = React.forwardRef<
  HTMLDivElement,
  ResponsesImageProps
>((props, ref) => {
  const { children, className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={cnResponsesImage(null, [className])}
      ref={ref}
    >
      {children}
    </div>
  );
});
