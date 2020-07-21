import React from 'react';

import { ThemePreview } from './ThemePreview/ThemePreview';
import mdx from './Theme.mdx';

export function Playground() {
  return <ThemePreview />;
}

export default {
  title: 'Components|/Theme',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
