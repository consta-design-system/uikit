import './LayoutExampleRowFixed.css';

import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleRowFixed = cn('LayoutExampleRowFixed');

export const LayoutExampleRowFixed = () => {
  return (
    <Layout direction="column">
      <Layout direction="row" className={cnLayoutExampleRowFixed()}>
        <Layout
          fixed
          scrollContainer={window}
          verticalAlign="top"
          horizontalAlign="left"
          flex={1}
          className={cnLayoutExampleRowFixed('Fixed')}
        >
          <Text view="primary" size="m" lineHeight="m">
            Фиксированный элемент
          </Text>
        </Layout>
        <Layout className={cnLayoutExampleRowFixed('Content')} flex={2}>
          <Text view="primary" size="m" lineHeight="m">
            Контент
          </Text>
        </Layout>
        <Layout
          fixed
          scrollContainer={window}
          verticalAlign="top"
          horizontalAlign="right"
          flex={1}
          className={cnLayoutExampleRowFixed('Fixed')}
        >
          <Text view="primary" size="m" lineHeight="m">
            Фиксированный элемент
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
