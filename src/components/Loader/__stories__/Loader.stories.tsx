import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Loader, loaderPropSize, loaderPropSizeDefault } from '../Loader';

import mdx from './Loader.docs.mdx';

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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=2334%3A37476',
    },
  },
});
