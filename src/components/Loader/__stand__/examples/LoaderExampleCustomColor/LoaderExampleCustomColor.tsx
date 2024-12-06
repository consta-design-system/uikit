import './LoaderExampleCustomColor.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Loader } from '../../../Loader';

const cnLoaderExampleCustomColor = cn('LoaderExampleCustomColor');

export const LoaderExampleCustomColor = () => (
  <Example>
    <Loader type="circle" className={cnLoaderExampleCustomColor()} />
  </Example>
);
