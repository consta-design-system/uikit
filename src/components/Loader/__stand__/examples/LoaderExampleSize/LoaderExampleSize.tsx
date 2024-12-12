import { Example } from '@consta/stand';
import React from 'react';

import { Loader } from '../../../Loader';
import { LoaderPropSize, LoaderPropType, LoaderPropView } from '../../../types';

const sizes: LoaderPropSize[] = ['m', 's', 'xs'];
const types: LoaderPropType[] = ['dots', 'circle'];
const views: LoaderPropView[] = ['primary', 'clear'];

export const LoaderExampleSize = () => (
  <Example
    items={sizes}
    getItemNode={(size) => <Loader size={size} />}
    getItemDescription={(size) => `size="${size}"`}
  />
);

export const LoaderExampleType = () => (
  <Example
    items={types}
    getItemNode={(type) => <Loader type={type} />}
    getItemDescription={(type) => `type="${type}"`}
  />
);

export const LoaderExampleView = () => (
  <Example
    items={views}
    getItemNode={(view) => <Loader view={view} />}
    getItemDescription={(view) => `view="${view}"`}
  />
);
