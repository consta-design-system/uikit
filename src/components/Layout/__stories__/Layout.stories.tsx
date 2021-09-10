import './LayoutStories.css';

import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Layout, layoutPropDirection, layoutPropDirectionDefault } from '../Layout';

import mdx from './Layout.docs.mdx';

const defaultKnobs = () => ({
  direction: select('Direction', layoutPropDirection, layoutPropDirectionDefault),
  flexBlock1: text('Flex Block 1', '1'),
  flexBlock2: text('Flex Block 2', '1'),
});

const cnLayoutStories = cn('LayoutStories');

export function Playground() {
  const { direction, flexBlock1, flexBlock2 } = defaultKnobs();

  return (
    <div className={cnLayoutStories()}>
      <Layout>
        <Layout fixed className={cnLayoutStories('Header')}>
          Заголовок
        </Layout>
        <Layout direction={direction} className={cnLayoutStories('Content')}>
          <Layout className={cnLayoutStories('Block')} flex={flexBlock1}>
            Контент
          </Layout>
          <Layout className={cnLayoutStories('Block')} flex={flexBlock2}>
            Контент
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Layout',
  id: 'components/Layout',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
    },
  },
});
