import { Example } from '@consta/stand';
import React from 'react';

import { Loader } from '../../../LoaderCanary';
import { LoaderPropSize } from '../../../types';

const sizes: LoaderPropSize[] = ['s', 'm'];

export const LoaderExampleSize = () => (
  <Example
    items={sizes}
    getItemNode={(size) => <Loader size={size} />}
    getItemDescription={(size) => `size="${size}"`}
  />
);
