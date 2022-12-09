import { Example } from '@consta/stand';
import React from 'react';

import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleMode = () => {
  return (
    <Example col={1}>
      <ProgressLine />
    </Example>
  );
};

export const ProgressLineExampleModeValue = () => {
  return (
    <Example col={1}>
      <ProgressLine value={30} />
    </Example>
  );
};

export const ProgressLineExampleModeSteps = () => {
  return (
    <Example col={1}>
      <ProgressLine
        value={3}
        steps={['Первый', 'Второй', 'Третий']}
        getItemLabel={(item) => item}
      />
    </Example>
  );
};
