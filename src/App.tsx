import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { Pages } from '##/containers/Pages';
import { Menu } from '##/containers/Menu';

export const App: React.FC = () => {
  return (
    <DocLayout leftSide={<Menu />}>
      <Pages />
    </DocLayout>
  );
};
