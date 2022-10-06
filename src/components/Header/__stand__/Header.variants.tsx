import './HeaderVariants.css';

import React from 'react';

import { Text } from '##/components/Text/Text';
import { cn } from '##/utils/bem';

import { HeaderFullExample } from './examples/HeaderFullExample/HeaderFullExample';
import { HeaderMinifyLoginExample } from './examples/HeaderMinifyLoginExample/HeaderMinifyLoginExample';
import { HeaderWithLogoExample } from './examples/HeaderWithLogoExample/HeaderWithLogoExample';
import { HeaderWithoutMenuExample } from './examples/HeaderWithoutMenuExample/HeaderWithoutMenuExample';
import { HeaderWithoutSearchExample } from './examples/HeaderWithoutSearchExample/HeaderWithoutSearchExample';

const cnHeaderVariants = cn('HeaderVariants');

const Variants = () => {
  return (
    <div className={cnHeaderVariants()}>
      <Text size="3xl" lineHeight="l">
        Полный
      </Text>
      <HeaderFullExample />
      <Text size="3xl" lineHeight="l">
        Без поиска
      </Text>
      <HeaderWithoutSearchExample />
      <Text size="3xl" lineHeight="l">
        С минилогином
      </Text>
      <HeaderMinifyLoginExample />
      <Text size="3xl" lineHeight="l">
        Без меню
      </Text>
      <HeaderWithoutMenuExample />
      <Text size="3xl" lineHeight="l">
        С уникальным лого
      </Text>
      <HeaderWithLogoExample />
    </div>
  );
};

export default Variants;
