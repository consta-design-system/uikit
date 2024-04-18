import './DragNDropFieldExampleOnDropRejected.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconAlert } from '@consta/icons/IconAlert';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRevert } from '@consta/icons/IconRevert';
import { Example } from '@consta/stand';
import React, { useState } from 'react';
import { FileRejection } from 'react-dropzone';

import {
  DragNDropField,
  DragNDropFieldInformer,
  DragNDropFieldInformerPropStatus,
  getErrorsList,
} from '##/components/DragNDropFieldCanary';
import { cnCanary } from '##/utils/bem';

const cnDragNDropFieldExampleOnDropRejected = cnCanary(
  'DragNDropFieldExampleOnDropRejected',
);

export const DragNDropFieldExampleOnDropRejected = () => {
  const [filesDropped, setFilesDropped] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const [otherError, setOtherError] = useState<Error>();

  const handleDrop = (acceptedFiles: File[], rejections: FileRejection[]) => {
    const files = [...filesDropped, ...acceptedFiles];
    setFilesDropped(files);
    setFileRejections(rejections);
  };

  let status: DragNDropFieldInformerPropStatus = 'default';
  if (otherError) {
    status = 'alert';
  } else {
    status = fileRejections.length > 0 ? 'warning' : 'default';
  }

  let text: string;
  switch (status) {
    case 'default':
      text = `Картинок загружено: ${filesDropped.length}`;
      break;
    case 'alert':
      text = 'Что-то пошло не так';
      break;
    case 'warning':
      text = getErrorsList(fileRejections).join('; ');
      break;
  }
  return (
    <Example col={1}>
      <div>
        <div className={cnDragNDropFieldExampleOnDropRejected('DropContainer')}>
          {filesDropped.map((file, index) => (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              title={file.name}
              key={index}
              className={`${cnDragNDropFieldExampleOnDropRejected(
                'DroppedImage',
              )} ${cnDragNDropFieldExampleOnDropRejected('DroppedItem')}`}
            />
          ))}
          <DragNDropField
            multiple
            accept={{ 'image/*': [] }}
            onError={setOtherError}
            onDrop={handleDrop}
            className={cnDragNDropFieldExampleOnDropRejected('DroppedItem')}
            title="Перетащите сюда любые картинки"
          >
            <IconAdd />
          </DragNDropField>
        </div>
        <DragNDropFieldInformer
          status={status}
          icon={status !== 'default' ? IconAlert : IconPhoto}
          text={text}
          withButton
          buttonLabel="Заново"
          buttonIcon={IconRevert}
          onButtonClick={() => {
            setFilesDropped([]);
            setOtherError(undefined);
            setFileRejections([]);
          }}
        />
      </div>
    </Example>
  );
};
