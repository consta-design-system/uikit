import { IconMail } from '@consta/icons/IconMail';
import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldInput,
  getFieldIconSize,
} from '##/components/FieldComponents';

export const FieldControlLayoutExampleSimple = () => {
  const size = 'm';

  return (
    <Example col={1}>
      <FieldControlLayout
        size={size}
        leftSide={<IconMail size={getFieldIconSize(size)} />}
        rightSide={['@company.ru', <FieldClearButton size={size} />]}
      >
        <FieldInput />
      </FieldControlLayout>
    </Example>
  );
};
