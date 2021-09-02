import './AttachmentExampleIcon.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleIcon = cn('AttachmentExampleIcon');

export function AttachmentExampleIcon() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
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
}
