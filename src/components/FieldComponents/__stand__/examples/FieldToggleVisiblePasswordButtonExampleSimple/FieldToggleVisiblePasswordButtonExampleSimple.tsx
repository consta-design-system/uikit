import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldControlLayout,
  FieldToggleVisiblePasswordButton,
} from '##/components/FieldComponents';
import { useFlag } from '##/hooks/useFlag';

export const FieldToggleVisiblePasswordButtonExampleSimple = () => {
  const [passwordVisible, setPasswordVisible] = useFlag();

  return (
    <Example col={1}>
      <FieldControlLayout
        rightSide={
          <FieldToggleVisiblePasswordButton
            active={passwordVisible}
            onClick={setPasswordVisible.toggle}
          />
        }
      />
    </Example>
  );
};
