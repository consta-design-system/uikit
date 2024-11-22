import './DragNDropFieldVariants.css';

import { IconAlert } from '@consta/icons/IconAlert';
import { IconClose } from '@consta/icons/IconClose';
import { IconRevert } from '@consta/icons/IconRevert';
import { IconTrash } from '@consta/icons/IconTrash';
import { useBoolean, useNumber } from '@consta/stand';
import React, { useRef, useState } from 'react';
import { Accept, FileRejection } from 'react-dropzone';

import { Attachment } from '##/components/Attachment';
import { cnCanary } from '##/utils/bem';

import { DragNDropFieldInformer } from '..';
import {
  DragNDropField,
  DragNDropFieldInformerPropStatus,
} from '../DragNDropFieldCanary';
import { getErrorsList } from '../getErrorsList';
import { withDefaultLocale } from '../locale';

const cnDragNDropFieldVariants = cnCanary('DragNDropFieldVariants');

const informerButtonIconMap = {
  default: IconClose,
  alert: IconRevert,
  warning: IconRevert,
};

const Variants = () => {
  const ref = useRef(null);
  const withCustomChildren = useBoolean('С кастомным контентом', false);
  const disabled = useBoolean('disabled', false);
  const multiple = useBoolean('multiple', true);

  const accept: Accept = {
    /* cspell:disable-next-line */
    'application/msword': ['.doc', '.docx'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/gif': ['.gif'],
  };

  const maxSize = useNumber('maxSize', 0);
  const minSize = useNumber('minSize', 0);
  const withInformer = useBoolean('withInformer', true);
  const withIcon = useBoolean('withIcon', true, withInformer);
  const loading = useBoolean('loading', false, withInformer);
  const informerWithButton = useBoolean(
    'informerWithButton',
    true,
    withInformer,
  );

  const [filesDropped, setFilesDropped] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const [otherError, setOtherError] = useState<Error>();
  const locale = withDefaultLocale();

  const handleDrop = (acceptedFiles: File[], rejections: FileRejection[]) => {
    const files = [...filesDropped, ...acceptedFiles];
    setFilesDropped(files);
    setFileRejections(rejections);
  };

  const handleReset = () => {
    setFilesDropped([]);
    setFileRejections([]);

    setOtherError(undefined);
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
      text = `Файлов загружено: ${filesDropped.length}`;
      break;
    case 'alert':
      text = 'Что-то пошло не так';
      break;
    case 'warning':
      text = getErrorsList(fileRejections, locale, { maxSize, minSize }).join(
        '; ',
      );
      break;
  }

  const deleteFile = (deleteIndex: number) => {
    const filesSpliced = [...filesDropped].filter(
      (value, index) => index !== deleteIndex,
    );
    setFilesDropped(filesSpliced);
  };

  return (
    <div className={cnDragNDropFieldVariants()}>
      <DragNDropField
        ref={ref}
        multiple={multiple}
        accept={accept}
        maxSize={maxSize}
        minSize={minSize}
        disabled={disabled}
        onError={setOtherError}
        onDrop={handleDrop}
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
      {withInformer && !disabled && (
        <DragNDropFieldInformer
          status={status}
          icon={withIcon ? IconAlert : undefined}
          loading={loading}
          text={text}
          withButton={informerWithButton}
          buttonIcon={informerButtonIconMap[status]}
          buttonLabel="Очистить"
          onButtonClick={handleReset}
        />
      )}
      <div className={cnDragNDropFieldVariants('AttachmentList')}>
        {filesDropped.map((file, index) => (
          <Attachment
            className={cnDragNDropFieldVariants('Attachment')}
            key={index}
            fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
            fileName={file.name}
            fileDescription={file.type}
            buttonIcon={IconTrash}
            buttonTitle="Удалить"
            withPictogram
            onButtonClick={(e) => {
              deleteFile(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Variants;
