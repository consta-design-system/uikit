import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import { Loader } from '../Loader';

import mdx from './Loader.mdx';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 's'),
});

export function Playground() {
  const { size } = defaultKnobs();

  return <Loader size={size} />;
}

export default {
  title: 'Components|/Loader',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
