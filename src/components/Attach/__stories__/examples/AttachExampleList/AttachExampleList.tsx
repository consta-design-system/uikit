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
          fileName="Билеты на Марс"
          fileExtension="pdf"
          fileDescription="Не забудьте распечатать"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleList()}
          fileName="Инструкция по сборке марсохода"
          fileExtension="docx"
          fileDescription="225 Mб 19.07.2020, 16:10"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleList()}
          fileName="Наклейка на марсоход"
          fileExtension="png"
          fileDescription="1,5 Mб 19.07.2020, 16:11"
        />
      </div>
    </div>
  );
}
