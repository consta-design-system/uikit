import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text } from '../../Text/Text';
import { FullExample } from './examples/FullExample/FullExample';
import { WithoutSearchExample } from './examples/WithoutSearchExample/WithoutSearchExample';
import { MinifyLoginExample } from './examples/MinifyLoginExample/MinifyLoginExample';
import { WithoutMenuExample } from './examples/WithoutMenuExample/WithoutMenuExample';
import { WithLogoExample } from './examples/WithLogoExample/WithLogoExample';

storiesOf('Header', module).add('Примеры', () => {
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
});
