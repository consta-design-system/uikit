import { Example } from '@consta/stand';
import React from 'react';

import { iconPropView } from '../../../../Icon';
import { IconBag } from '../../../../IconBag/IconBag';

const views = [...iconPropView];

export const IconExampleView = () => (
  <Example
    col={{ 1: 0, 2: 320, 3: 500, 4: 700, 5: 890 }}
    items={views}
    separately
    getItemNode={(view) => <IconBag view={view} />}
    getItemDescription={(view) => `view="${view}"`}
  />
);
