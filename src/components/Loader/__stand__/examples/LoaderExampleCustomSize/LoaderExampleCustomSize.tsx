import './LoaderExampleCustomSize.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Loader } from '../../../Loader';

const cnLoaderExampleCustomSize = cn('LoaderExampleCustomSize');

export const LoaderExampleCustomSize = () => (
  <Example col={1}>
    <Loader className={cnLoaderExampleCustomSize()} />
  </Example>
);
