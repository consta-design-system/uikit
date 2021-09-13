import './LayoutExample.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExample = cn('LayoutExample');

export const LayoutExample = () => {
  return (
    <Layout className={cnLayoutExample()} direction="column">
      <Layout fixed className={cnLayoutExample('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="row" className={cnLayoutExample('Content')}>
        <Layout className={cnLayoutExample('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutExample('Block', { yellow: true })} flex={2}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutExample('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
