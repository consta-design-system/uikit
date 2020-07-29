import './FileField.stories.css';

import React, { useState } from 'react';

import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { FileField, FileFieldProps } from '../FileField';

import mdx from './FileField.mdx';

function renderFiles(value: FileFieldProps['value']) {
  if (value) {
    const render = [];
    for (let i = 0; i < value.length; i++) {
      render[i] = <li key={`${value[i].name}-${i}`}>{value[i].name}</li>;
    }
    return <ul>{render}</ul>;
  }
}

export function Playground() {
  const [value, setValue] = useState<FileFieldProps['value']>(null);

  const handleChange: FileFieldProps['onChange'] = ({ value }) => setValue(value);
  const handleDelete = () => setValue(null);

  return (
    <div>
      <FileField onChange={handleChange} value={value} multiple>
        {({ onClick }) => <Button label="Выбрать файлы" onClick={onClick} />}
      </FileField>
      {renderFiles(value)}
      {value && value?.length > 0 && <Button label="Удалить файлы" onClick={handleDelete} />}
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
