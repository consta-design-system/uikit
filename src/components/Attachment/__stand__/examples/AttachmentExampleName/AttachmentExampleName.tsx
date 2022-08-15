import './AttachmentExampleName.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleName = cn('AttachmentExampleName');

export const AttachmentExampleName = () => {
  return (
    <div>
      <div>
        <Attachment
          className={cnAttachmentExampleName()}
          fileName="Файл с нормальным описанием"
          fileExtension="jpg"
          fileDescription="14 Мб 01.04.2020, 07:01"
        />
      </div>
      <div>
        <Attachment
          className={cnAttachmentExampleName()}
          fileName="Файл с каким попало описанием"
          fileExtension="bzz"
          fileDescription="Крекс, пекс, фекс"
        />
      </div>
    </div>
  );
};
