import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleEvents = () => {
  return (
    <Example>
      <Attachment
        fileName="my_tale_about_mars_final_last_12"
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
    </Example>
  );
};
