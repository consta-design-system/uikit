import './LayoutStories.css';

import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Text } from '../../Text/Text';
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
    <Layout direction={direction} className={cnLayoutStories()}>
      <Layout className={cnLayoutStories('Block')} flex={flexBlock1}>
        <Text>Контент</Text>
      </Layout>
      <Layout className={cnLayoutStories('Block')} flex={flexBlock2}>
        <Text>Контент</Text>
      </Layout>
    </Layout>
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
