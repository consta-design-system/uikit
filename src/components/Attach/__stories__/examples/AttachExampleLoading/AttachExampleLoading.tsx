import './AttachExampleLoading.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleLoading = cn('AttachExampleLoading');

export function AttachExampleLoading() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Attach
        className={cnAttachExampleLoading()}
        fileName="Документация"
        fileExtension="docx"
        fileDescription="1,5 Mб 21.02.2020, 14:12"
        loadingText="Загрузка"
        loading
        loadingProgress={70}
      />
    </div>
  );
}
