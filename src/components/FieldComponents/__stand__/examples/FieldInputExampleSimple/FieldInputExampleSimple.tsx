import { Example } from '@consta/stand';
import React from 'react';

import { FieldControlLayout, FieldInput } from '##/components/FieldComponents';

export const FieldInputExampleSimple = () => {
  return (
    <Example col={1}>
      <FieldControlLayout>
        <FieldInput placeholder="Поле ввода" />
      </FieldControlLayout>
    </Example>
  );
};
