import './Loader.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { LoaderProps } from './types';

export const cnLoader = cn('Loader');

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (props, ref) => {
    const {
      className,
      size = 'm',
      type = 'dots',
      view = 'primary',
      ...otherProps
    } = props;
    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnLoader({ size, view, type }, [className])}
      >
        {type === 'dots' && <div className={cnLoader('Dot')} />}
      </div>
    );
  },
);
