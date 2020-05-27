import './AttachExampleLading.css';

import React from 'react';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleLading = cn('AttachExampleLading');

export function AttachExampleLading() {
  return (
    <Attach
      className={cnAttachExampleLading()}
      fileName="Документация"
      fileExtension="docx"
      fileDescription="1,5 Mб 21.02.2020, 14:12"
      loadingText="Загрузка"
      loading
      loadingProgress={70}
    />
  );
}
