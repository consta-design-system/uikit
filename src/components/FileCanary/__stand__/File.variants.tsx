import { useSelect, useText } from '@consta/stand';
import * as React from 'react';

import { File } from '../FileCanary';
import { filePropSize, filePropSizeDefault } from '../types';

const Variants = () => {
  const size = useSelect('size', filePropSize, filePropSizeDefault);
  const extension = useText('extension', 'doc') as string;

  return <File size={size} extension={extension} className="className" />;
};

export default Variants;
