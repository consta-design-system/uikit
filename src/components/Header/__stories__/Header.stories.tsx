import React from 'react';

import { Text } from '../../Text/Text';

import { FullExample } from './examples/FullExample/FullExample';
import { MinifyLoginExample } from './examples/MinifyLoginExample/MinifyLoginExample';
import { WithLogoExample } from './examples/WithLogoExample/WithLogoExample';
import { WithoutMenuExample } from './examples/WithoutMenuExample/WithoutMenuExample';
import { WithoutSearchExample } from './examples/WithoutSearchExample/WithoutSearchExample';
import mdx from './Header.mdx';

export function Playground() {
  return (
    <div>
      <Text size="3xl" lineHeight="l">
        Полный
      </Text>
      <FullExample />
      <Text size="3xl" lineHeight="l">
        Без поиска
      </Text>
      <WithoutSearchExample />
      <Text size="3xl" lineHeight="l">
        С минилогином
      </Text>
      <MinifyLoginExample />
      <Text size="3xl" lineHeight="l">
        Без меню
      </Text>
      <WithoutMenuExample />
      <Text size="3xl" lineHeight="l">
        С уникальным лого
      </Text>
      <WithLogoExample />
    </div>
  );
}

export default {
  title: 'Components|/Header',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
