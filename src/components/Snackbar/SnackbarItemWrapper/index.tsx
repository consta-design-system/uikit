import React, { useRef, useEffect, useState } from 'react';
import bem from '../../../utils/bem';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export type CommonProps = {
  transitionState: TransitionState;
};

const b = bem('snackbar');

const SnackbarItemWrapper: React.FC<CommonProps> = ({ transitionState, children }) => {
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transitionState === 'entered') {
      const el = elementRef.current;
      if (el !== null) {
        setHeight(el.scrollHeight);
      }
    }
    if (transitionState === 'exiting') {
      setHeight(0);
    }
  }, [transitionState]);

  return (
    <div ref={elementRef} style={{ height }} className={b('item', { animation: transitionState })}>
      {children}
    </div>
  );
};

export default SnackbarItemWrapper;
