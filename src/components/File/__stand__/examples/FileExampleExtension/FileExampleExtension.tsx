import { Example } from '@consta/stand';
import React from 'react';

import { File } from '../../../File';

export const FileExampleExtension = () => (
  <Example>
    <File extension="doc" />
    <File extension="docx" />
    <File extension="jpg" />
    <File extension="mov" />
    <File extension="BlaBla" />
  </Example>
);
