import './AttachmentExampleAs.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleAs = cn('AttachmentExampleAs');

export const AttachmentExampleAs = () => {
  return (
    <Attachment
      as="a"
      href="https://www.youtube.com/watch?v=dAZKu_ojb14"
      className={cnAttachmentExampleAs()}
      fileName="Вести с марса"
      fileExtension="mov"
      fileDescription="Нажми меня"
    />
  );
};
