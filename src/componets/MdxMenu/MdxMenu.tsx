import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAction } from '@reatom/react';
import React, { useEffect } from 'react';

import { menuMdxAtom } from '##/modules/menuMdx';

export const MdxMenu: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const setMenu = useAction(menuMdxAtom.set);
  const breakpoints = useBreakpoints({ xl: 1690 });

  useEffect(() => {
    setMenu(children);
    return () => {
      setMenu(undefined);
    };
  }, []);

  if (breakpoints.xl) {
    return null;
  }

  return children as React.ReactElement;
};
