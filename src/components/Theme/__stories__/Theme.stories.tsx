import React from 'react';

import { ThemePreview } from '../../../uiKit/components/ThemePreview/ThemePreview';
import { createMetadata } from '../../../utils/storybook';

import mdx from './Theme.mdx';

export function Playground() {
  return <ThemePreview />;
}

export default createMetadata({
  title: 'Components|/Theme',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
