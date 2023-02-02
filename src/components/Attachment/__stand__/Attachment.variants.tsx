import './Attachment.variants.css';

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
  const withButtonAction = useBoolean('withButtonAction', false);

  return (
    <Attachment
      className={cnAttachmentVariants()}
      loading={loading}
      size={size}
      loadingText={loadingText}
      fileName={fileName}
      loadingProgress={loadingProgress}
      errorText={errorText}
      fileDescription={fileDescription}
      buttonIcon={IconTrash}
      buttonTitle="Удалить"
      fileExtension={fileExtension}
      {...(withButtonAction && {
        onButtonClick: (e) => {
          e.stopPropagation();
        },
      })}
    />
  );
};

export default Variants;
