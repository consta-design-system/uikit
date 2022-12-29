import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { FileField } from '../../../FileField';

export function FileFieldExampleWithoutRenderProp() {
  return (
    <Example>
      <FileField id="FileFieldExampleWithoutRenderProp">
        <Text>Нажми меня</Text>
      </FileField>
    </Example>
  );
}

export function FileFieldExampleWithoutRenderPropIcon() {
  return (
    <Example>
      <FileField id="FileFieldExampleWithoutRenderPropIcon">
        <IconAdd view="alert" />
      </FileField>
    </Example>
  );
}
