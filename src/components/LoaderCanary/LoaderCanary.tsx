import './Loader.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { LoaderProps, loaderPropSizeDefault } from './types';

export const cnLoader = cn('Loader');

const sides = ['left', 'center', 'right'];

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (props, ref) => {
    const { className, size = loaderPropSizeDefault, ...otherProps } = props;
    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnLoader({ size }, [className])}
      >
        {sides.map((side, index) => (
          <div
            key={cnLoader('Dot', { index })}
            className={cnLoader('Dot', { side })}
          />
        ))}
      </div>
    );
  },
);
