import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import * as React from 'react';

import {
  fileIconPropSize,
  fileIconPropSizeDefault,
} from '../../../fileIcons/FileIcon/FileIcon';
import { File } from '../File';

const Variants = () => {
  const size = useSelect('size', fileIconPropSize, fileIconPropSizeDefault);
  const extension = useText('extension', 'doc');
  const loading = useBoolean('loading', false);
  const loadingWithProgressSpin = useBoolean(
    'loadingWithProgressSpin',
    false,
    Boolean(loading),
  );
  const loadingProgress = useNumber(
    'loadingProgress',
    70,
    Boolean(loadingWithProgressSpin),
  );

  return (
    <File
      size={size}
      extension={extension}
      loading={loading}
      loadingWithProgressSpin={loadingWithProgressSpin}
      loadingProgress={loadingProgress}
    />
  );
};

export default Variants;
