import './LayoutExampleFixed.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleFixed = cn('LayoutExampleFixed');

export const LayoutExampleFixed = () => {
  return (
    <Layout className={cnLayoutExampleFixed()}>
      <Layout flex={1} className={cnLayoutExampleFixed('Container')} direction="column">
        <Layout
          verticalAlign="top"
          horizontalAlign="right"
          fixed
          className={cnLayoutExampleFixed('Header')}
        >
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
      <Layout flex={1} className={cnLayoutExampleFixed('Container')} direction="column">
        <Layout direction="row" className={cnLayoutExampleFixed('Content')}>
          <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
            <Text>Контент</Text>
          </Layout>
          <Layout className={cnLayoutExampleFixed('Block')} flex={1}>
            <Text>Контент</Text>
          </Layout>
        </Layout>
        <Layout
          verticalAlign="bottom"
          horizontalAlign="right"
          fixed
          className={cnLayoutExampleFixed('Header')}
        >
          <Text>Заголовок</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
