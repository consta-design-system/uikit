import './LoaderExampleSize.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Loader } from '../../../Loader';

const cnLoaderExampleSize = cn('LoaderExampleSize');

export const LoaderExampleSize = () => (
  <Example className={cnLoaderExampleSize()}>
    <Loader size="m" />
    <Loader size="s" />
  </Example>
);
