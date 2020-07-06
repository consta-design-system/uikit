import './Timer.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { ProgressSpin } from '../ProgressSpin/ProgressSpin';

export type TimerPropsSize = 'm' | 's';

type Props = {
  size?: TimerPropsSize;
  seconds?: number;
  progress?: number;
  animation?: boolean;
  children?: never;
};

export type TimerProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnTimer = cn('Timer');

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>((props, ref) => {
  const { seconds = 0, progress = 0, size = 'm', className, animation, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnTimer({ size }, [className])} ref={ref}>
      <ProgressSpin
        className={cnTimer('Progress')}
        size={size}
        progress={progress}
        animation={animation}
      />
      {size === 'm' && <div className={cnTimer('Counter')}>{seconds}</div>}
    </div>
  );
});
