import './LayoutExampleBasic.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleBasic = cn('LayoutExampleBasic');

export const LayoutExampleBasic = () => {
  return (
    <Example col={1}>
      <Layout className={cnLayoutExampleBasic()}>
        <Layout flex={1} className={cnLayoutExampleBasic('Block')}>
          <Text>Это первый блок</Text>
        </Layout>
        <Layout flex={2} className={cnLayoutExampleBasic('Block')}>
          <Text>А это второй блок, он в два раза шире первого</Text>
        </Layout>
      </Layout>
    </Example>
  );
};
