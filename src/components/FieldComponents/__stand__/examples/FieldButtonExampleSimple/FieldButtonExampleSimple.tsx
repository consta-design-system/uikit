import { IconClear } from '@consta/icons/IconClear';
import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldButton,
  FieldControlLayout,
  getFieldIconSize,
} from '##/components/FieldComponents';

export const FieldButtonExampleSimple = () => {
  const size = 'm';
  return (
    <Example col={1}>
      <FieldControlLayout
        size={size}
        rightSide={
            <IconClear size={getFieldIconSize(size)} />
          </FieldButton>
        }
      />
    </Example>
  );
};
