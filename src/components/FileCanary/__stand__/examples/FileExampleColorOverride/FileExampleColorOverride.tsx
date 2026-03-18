import './FileExampleColorOverride.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { File } from '../../../FileCanary';

export const cnFileExampleColorOverride = cn('FileExampleColorOverride');

export const FileExampleColorOverride = () => (
  <Example>
    <div className={cnFileExampleColorOverride()}>
      <File extension="doc" />
      <File extension="docx" />
      <File extension="txt" />
    </div>
  </Example>
);
