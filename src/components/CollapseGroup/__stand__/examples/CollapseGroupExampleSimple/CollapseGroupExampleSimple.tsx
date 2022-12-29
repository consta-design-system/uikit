import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems, simpleItems2 } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleSimple = () => {
  return (
    <Example>
      <CollapseGroup items={simpleItems} />
    </Example>
  );
};

export const CollapseGroupExampleSimple2 = () => {
  return (
    <Example>
      <CollapseGroup items={simpleItems2} />
    </Example>
  );
};
