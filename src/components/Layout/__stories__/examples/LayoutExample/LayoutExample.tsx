import './LayoutExample.css';

import React, { useRef } from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExample = cn('LayoutExample');

export const LayoutExample = () => {
  const scrollContainerRef = useRef(null);
  const fixedRef = useRef(null);

  return (
    <Layout direction="column" ref={scrollContainerRef} className={cnLayoutExample()}>
      <Layout className={cnLayoutExample('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="column" className={cnLayoutExample('Container')}>
        <Layout
          ref={fixedRef}
          fixed
          smooth
          scrollContainerRef={scrollContainerRef}
          verticalAlign="top"
          className={cnLayoutExample('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExample('Content')}>
          <Text>Контент</Text>
        </Layout>
        <Layout
          fixed
          smooth
          scrollContainerRef={scrollContainerRef}
          verticalAlign="bottom"
          anchorRef={fixedRef}
          className={cnLayoutExample('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExample('Content')}>
          <Text>Контент</Text>
        </Layout>
        <Layout
          fixed
          smooth
          scrollContainerRef={scrollContainerRef}
          verticalAlign="bottom"
          className={cnLayoutExample('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExample('Content')}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
