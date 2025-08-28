import './FlatSelectLoader.css';

import React from 'react';

import { Loader } from '##/components/Loader';
import { cn } from '##/utils/bem';

export const cnFlatSelectLoader = cn('FlatSelectLoader');

export const FlatSelectLoader = () => {
  return (
    <div className={cnFlatSelectLoader()}>
      <Loader className={cnFlatSelectLoader('Loader')} size="s" />
    </div>
  );
};
