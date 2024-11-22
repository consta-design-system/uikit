import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '##/components/DragNDropFieldCanary';

export const DragNDropFieldExampleCallbackOnDrop = () => (
  <Example col={1}>
    <DragNDropField
      /* cspell:disable-next-line */
      accept={{ 'application/msword': ['.doc', '.docx'] }}
      multiple
      onDrop={(filesAccepted, filesRejected) => {
        console.log(filesAccepted);
        console.log(filesRejected);
        alert(
          `Файлов принято: ${filesAccepted.length}. Файлов отвергнуто: ${filesRejected.length} `,
        );
      }}
      onDropAccepted={(filesAccepted) => {
        console.log(filesAccepted);
        alert(`Файлов принято: ${filesAccepted.length}.`);
      }}
      onDropRejected={(filesRejected) => {
        console.log(filesRejected);
        alert(`Файлов отвергнуто: ${filesRejected.length}.`);
      }}
      onError={(error) => {
        console.log(error);
        alert(`Ошибка! ${error.message}`);
      }}
    />
  </Example>
);
