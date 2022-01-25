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
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/vNZFtFH6w0IjD2Twi5OXXE/Consta-Default-Colors?node-id=1721%3A6',
    },
  },
});
