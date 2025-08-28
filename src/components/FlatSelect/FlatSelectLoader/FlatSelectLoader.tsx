import './FlatSelectLoader.css';

import { Loader } from '@consta/uikit/Loader';
import React from 'react';

import { cnCanary as cn } from '##/utils/bem';

export const cnSelectLoader = cn('SelectLoader');

export const SelectLoader = () => {
  return (
    <div className={cnSelectLoader()}>
      <Loader className={cnSelectLoader('Loader')} size="s" />
    </div>
  );
};
