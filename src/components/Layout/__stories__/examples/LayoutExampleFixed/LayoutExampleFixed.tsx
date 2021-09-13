import './LayoutExampleFixed.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleFixed = cn('LayoutExampleFixed');

export const LayoutExampleFixedTop = () => {
  return (
    <Layout className={cnLayoutExampleFixed()} direction="column">
      <Layout top fixed className={cnLayoutExampleFixed('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="row" className={cnLayoutExampleFixed('Content')}>
        <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

export const LayoutExampleFixedBottom = () => {
  return (
    <Layout className={cnLayoutExampleFixed()} direction="column">
      <Layout bottom fixed className={cnLayoutExampleFixed('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="row" className={cnLayoutExampleFixed('Content')}>
        <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
