import './Timer.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';
import { ProgressSpin } from '../ProgressSpin/ProgressSpin';

export const timerPropsSize = ['m', 's', 'l', 'xl', '2xl'] as const;
export type TimerPropsSize = typeof timerPropsSize[number];
export const timerPropsSizeDefault: TimerPropsSize = timerPropsSize[0];

export type TimerProps = PropsWithJsxAttributes<{
  size?: TimerPropsSize;
  seconds?: number;
  progress?: number;
  animation?: boolean;
  children?: never;
}>;

export const cnTimer = cn('Timer');

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  (props, ref) => {
    const {
      seconds = 0,
      progress = 0,
      size = timerPropsSizeDefault,
      className,
      animation,
      ...otherProps
    } = props;

    return (
      <div {...otherProps} className={cnTimer({ size }, [className])} ref={ref}>
        <ProgressSpin
          className={cnTimer('Progress')}
          size={size}
          progress={progress}
          animation={animation}
        />
        {size !== 's' && <div className={cnTimer('Counter')}>{seconds}</div>}
      </div>
    );
  },
);
