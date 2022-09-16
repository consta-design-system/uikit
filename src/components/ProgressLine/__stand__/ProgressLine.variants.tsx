import { useNumber, useSelect } from '@consta/stand';
import React from 'react';

import { ProgressLine } from '../ProgressLine';
import { defaultProgressLinePropSize, progressLinePropSize } from '../types';

const Variants = () => {
  const mode = useSelect(
    'mode',
    ['determinate', 'indeterminate', 'steps'],
    'determinate',
  );
  const size = useSelect(
    'size',
    progressLinePropSize,
    defaultProgressLinePropSize,
  );
  const steps = useNumber('steps', 6);
  const value = useNumber('progresvalues', 50);

  return (
    <ProgressLine
      size={size}
      value={mode !== 'indeterminate' ? value : undefined}
      steps={
        mode === 'steps'
          ? Array.from({ length: steps }, (_, i) => i + 1)
          : undefined
      }
      getItemLabel={(item) => item?.toString()}
    />
  );
};

export default Variants;
