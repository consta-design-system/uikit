import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Button } from '../../../../Button/Button';
import { FileField } from '../../../FileField';

export function FileFieldExampleRenderProp() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleRenderProp">
        {(props) => <Button {...props} label="Выбрать файлы" />}
      </FileField>
    </div>
  );
}
