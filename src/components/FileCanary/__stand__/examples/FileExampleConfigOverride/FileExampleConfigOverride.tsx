import './FileExampleConfigOverride.css';

import { IconFileConfig } from '@consta/icons/IconFileConfig';
import { IconFileDocument } from '@consta/icons/IconFileDocument';
import { IconFileImage } from '@consta/icons/IconFileImage';
import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { defaultConfig } from '../../../config';
import { fileGenerator } from '../../../fileCanaryGenerator';

export const cnFileExampleConfigOverride = cn('FileExampleConfigOverride');

const overridenConfig = {
  ...defaultConfig,
  js: {
    color: '#0071b2',
    icon: IconFileDocument,
  },
  png: {
    color: 'rgb(116, 72, 221)',
    icon: IconFileImage,
  },
  rst: {
    color: 'var(--custom-color-example)', // пользовательская CSS-переменная
    icon: IconFileConfig,
  },
};

const OverridenFile = fileGenerator(overridenConfig);

export const FileExampleConfigOverride = () => {
  const extensions = ['js', 'png', 'rst', 'docx'];
  return (
    <Example>
      <div className={cnFileExampleConfigOverride()}>
        {extensions.map((ext) => (
          <OverridenFile size="m" extension={ext} key={ext} />
        ))}
      </div>
    </Example>
  );
};
