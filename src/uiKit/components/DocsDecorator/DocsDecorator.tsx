import './DocsDecorator.css';

import React from 'react';
// тайпскрипт ругался DocsContainer. Я не смог разобраться что ему нужно было
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { DocsContainer } from '@storybook/addon-docs/blocks';

import { presetGpnDefault, Theme } from '../../../components/Theme/Theme';
import { cn } from '../../../utils/bem';

type DocsContainerProps = {
  context: React.ComponentProps<typeof DocsContainer>;
};

export const cnDocsDecorator = cn('DocsDecorator');

export const DocsDecorator: React.FC<DocsContainerProps> = (props) => {
  const { children, context } = props;

  return (
    <DocsContainer context={context}>
      <Theme preset={presetGpnDefault} className={cnDocsDecorator()}>
        {children}
      </Theme>
    </DocsContainer>
  );
};
