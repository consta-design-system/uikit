import './Layout.variants.css';

import { useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import {
  Layout,
  layoutPropDirection,
  layoutPropDirectionDefault,
} from '../Layout';

const cnLayoutVariants = cn('LayoutVariants');

const flexArray = ['1', '2', '3', '4', '5', '6'];

const Variants = () => {
  const direction = useSelect(
    'Direction',
    layoutPropDirection,
    layoutPropDirectionDefault,
  );
  const flexBlock1 = useSelect('Flex Block 1', flexArray, '1');
  const flexBlock2 = useSelect('Flex Block 2', flexArray, '1');

  return (
    <Layout direction="column" className={cnLayoutVariants()}>
      <Layout className={cnLayoutVariants('Header')}>
        <Text>Шапка</Text>
      </Layout>
      <Layout
        direction={direction}
        className={cnLayoutVariants('Content', { direction })}
      >
        <Layout className={cnLayoutVariants('Block')} flex={Number(flexBlock1)}>
          <Text>Контент</Text>
        </Layout>
        <Layout className={cnLayoutVariants('Block')} flex={Number(flexBlock2)}>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Variants;
