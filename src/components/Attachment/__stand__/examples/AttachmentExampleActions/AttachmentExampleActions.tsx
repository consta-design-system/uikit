import { IconEdit } from '@consta/icons/IconEdit';
import { IconEyeClose } from '@consta/icons/IconEyeClose';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '../../..';

export const AttachmentExampleActions = () => {
  return (
    <Example>
      <Attachment
        fileName="my_tale_about_mars_final_last_12"
        fileExtension="docx"
        withPictogram
        fileDescription="1,5 Mб 21.02.2020, 14:12"
        actions={[
          {
            onClick: (e) => e.stopPropagation(),
            title: 'Изменить',
            icon: IconEdit,
          },
          {
            onClick: (e) => e.stopPropagation(),
            title: 'Скрыть',
            icon: IconEyeClose,
          },
          {
            onClick: (e) => e.stopPropagation(),
            title: 'Удалить',
            icon: IconTrash,
          },
        ]}
      />
    </Example>
  );
};
