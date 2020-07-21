import './ExampleEvents.css';

import React from 'react';

import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';
import { Attach } from '../../../Attach';
import { cn } from '../../cn';

const cnExampleEvents = cn('ExampleEvents');

export function ExampleEvents() {
  return (
    <Attach
      className={cnExampleEvents()}
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
  );
}
