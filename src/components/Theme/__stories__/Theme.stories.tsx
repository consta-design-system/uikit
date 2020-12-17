import React from 'react';

import { ThemePreview } from '../../../uiKit/components/ThemePreview/ThemePreview';
import { createMetadata } from '../../../utils/storybook';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Theme.mdx';

export function Playground() {
  return <ThemePreview />;
}

export default createMetadata({
  title: 'Компоненты|/Theme',
  id: 'components/Theme',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
