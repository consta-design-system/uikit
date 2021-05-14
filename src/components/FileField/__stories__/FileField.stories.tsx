import React from 'react';
import { action } from '@storybook/addon-actions';

import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { FileField } from '../FileField';

import mdx from './FileField.docs.mdx';

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
  title: 'Компоненты|/Базовые/FileField',
  id: 'components/FileField',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
