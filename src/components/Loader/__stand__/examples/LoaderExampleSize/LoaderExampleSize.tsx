import { Example } from '@consta/stand';
import React from 'react';

import { Loader } from '../../../Loader';
import { LoaderPropSize } from '../../../types';

const sizes: LoaderPropSize[] = ['m', 's', 'xs'];

export const LoaderExampleSize = () => (
  <Example
    items={sizes}
    getItemNode={(size) => <Loader size={size} />}
    getItemDescription={(size) => `size="${size}"`}
  />
);
