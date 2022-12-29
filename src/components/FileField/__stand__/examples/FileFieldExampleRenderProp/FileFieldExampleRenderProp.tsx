import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { FileField } from '../../../FileField';

export function FileFieldExampleRenderProp() {
  return (
    <Example>
      <FileField id="FileFieldExampleRenderProp">
        {(props) => <Button {...props} label="Выбрать файлы" />}
      </FileField>
    </Example>
  );
}
