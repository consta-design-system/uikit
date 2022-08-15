import './SelectLoader.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Loader } from '../../Loader/Loader';
import { defaultPropSize, PropSize } from '../types';

type Props = {
  mode?: 'empty' | 'blur';
  size?: PropSize;
};

export const cnSelectLoader = cn('SelectLoader');

export const SelectLoader = (props: Props) => {
  const { mode = 'empty', size = defaultPropSize } = props;

  return (
    <div className={cnSelectLoader({ mode, size })}>
      <Loader className={cnSelectLoader('Loader')} size="s" />
    </div>
  );
};
