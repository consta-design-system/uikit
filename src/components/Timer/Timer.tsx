import './Timer.css';

import React from 'react';

import { ProgressSpin } from '../ProgressSpin/ProgressSpin';
import { cn } from '../../utils/bem';

export type TimerPropsSize = 'm' | 's';

export type TimerProps = {
  size?: TimerPropsSize;
  seconds?: number;
  progress?: number;
  animation?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  className?: string;
};

export const cnTimer = cn('Timer');

export type ITimer = TimerProps & (Omit<React.HTMLAttributes<HTMLDivElement>, keyof TimerProps>);

export function Timer(props: ITimer): React.ReactElement {
  const {
    seconds = 0,
    progress = 0,
    size = 'm',
    innerRef,
    className,
    animation,
    ...otherProps
  } = props;

  return (
    <div {...otherProps} className={cnTimer({ size }, [className])} ref={innerRef}>
      <ProgressSpin
        className={cnTimer('Progress')}
        size={size}
        progress={progress}
        animation={animation}
      />
      {size === 'm' && <div className={cnTimer('Counter')}>{seconds}</div>}
    </div>
  );
}
