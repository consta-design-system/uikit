import { Example } from '@consta/stand';
import React from 'react';

import { File } from '../../../File';

export const FileExampleLoading = () => (
  <Example>
    <File loading />
    <File loading loadingWithProgressSpin />
    <File loading loadingWithProgressSpin loadingProgress={30} />
    <File loading loadingWithProgressSpin loadingProgress={60} />
    <File loading loadingWithProgressSpin loadingProgress={90} />
  </Example>
);
