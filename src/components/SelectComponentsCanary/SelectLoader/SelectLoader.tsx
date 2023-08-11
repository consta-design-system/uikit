import './SelectLoader.css';

import React from 'react';

import { Loader } from '##/components/Loader';
import { cnCanary } from '##/utils/bem';

export const cnSelectLoader = cnCanary('SelectLoader');

export const SelectLoader = () => {
  return (
    <div className={cnSelectLoader()}>
      <Loader className={cnSelectLoader('Loader')} size="s" />
    </div>
  );
};
