import React, { useRef } from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Attach } from '../../Attach/Attach';
import { DragNDropField } from '../DragNDropField';

import mdx from './DragNDropField.docs.mdx';

export function Playground() {
  const ref = useRef(null);
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <>
      <DragNDropField
        ref={ref}
        multiple={boolean('multiple', true)}
        accept={text('accept', 'image/*')}
        maxSize={number('maxSize', 0) || undefined}
        onDropFiles={setFiles}
      >
        {({ openFileDialog }) => (
          <>
            Перетяните сюда
            <br />
            <br />
            <div>
              <button type="button" onClick={openFileDialog}>
                Выбрать файл
              </button>{' '}
              <button type="button" onClick={() => alert('Другое действие')}>
                Другое действие
              </button>
            </div>
            <br />
            <a href="#a">Ссылка</a>
          </>
        )}
      </DragNDropField>
      {files.map((file) => (
        <Attach
          key={file.name}
          fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
          fileName={file.name}
          fileDescription={file.type}
        />
      ))}
    </>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/DragNDropField',
  id: 'components/DragNDropField',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=32774%3A0',
    },
  },
});
