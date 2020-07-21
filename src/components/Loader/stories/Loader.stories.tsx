import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { Loader } from '../Loader';

import mdx from './Loader.mdx';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 's'),
});

const cnLoaderStories = cn('LoaderStories');

export function Playground() {
  const { size } = defaultKnobs();

  return (
    <div className={cnLoaderStories()}>
      <Loader size={size} />
    </div>
  );
}

export default {
  title: 'UI-KIT|/Loader',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
