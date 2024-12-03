import './Attachment.variants.css';

import { IconEdit } from '@consta/icons/IconEdit';
import { IconEyeClose } from '@consta/icons/IconEyeClose';
import { IconTrash } from '@consta/icons/IconTrash';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Attachment } from '../Attachment';
import { attachmentPropSize, attachmentPropSizeDefault } from '../types';

const cnAttachmentVariants = cn('AttachmentVariants');

const Variants = () => {
  const size = useSelect('size', attachmentPropSize, attachmentPropSizeDefault);
  const fileName = useText('fileName', 'Приложенный документ');
  const fileDescription = useText(
    'fileDescription',
    '1,5 Mб 21.02.2019, 14:12',
  );
  const fileExtension = useText('fileExtension', 'doc');
  const errorText = useText('errorText', '');
  const loading = useBoolean('loading', false);
  const loadingProgress = useNumber('loadingProgress', 70, Boolean(loading));
  const loadingText = useText('loadingText', 'Загрузка', Boolean(loading));
  const withActions = useBoolean('withActions', false);
  const withPictogram = useBoolean('withPictogram', true);

  return (
    <Attachment
      className={cnAttachmentVariants()}
      loading={loading}
      size={size}
      withPictogram={withPictogram}
      loadingText={loadingText}
      fileName={fileName}
      loadingProgress={loadingProgress}
      errorText={errorText}
      fileDescription={fileDescription}
      fileExtension={fileExtension}
      {...(withActions && {
        actions: [
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
        ],
      })}
    />
  );
};

export default Variants;
