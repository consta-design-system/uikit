import { Example } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Button } from '../../../Button';

export const ButtonExample = () => {
  const [flag, setFlag] = useFlag();

  return (
    <Example>
      <Button label={flag ? 'ssss' : 'asdasdasd'} onClick={setFlag.toggle} />
    </Example>
  );
};
