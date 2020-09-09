import React from 'react';

import { createMetadata } from '../../../utils/storybook';
import { Text } from '../../Text/Text';

import { HeaderFullExample } from './examples/HeaderFullExample/HeaderFullExample';
import { HeaderMinifyLoginExample } from './examples/HeaderMinifyLoginExample/HeaderMinifyLoginExample';
import { HeaderWithLogoExample } from './examples/HeaderWithLogoExample/HeaderWithLogoExample';
import { HeaderWithoutMenuExample } from './examples/HeaderWithoutMenuExample/HeaderWithoutMenuExample';
import { HeaderWithoutSearchExample } from './examples/HeaderWithoutSearchExample/HeaderWithoutSearchExample';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Header.mdx';

export function Playground() {
  return (
    <div>
      <Text size="3xl" lineHeight="l">
        Полный
      </Text>
      <HeaderFullExample />
      <Text size="3xl" lineHeight="l">
        Без поиска
      </Text>
      <HeaderWithoutSearchExample />
      <Text size="3xl" lineHeight="l">
        С минилогином
      </Text>
      <HeaderMinifyLoginExample />
      <Text size="3xl" lineHeight="l">
        Без меню
      </Text>
      <HeaderWithoutMenuExample />
      <Text size="3xl" lineHeight="l">
        С уникальным лого
      </Text>
      <HeaderWithLogoExample />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Header',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
