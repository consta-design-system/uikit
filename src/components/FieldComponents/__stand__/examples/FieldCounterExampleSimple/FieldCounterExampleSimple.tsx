import './FieldCounterExampleSimple.css';

import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldControlLayout,
  FieldCounter,
} from '##/components/FieldComponents';
import { cn } from '##/utils/bem';

const cnFieldCounterExampleSimple = cn('FieldCounterExampleSimple');

export const FieldCounterExampleSimple = () => {
  return (
    <Example col={1}>
      <FieldControlLayout
        className={cnFieldCounterExampleSimple()}
        rightSide={<FieldCounter />}
      />
    </Example>
  );
};
