import './AttachExampleError.css';

import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Preview } from '@storybook/addon-docs/blocks';

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
