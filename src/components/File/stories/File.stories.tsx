import * as React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { File } from '../File';

import mdx from './File.mdx';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  extension: text('extension', 'doc'),
  loading: boolean('loading', false),
  loadingWithProgressSpin: boolean('loadingWithProgressSpin', false),
  loadingProgress: number('loadingProgress', 70),
});

const cnFileStories = cn('FileStories');

export function Playground() {
  const { size, extension, loading, loadingWithProgressSpin, loadingProgress } = defaultKnobs();

  return (
    <div className={cnFileStories()}>
      <File
        size={size}
        extension={extension}
        loading={loading}
        loadingWithProgressSpin={loadingWithProgressSpin}
        loadingProgress={loadingProgress}
      />
    </div>
  );
}

export default {
  title: 'UI-KIT|/File',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
