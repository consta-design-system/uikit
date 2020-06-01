import './AttachExampleError.css';

import React from 'react';
import { Preview } from '@storybook/addon-docs/blocks';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';
import { Theme, presetGpnDefault } from '../../../../Theme/Theme';

const cnAttachExampleError = cn('AttachExampleError');

export function AttachExampleError() {
  return (
    <Preview>
      <Theme preset={presetGpnDefault}>
        <Attach
          className={cnAttachExampleError()}
          fileName="Документация"
          fileExtension="docx"
          errorText="Ошибка: Файл не возможно загрузить"
        />
      </Theme>
    </Preview>
  );
}
