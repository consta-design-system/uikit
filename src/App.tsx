import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { Pages } from '##/containers/Pages';
import { Menu } from '##/containers/Menu';
import { RightMenu } from '##/containers/RightMenu';

export const App: React.FC = () => {
  return (
    <DocLayout leftSide={<Menu />} rightSide={<RightMenu />}>
      <Pages />
    </DocLayout>
  );
};
