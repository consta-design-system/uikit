import React from 'react';

import { menuMdxAtom } from '##/modules/menuMdx';
import { useAtom } from '@reatom/react';

export const RightMenu = () => {
  const [menuNode] = useAtom(menuMdxAtom);

  if (menuNode) {
    return <div>{menuNode}</div>;
  }

  return null;
};
