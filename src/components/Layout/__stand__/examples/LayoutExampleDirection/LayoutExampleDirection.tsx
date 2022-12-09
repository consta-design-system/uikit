import './LayoutExampleDirection.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleDirection = cn('LayoutExampleDirection');

export const LayoutExampleDirectionRow = () => {
  return (
    <Example col={1}>
      <Layout className={cnLayoutExampleDirection({ direction: 'row' })}>
        <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
          <Text>Первый блок</Text>
        </Layout>
        <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
          <Text>Второй блок</Text>
        </Layout>
      </Layout>
    </Example>
  );
};

export const LayoutExampleDirectionColumn = () => {
  return (
    <Example col={1}>
      <Layout
        direction="column"
        className={cnLayoutExampleDirection({ direction: 'column' })}
      >
        <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
          <Text>Первый блок</Text>
        </Layout>
        <Layout flex={1} className={cnLayoutExampleDirection('Block')}>
          <Text>Второй блок</Text>
        </Layout>
      </Layout>
    </Example>
  );
};
