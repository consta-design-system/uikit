import { IconClose } from '@consta/icons/IconClose';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleBasicsLoading = () => {
  return (
    <Example>
      <Attachment
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
    </Example>
  );
};

export const AttachmentExampleBasicsError = () => {
  return (
    <Example>
      <Attachment
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
    </Example>
  );
};

export const AttachmentExampleBasicsLoaded = () => {
  return (
    <Example>
      <Attachment
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
    </Example>
  );
};

export const AttachmentExampleBasicsLink = () => {
  return (
    <Example>
      <Attachment
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        fileDescription="1,5 Mб • 21.02.2051, 14:12"
        onClick={() => console.log('onClick')}
      />
    </Example>
  );
};
