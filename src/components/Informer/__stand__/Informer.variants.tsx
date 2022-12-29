import { IconLeaf } from '@consta/icons/IconLeaf';
import { useBoolean, useSelect, useText } from '@consta/stand';
import * as React from 'react';

import {
  Informer,
  informerPropSiseDefault,
  informerPropSize,
  informerPropStatus,
  informerPropStatusDefault,
  informerPropView,
  informerPropViewDefault,
} from '../Informer';

const Variants = () => {
  const status = useSelect(
    'status',
    informerPropStatus,
    informerPropStatusDefault,
  );
  const title = useText('title', 'Это заголовок');
  const label = useText('label', 'Это очень важное сообщение. Или не очень :)');
  const view = useSelect('view', informerPropView, informerPropViewDefault);
  const size = useSelect('size', informerPropSize, informerPropSiseDefault);
  const icon = useBoolean('icon', false);

  return (
    <Informer
      size={size}
      status={status}
      title={title}
      label={label}
      view={view}
      icon={icon ? IconLeaf : undefined}
    />
  );
};

export default Variants;
