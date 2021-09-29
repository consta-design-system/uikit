import './LayoutExampleBasic.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../LayoutCanary';

const cnLayoutExampleBasic = cn('LayoutExampleBasic');

export const LayoutExampleBasic = () => {
  return (
    <Layout className={cnLayoutExampleBasic()}>
      <Layout flex={1} className={cnLayoutExampleBasic('Block')}>
        <Text>Контент</Text>
      </Layout>
      <Layout flex={2} className={cnLayoutExampleBasic('Block')}>
        <Text>Контент</Text>
      </Layout>
    </Layout>
  );
};
