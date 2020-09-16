import './Loader.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const loaderPropSize = ['m', 's'] as const;
export type LoaderPropSize = typeof loaderPropSize[number];
export const loaderPropSizeDefault: LoaderPropSize = loaderPropSize[0];

type Props = {
  size?: LoaderPropSize;
  children?: never;
};

export type LoaderProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnLoader = cn('Loader');

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, size = loaderPropSizeDefault, ...otherProps } = props;
  return (
    <div {...otherProps} ref={ref} className={cnLoader({ size }, [className])}>
      <div className={cnLoader('Dot')} />
    </div>
  );
});
