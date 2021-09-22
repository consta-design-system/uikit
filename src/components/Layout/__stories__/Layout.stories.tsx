import './LayoutStories.css';

import React from 'react';
import { select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Text } from '../../Text/Text';
import { Layout, layoutPropDirection, layoutPropDirectionDefault } from '../Layout';

import { LayoutExampleAnchor } from './examples/LayoutExampleAnchor/LayoutExampleAnchor';
import { LayoutExampleFixed } from './examples/LayoutExampleFixed/LayoutExampleFixed';
import { LayoutExampleRowFixed } from './examples/LayoutExampleRowFixed/LayoutExampleRowFixed';
import mdx from './Layout.docs.mdx';

const flexArray = [1, 2, 3, 4, 5, 6];

const defaultKnobs = () => ({
  direction: select('Direction', layoutPropDirection, layoutPropDirectionDefault),
  flexBlock1: select('Flex Block 1', flexArray, 1),
  flexBlock2: select('Flex Block 2', flexArray, 1),
});

const cnLayoutStories = cn('LayoutStories');

export function Playground() {
  const { direction, flexBlock1, flexBlock2 } = defaultKnobs();

  return (
    <Layout direction="column" className={cnLayoutStories()}>
      <Layout className={cnLayoutStories('Header')}>
        <Text>Шапка</Text>
      </Layout>
      <Layout direction={direction} className={cnLayoutStories('Content', { direction })}>
        <Layout className={cnLayoutStories('Block')} flex={flexBlock1}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutStories('Block')} flex={flexBlock2}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

export const WithFixedVertical = createStory(
  () => {
    return <LayoutExampleFixed />;
  },
  {
    name: 'Фиксация строк',
  },
);

export const WithFixedHorizontal = createStory(
  () => {
    return <LayoutExampleRowFixed />;
  },
  {
    name: 'Фиксация колонок',
  },
);

export const WithAnchor = createStory(
  () => {
    return <LayoutExampleAnchor />;
  },
  {
    name: 'Фиксация к элементу якорю',
  },
);

export default createMetadata({
  title: 'Компоненты|/Служебные/Layout',
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
