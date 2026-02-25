import { Example } from '@consta/stand';
import React from 'react';

import { File } from '../../../FileCanary';

export const FileExampleSize = () => (
  <Example>
    <File size="m" extension="doc" />
    <File size="s" extension="doc" />
  </Example>
);
