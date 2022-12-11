import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleLoading = () => {
  return (
    <Example>
      <Attachment
        fileName="Инструкция по сборке марсохода"
        fileExtension="docx"
        fileDescription="25,5 Mб 19.07.2020, 21:12"
        loadingText="Я ещё не загрузился, уже загружено"
        loading
        loadingProgress={70}
      />
    </Example>
  );
};
