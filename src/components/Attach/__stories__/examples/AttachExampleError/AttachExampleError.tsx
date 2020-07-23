import './AttachExampleError.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleError = cn('AttachExampleError');

export function AttachExampleError() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Attach
        className={cnAttachExampleError()}
        fileName="Документация"
        fileExtension="docx"
        errorText="Ошибка: Файл не возможно загрузить"
      />
    </div>
  );
}
