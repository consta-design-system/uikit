import './AttachmentExampleError.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleError = cn('AttachmentExampleError');

export function AttachmentExampleError() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
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
}
