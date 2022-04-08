import './AttachmentExampleIcon.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleIcon = cn('AttachmentExampleIcon');

export const AttachmentExampleIcon = () => {
  return (
    <div>
      <div>
        <Attachment
          className={cnAttachmentExampleIcon()}
          fileName="Картинка в JPG"
          fileExtension="jpg"
        />
      </div>
      <div>
        <Attachment
          className={cnAttachmentExampleIcon()}
          fileName="Картинка в непонятном формате BZZ"
          fileExtension="bzz"
        />
      </div>
    </div>
  );
};
