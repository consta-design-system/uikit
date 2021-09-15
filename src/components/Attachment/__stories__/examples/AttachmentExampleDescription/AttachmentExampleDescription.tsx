import './AttachmentExampleDescription.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleDescription = cn('AttachmentExampleDescription');

export function AttachmentExampleDescription() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <div>
        <Attachment
          className={cnAttachmentExampleDescription()}
          fileName="Фотография"
          fileExtension="jpg"
          fileDescription="1,5 Mб 19.07.2020, 16:11"
        />
      </div>
      <div>
        <Attachment
          className={cnAttachmentExampleDescription()}
          fileName="Скан паспорта"
          fileExtension="pdf"
          fileDescription="1,5 Mб 19.07.2020, 16:12"
        />
      </div>
      <div>
        <Attachment
          className={cnAttachmentExampleDescription()}
          fileName="Сопроводительное письмо"
          fileExtension="docx"
          fileDescription="225 Mб 19.07.2020, 17:15"
        />
      </div>
    </div>
  );
}
