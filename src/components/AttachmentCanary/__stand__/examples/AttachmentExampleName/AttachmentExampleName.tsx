import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleName = () => {
  return (
    <Example>
      <Attachment
        fileName="Файл с нормальным описанием"
        fileExtension="jpg"
        withIcon
        fileDescription="14 Мб 01.04.2020, 07:01"
      />
      <Attachment
        fileName="Файл с каким попало описанием"
        fileExtension="bzz"
        withIcon
        fileDescription="Крекс, пекс, фекс"
      />
    </Example>
  );
};
