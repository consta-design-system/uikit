import './HeaderVariants.css';

import { useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { HeaderFullExample } from './examples/HeaderFullExample/HeaderFullExample';
import { HeaderMinifyLoginExample } from './examples/HeaderMinifyLoginExample/HeaderMinifyLoginExample';
import { HeaderWithLogoExample } from './examples/HeaderWithLogoExample/HeaderWithLogoExample';
import { HeaderWithoutMenuExample } from './examples/HeaderWithoutMenuExample/HeaderWithoutMenuExample';
import { HeaderWithoutSearchExample } from './examples/HeaderWithoutSearchExample/HeaderWithoutSearchExample';

const cnHeaderVariants = cn('HeaderVariants');

const types = [
  'Полный',
  'Без поиска',
  'С минилогином',
  'Без меню',
  'С уникальным лого',
] as const;

const getVariant = (type?: typeof types[number]) => {
  if (type === 'Полный') {
    return <HeaderFullExample />;
  }
  if (type === 'Без поиска') {
    return <HeaderWithoutSearchExample />;
  }
  if (type === 'С минилогином') {
    return <HeaderMinifyLoginExample />;
  }
  if (type === 'Без меню') {
    return <HeaderWithoutMenuExample />;
  }
  return <HeaderWithLogoExample />;
};

const Variants = () => {
  const type = useSelect('type', types, types[0]);

  return <div className={cnHeaderVariants()}>{getVariant(type)}</div>;
};

export default Variants;
