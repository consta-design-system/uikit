import React from 'react';
import { action } from '@storybook/addon-actions';

import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { FileField } from '../FileField';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './FileField.mdx';

export function Playground() {
  return (
    <div>
      <FileField id="FileField" onChange={action('Файлы выбраны')} multiple>
        {(props) => <Button label="Выбрать файлы" {...props} />}
      </FileField>
    </div>
  );
}

export default createMetadata({
  title: 'Components|/FileField',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
