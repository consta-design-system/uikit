import './AttachExampleLoading.css';

import React from 'react';
import { Preview } from '@storybook/addon-docs/dist/blocks';

import { cn } from '../../../../../utils/bem';
import { presetGpnDefault, Theme } from '../../../../Theme/Theme';
import { Attach } from '../../../Attach';

const cnAttachExampleLoading = cn('AttachExampleLoading');

export function AttachExampleLoading() {
  return (
    <Preview>
      <Theme preset={presetGpnDefault}>
        <Attach
          className={cnAttachExampleLoading()}
          fileName="Документация"
          fileExtension="docx"
          fileDescription="1,5 Mб 21.02.2020, 14:12"
          loadingText="Загрузка"
          loading
          loadingProgress={70}
        />
      </Theme>
    </Preview>
  );
}
