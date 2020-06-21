import './StoryBookRootDocsDecorator.css';

import React from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';

import { presetGpnDefault, Theme } from '../../../components/Theme/Theme';

type DocsContainerProps = {
  context: React.ComponentProps<typeof DocsContainer>;
};

export const StoryBookRootDocsDecorator: React.FC<DocsContainerProps> = (props) => {
  const { children, context } = props;

  return (
    <DocsContainer context={context}>
      <Theme preset={presetGpnDefault} className="StoryBookRootDocsDecorator">
        {children}
      </Theme>
    </DocsContainer>
  );
};
