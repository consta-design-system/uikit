import React, { useEffect } from 'react';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { menuMdxAtom } from '##/modules/menuMdx';
import { useAction } from '@reatom/react';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';

export const MdxMenu: React.FC<PropsWithHTMLAttributes<{}, HTMLDivElement>> = ({
  className,
  children,
  ...otherProps
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

  return <>{children}</>;
};
