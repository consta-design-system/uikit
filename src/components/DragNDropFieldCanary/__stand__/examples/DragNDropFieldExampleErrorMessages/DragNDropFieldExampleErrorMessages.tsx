import { Example } from '@consta/stand';
import React from 'react';

import {
  DragNDropField,
  DragNDropFieldPropLocale,
  getErrorsList,
} from '##/components/DragNDropFieldCanary';

export const DragNDropFieldExampleErrorMessages = () => {
  const locale: DragNDropFieldPropLocale = {
    'file-too-large': ({ file }) => `Ой! Похоже ${file.name} слишком большой`,
  };
  return (
    <Example col={1}>
      <DragNDropField
        maxSize={10}
        onDropAccepted={(files) => console.log(files)}
        onDropRejected={(reject) => {
          console.log(reject);
          alert(
            getErrorsList(reject, locale, {
              maxSize: 10,
            }).join('; '),
          );
        }}
      />
    </Example>
  );
};
