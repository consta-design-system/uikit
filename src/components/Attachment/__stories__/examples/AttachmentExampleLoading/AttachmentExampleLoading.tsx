import './AttachmentExampleLoading.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleLoading = cn('AttachmentExampleLoading');

export const AttachmentExampleLoading = () => {
  return (
    <div>
      <Attachment
        className={cnAttachmentExampleLoading()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="docx"
        fileDescription="25,5 Mб 19.07.2020, 21:12"
        loadingText="Я ещё не загрузился, уже загружено"
        loading
        loadingProgress={70}
      />
    </div>
  );
};
