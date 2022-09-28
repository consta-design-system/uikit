import { useBoolean, useNumber, useSelect } from '@consta/stand';
import React from 'react';

import { Timer, timerPropsSize, timerPropsSizeDefault } from '../Timer';

const Variants = () => {
  const seconds = useNumber('seconds', 5);
  const progress = useNumber('progress', 50);
  const animation = useBoolean('animation', false);
  const size = useSelect('size', timerPropsSize, timerPropsSizeDefault);

  return (
    <Timer
      seconds={seconds}
      progress={Number(progress) || 0}
      animation={animation}
      size={size}
    />
  );
};

export default Variants;
