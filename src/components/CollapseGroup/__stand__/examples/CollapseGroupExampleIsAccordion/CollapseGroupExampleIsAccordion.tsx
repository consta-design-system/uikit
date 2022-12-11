import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleIsAccordion = () => {
  return (
    <Example>
      <CollapseGroup items={items} isAccordion />
    </Example>
  );
};
