import React from 'react';
import { cn } from '../../utils/bem';
import './Loader.css';

export type LoaderPropSize = 's' | 'm';

export type LoaderProps = {
  className?: string;
  size?: LoaderPropSize;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type ILoader = LoaderProps & (Omit<React.HTMLAttributes<HTMLDivElement>, keyof LoaderProps>);

export const cnLoader = cn('Loader');

export const Loader: React.FC<ILoader> = ({ className, size = 'm', innerRef, ...otherProps }) => {
  return (
    <div {...otherProps} ref={innerRef} className={cnLoader({ size }, [className])}>
      <div className={cnLoader('Dot')} />
    </div>
  );
};
