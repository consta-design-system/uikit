import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Loader, loaderPropSize, loaderPropSizeDefault } from '../Loader';

import mdx from './Loader.mdx';

const defaultKnobs = () => ({
  size: select('size', loaderPropSize, loaderPropSizeDefault),
});

export function Playground() {
  const { size } = defaultKnobs();

  return <Loader size={size} />;
}

export default createMetadata({
  title: 'Компоненты|/Обратная связь/Loader',
  id: 'components/Loader',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
