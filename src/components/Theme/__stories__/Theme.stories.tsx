import React from 'react';

import { ThemePreview } from '../../../uiKit/components/ThemePreview/ThemePreview';
import { createMetadata } from '../../../utils/storybook';

import mdx from './Theme.docs.mdx';

export function Playground() {
  return <ThemePreview />;
}

export default createMetadata({
  title: 'Компоненты|/Служебные/Theme',
  id: 'components/Theme',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
