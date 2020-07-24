import './ExampleValueInterception.css';

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { FileField, FileFieldProps } from '../../../FileField';
import { cn } from '../../cn';

const cnExampleValueInterception = cn('ExampleValueInterception');

function renderFiles(value: FileFieldProps['value']) {
  if (value) {
    const render = [];
    for (let i = 0; i < value.length; i++) {
      render[i] = <li key={`${value[i].name}-${i}`}>{value[i].name}</li>;
    }
    return <ul className={cnExampleValueInterception('FileList')}>{render}</ul>;
  }
  return null;
}

export function ExampleValueInterception() {
  const [value, setValue] = useState<FileFieldProps['value']>(null);

  const handleChange: FileFieldProps['onChange'] = ({ value }) => {
    const dataTransfer = new DataTransfer();

    if (value) {
      for (const file of Array.from(value)) {
        if (dataTransfer.files.length < 2) {
          dataTransfer.items.add(file);
        }
      }
    }

    setValue(dataTransfer.files);
  };

  const handleDelete = () => setValue(null);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Text size="xs" className={cnExampleValueInterception('FieldLabel')}>
        Возможно прикрепить не больше 2х файлов
      </Text>
      <FileField onChange={handleChange} value={value} multiple>
        {({ onClick }) => (
          <Button
            className={cnExampleValueInterception('Button')}
            label="Выбрать файлы"
            onClick={onClick}
          />
        )}
      </FileField>
      {renderFiles(value)}
      {value && value.length > 0 && <Button label="Удалить файлы" onClick={handleDelete} />}
    </div>
  );
}
