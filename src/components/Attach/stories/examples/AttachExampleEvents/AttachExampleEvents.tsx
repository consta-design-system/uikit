import './AttachExampleEvents.css';

import React from 'react';
import { Preview } from '@storybook/addon-docs/blocks';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';
import { Theme, presetGpnDefault } from '../../../../Theme/Theme';
import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';

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
