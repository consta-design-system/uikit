import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleError = () => {
  return (
    <Example>
      <Attachment
        fileName="Марсианский закат"
        fileExtension="jpg"
        withPictogram
        errorText="Фотография не загрузилась"
      />
      <Attachment
        fileName="Марсианский закат"
        fileExtension="jpg"
        withPictogram
        errorText="Файл слишком большой, максимум 100 ТБ"
      />
    </Example>
  );
};
