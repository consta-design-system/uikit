import './AttachExampleAs.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleAs = cn('AttachExampleAs');

export function AttachExampleAs() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Attach
        as="a"
        href="https://www.youtube.com/watch?v=dAZKu_ojb14"
        className={cnAttachExampleAs()}
        fileName="Вести с марса"
        fileExtension="mov"
        fileDescription="Нажми меня"
      />
    </div>
  );
}
