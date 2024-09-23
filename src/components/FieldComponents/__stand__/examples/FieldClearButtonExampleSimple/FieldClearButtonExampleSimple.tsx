import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
} from '##/components/FieldComponents';

export const FieldClearButtonExampleSimple = () => {
  return (
    <Example col={1}>
      <FieldControlLayout size="m" rightSide={<FieldClearButton />} />
    </Example>
  );
};
