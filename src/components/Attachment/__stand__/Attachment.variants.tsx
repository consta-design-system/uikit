import { useBoolean, useNumber, useText } from '@consta/stand';
import React from 'react';

import { IconTrash } from '##/icons/IconTrash/IconTrash';

import { Attachment } from '../Attachment';

const Variants = () => {
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
      loading={loading}
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
