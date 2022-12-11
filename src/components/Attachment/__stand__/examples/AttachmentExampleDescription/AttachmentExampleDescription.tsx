import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleDescription = () => {
  return (
    <Example>
      <Attachment
        fileName="Фотография"
        fileExtension="jpg"
        fileDescription="1,5 Mб 19.07.2020, 16:11"
      />
      <Attachment
        fileName="Скан паспорта"
        fileExtension="pdf"
        fileDescription="1,5 Mб 19.07.2020, 16:12"
      />
      <Attachment
        fileName="Сопроводительное письмо"
        fileExtension="docx"
        fileDescription="225 Mб 19.07.2020, 17:15"
      />
    </Example>
  );
};
