import './LoaderExampleSize.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Loader, LoaderPropSize } from '../../../Loader';

const cnLoaderExampleSize = cn('LoaderExampleSize');

const sizes: LoaderPropSize[] = ['m', 's', 'xs'];

export const LoaderExampleSize = () => (
  <Example
    items={sizes}
    getItemDescription={(size) => `size="${size}"`}
    getItemNode={(size) => <Loader size={size} />}
    className={cnLoaderExampleSize()}
  />
);
