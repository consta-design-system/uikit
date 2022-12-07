import './ListLoader.css';

import React from 'react';

import { Loader } from '##/components/Loader';
import { cn } from '##/utils/bem';

import { ListPropSize } from '../types';

const cnListLoader = cn('ListLoader');

export const ListLoader: React.FC<{ size: ListPropSize }> = ({ size }) => {
  return (
    <div className={cnListLoader({ size })}>
      <div className={cnListLoader('Container')}>
        <Loader size="s" className={cnListLoader('Loader')} />
      </div>
    </div>
  );
};
