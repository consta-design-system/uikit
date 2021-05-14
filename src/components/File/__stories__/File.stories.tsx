import * as React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { FileIconsGallery } from '../../../fileIcons/FileIcon/__stories__/FileIconsGallery/FileIconsGallery';
import { fileIconPropSize, fileIconPropSizeDefault } from '../../../fileIcons/FileIcon/FileIcon';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { File } from '../File';

import mdx from './File.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', fileIconPropSize, fileIconPropSizeDefault),
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

export const Gallery = FileIconsGallery;

export default createMetadata({
  title: 'Компоненты|/Графика/File',
  id: 'components/File',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/SLc0YGhuDotve6MTCBHlGxDU/Consta-Graphics?node-id=718%3A31',
    },
  },
});
