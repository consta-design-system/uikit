import React, { useCallback, useEffect } from 'react';
import { cn } from '##/utils/bem';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { menuMdxAtom } from '##/modules/menuMdx';
import { useAction } from '@reatom/react';

const cnMdxMenu = cn('MdxMenu');

export const MdxMenu: React.FC<PropsWithHTMLAttributes<{}, HTMLDivElement>> = ({
  className,
  children,
  ...otherProps
}) => {
  const setMenuMdxAtom = useAction(menuMdxAtom.set);

  useEffect(() => {
    setMenuMdxAtom(children);
    return () => {
      setMenuMdxAtom(undefined);
    };
  }, []);

  return (
    <div {...otherProps} className={cnMdxMenu(null, [className])}>
      {children}
    </div>
  );
};
