import React from 'react';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';

import mdx from './MixCard.docs.mdx';

const cnStoriesMixCard = cn('StoriesMixCard');

export function Playground() {
  return <div className={cnStoriesMixCard()} />;
}

export default createMetadata({
  title: 'Mixins|/MixCard',
  id: 'Mixins|/MixCard',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
