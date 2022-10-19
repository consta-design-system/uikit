import './DragNDropFieldVariants.css';

import { useBoolean, useNumber, useText } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Attachment } from '##/components/Attachment/Attachment';
import { cn } from '##/utils/bem';

import { DragNDropField } from '../DragNDropField';

const cnDragNDropFieldVariants = cn('DragNDropFieldVariants');

const Variants = () => {
  const withCustomChildren = useBoolean('С кастомным контентом', false);
  const disabled = useBoolean('disabled', false);
  const multiple = useBoolean('multiple', true);
  const accept = useText('accept', 'image/*');
  const maxSize = useNumber('maxSize', 0);
  const minSize = useNumber('minSize', 0);

  const ref = useRef(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={cnDragNDropFieldVariants()}>
      <DragNDropField
        ref={ref}
        multiple={multiple}
        accept={accept?.split(',')}
        maxSize={maxSize}
        minSize={minSize}
        onDropFiles={setFiles}
        disabled={disabled}
      >
        {withCustomChildren
          ? ({ openFileDialog }) => (
              <>
                Перетяните сюда
                <br />
                <br />
                <div>
                  <button type="button" onClick={openFileDialog}>
                    Выбрать файл
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => alert('Другое действие')}
                  >
                    Другое действие
                  </button>
                </div>
                <br />
                <a href="#a">Ссылка</a>
              </>
            )
          : undefined}
      </DragNDropField>
      {files.map((file) => (
        <Attachment
          key={file.name}
          fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
          fileName={file.name}
          fileDescription={file.type}
        />
      ))}
    </div>
  );
};

export default Variants;
