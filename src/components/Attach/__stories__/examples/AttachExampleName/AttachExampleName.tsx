import './AttachExampleName.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleName = cn('AttachExampleName');

export function AttachExampleName() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div>
        <Attach
          className={cnAttachExampleName()}
          fileName="Файл с нормальным описанием"
          fileExtension="jpg"
          fileDescription="14 Мб 01.04.2020, 07:01"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleName()}
          fileName="Файл с каким попало описанием"
          fileExtension="bzz"
          fileDescription="Крекс, пекс, фекс"
        />
      </div>
    </div>
  );
}
