import './AttachmentExampleError.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleError = cn('AttachmentExampleError');

export const AttachmentExampleError = () => {
  return (
    <div>
      <div>
        <Attachment
          className={cnAttachmentExampleError()}
          fileName="Марсианский закат"
          fileExtension="jpg"
          errorText="Фотография не загрузилась"
        />
      </div>
      <div>
        <Attachment
          className={cnAttachmentExampleError()}
          fileName="Марсианский закат"
          fileExtension="jpg"
          errorText="Файл слишком большой, максимум 100 ТБ"
        />
      </div>
    </div>
  );
};
