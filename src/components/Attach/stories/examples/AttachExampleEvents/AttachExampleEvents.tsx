import './AttachExampleEvents.css';

import React from 'react';
import { Preview } from '@storybook/addon-docs/dist/blocks';

import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';
import { cn } from '../../../../../utils/bem';
import { presetGpnDefault, Theme } from '../../../../Theme/Theme';
import { Attach } from '../../../Attach';

const cnAttachExampleEvents = cn('AttachExampleEvents');

export function AttachExampleEvents() {
  return (
    <Preview>
      <Theme preset={presetGpnDefault}>
        <Attach
          className={cnAttachExampleEvents()}
          fileName="Документация"
          fileExtension="docx"
          fileDescription="1,5 Mб 21.02.2020, 14:12"
          loadingText="Загрузка"
          buttonIcon={IconTrash}
          buttonTitle="Удалить"
          onClick={() => console.log('onClick')}
          onButtonClick={(e) => {
            e.stopPropagation();
            console.log('onButtonClick');
          }}
        />
      </Theme>
    </Preview>
  );
}
