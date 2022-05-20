import React from 'react';

import { cn } from '../../../utils/bem';
import { PortalMenuNavigationProps } from '../types';

import { PortalMenuNavigationItem } from './PortalMenuNavigationItem/PortalMenuNavigationItem';

const cnPortalMenuNavigation = cn('PortalMenuNavigation');

export const PortalMenuNavigation = <ITEM,>(props: PortalMenuNavigationProps<ITEM>) => {
  const { navigation, onNavigationClick, className, ...getters } = props;

  const handleClick = (e: React.MouseEvent, item: ITEM) => {
    onNavigationClick?.({ e, item });
  };

  return (
    <div className={cnPortalMenuNavigation(null, [className])}>
      {navigation?.map((item) => (
        <PortalMenuNavigationItem item={item} {...getters} onClick={(e) => handleClick(e, item)} />
      ))}
    </div>
  );
};
