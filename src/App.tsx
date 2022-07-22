import React from 'react';

import { DocLayout } from '##/componets/DocLayout';
import { Header } from '##/containers/Header';
import { Menu } from '##/containers/Menu';
import { Pages } from '##/containers/Pages';
import { SideLinks } from '##/containers/SideLinks';

export const App: React.FC = () => (
  <DocLayout leftSide={<Menu />} rightSide={<SideLinks />} header={<Header />}>
    <Pages />
  </DocLayout>
);
