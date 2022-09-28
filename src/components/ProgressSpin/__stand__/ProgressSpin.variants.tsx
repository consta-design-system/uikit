import { useBoolean, useNumber, useSelect } from '@consta/stand';
import * as React from 'react';

import {
  ProgressSpin,
  progressSpinPropSize,
  progressSpinPropSizeDefault,
} from '../ProgressSpin';

const Variants = () => {
  const value = useNumber('value', 50);

  const size = useSelect(
    'size',
    progressSpinPropSize,
    progressSpinPropSizeDefault,
  );
  const animation = useBoolean('animation', false);

  return (
    <ProgressSpin
      size={size}
      value={value ? Number(value) : undefined}
      animation={animation}
    />
  );
};

export default Variants;
