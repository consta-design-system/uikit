import './DocsDecorator.css';
import '../../whitepaper/whitepaper.css';

import React from 'react';
import { DocsContainer } from '@storybook/addon-docs/dist/blocks';

import { presetGpnDefault, Theme } from '../../../components/Theme/Theme';
import { cn } from '../../cn';

type DocsContainerProps = React.ComponentProps<typeof DocsContainer>;

export const cnDocsDecorator = cn('DocsDecorator');

export const DocsDecorator: React.FC<DocsContainerProps> = (props) => {
  const { children, context } = props;

  return (
    <DocsContainer context={context}>
      <Theme preset={presetGpnDefault} className={cnDocsDecorator(null, ['theme_gap_medium'])}>
        {children}
      </Theme>
    </DocsContainer>
  );
};
