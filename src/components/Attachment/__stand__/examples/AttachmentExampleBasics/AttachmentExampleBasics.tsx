import './AttachmentExampleBasics.css';

import React from 'react';

import { IconClose } from '../../../../../icons/IconClose/IconClose';
import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';
import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleBasics = cn('AttachmentExampleBasics');

export const AttachmentExampleBasicsLoading = () => {
  return (
    <Attachment
      className={cnAttachmentExampleBasics()}
      fileName="Инструкция по сборке марсохода"
      fileExtension="pdf"
      loading
      loadingText="Загружено на 51%"
      buttonIcon={IconClose}
      buttonTitle="Отменить"
      onClick={() => console.log('onClick')}
      onButtonClick={(e) => {
        e.stopPropagation();
        console.log('onButtonClick');
      }}
    />
  );
};

export const AttachmentExampleBasicsError = () => {
  return (
    <Attachment
      className={cnAttachmentExampleBasics()}
      fileName="Инструкция по сборке марсохода"
      fileExtension="pdf"
      errorText="Файл слишком большой, максимум 100 ТБ"
      buttonIcon={IconClose}
      buttonTitle="Отменить"
      onClick={() => console.log('onClick')}
      onButtonClick={(e) => {
        e.stopPropagation();
        console.log('onButtonClick');
      }}
    />
  );
};

export const AttachmentExampleBasicsLoaded = () => {
  return (
    <Attachment
      className={cnAttachmentExampleBasics()}
      fileName="Инструкция по сборке марсохода"
      fileExtension="pdf"
      fileDescription="1,5 Mб • 21.02.2051, 14:12"
      buttonIcon={IconTrash}
      buttonTitle="Удалить"
      onClick={() => console.log('onClick')}
      onButtonClick={(e) => {
        e.stopPropagation();
        console.log('onButtonClick');
      }}
    />
  );
};

export const AttachmentExampleBasicsLink = () => {
  return (
    <Attachment
      className={cnAttachmentExampleBasics()}
      fileName="Инструкция по сборке марсохода"
      fileExtension="pdf"
      fileDescription="1,5 Mб • 21.02.2051, 14:12"
      onClick={() => console.log('onClick')}
    />
  );
};
