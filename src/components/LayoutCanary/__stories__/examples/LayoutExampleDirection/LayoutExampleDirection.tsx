import './LayoutExampleDirection.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleDirection = cn('LayoutExampleDirection');

export const LayoutExampleDirectionRow = () => {
  return (
    <Layout className={cnLayoutExampleDirection()}>
      <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
        <Text>Контент</Text>
      </Layout>
      <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
        <Text>Контент</Text>
      </Layout>
    </Layout>
  );
};

export const LayoutExampleDirectionColumn = () => {
  return (
    <Layout direction="column" className={cnLayoutExampleDirection()}>
      <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
        <Text>Контент</Text>
      </Layout>
      <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
        <Text>Контент</Text>
      </Layout>
    </Layout>
  );
};
