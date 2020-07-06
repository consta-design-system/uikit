import './AttachExampleError.css';

import React from 'react';
import { Preview } from '@storybook/addon-docs/dist/blocks';

import { cn } from '../../../../../utils/bem';
import { presetGpnDefault, Theme } from '../../../../Theme/Theme';
import { Attach } from '../../../Attach';

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
