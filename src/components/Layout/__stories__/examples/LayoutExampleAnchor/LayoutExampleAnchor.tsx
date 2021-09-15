import './LayoutExampleAnchor.css';

import React, { useRef } from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { Layout } from '../../../Layout';

const cnLayoutExampleAnchor = cn('LayoutExampleAnchor');

export const LayoutExampleAnchor = () => {
  const anchorRef = useRef(null);

  return (
    <div ref={anchorRef} className={cnLayoutExampleAnchor()}>
      <Layout className={cnLayoutExampleAnchor('Header')}>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="column" className={cnLayoutExampleAnchor('Container')}>
        <Layout
          fixed
          anchorRef={anchorRef}
          verticalAlign="top"
          className={cnLayoutExampleAnchor('FixedBlock')}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout className={cnLayoutExampleAnchor('Content')}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </div>
  );
};
