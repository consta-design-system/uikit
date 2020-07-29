import './AttachExampleList.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleList = cn('AttachExampleList');

export function AttachExampleList() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div>
        <Attach
          className={cnAttachExampleList()}
          fileName="Фотография"
          fileExtension="jpg"
          fileDescription="1,5 Mб 19.07.2020, 16:11"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleList()}
          fileName="Скан паспорта"
          fileExtension="pdf"
          fileDescription="1,5 Mб 19.07.2020, 16:12"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleList()}
          fileName="Сопроводительное письмо"
          fileExtension="docx"
          fileDescription="225 Mб 19.07.2020, 17:15"
        />
      </div>
    </div>
  );
}
