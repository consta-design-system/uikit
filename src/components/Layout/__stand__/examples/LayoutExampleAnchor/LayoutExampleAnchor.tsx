import './LayoutExampleAnchor.css';

import React, { useRef } from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleAnchor = cn('LayoutExampleAnchor');

export const LayoutExampleAnchor = () => {
  const scrollContainerRef = useRef(null);
  const fixedRef = useRef(null);

  return (
    <Layout
      direction="column"
      ref={scrollContainerRef}
      className={cnLayoutExampleAnchor()}
    >
      <Layout className={cnLayoutExampleAnchor('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="column" className={cnLayoutExampleAnchor('Container')}>
        <Layout
          ref={fixedRef}
          fixed
          scrollContainer={window}
          verticalAlign="top"
          className={cnLayoutExampleAnchor('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExampleAnchor('Content')}>
          <Text>Контент</Text>
        </Layout>
        <Layout
          fixed
          scrollContainer={window}
          verticalAlign="bottom"
          anchorRef={fixedRef}
          className={cnLayoutExampleAnchor('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExampleAnchor('Content')}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutExampleAnchor('Content')}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
