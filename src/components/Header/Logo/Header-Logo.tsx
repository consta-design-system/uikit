import './Header-Logo.css';

import React from 'react';

import { PropsWithAsAttributes } from '../../../utils/types/PropsWithAsAttributes';
import { cnHeader } from '../Header';

export type HeaderProps<As extends keyof JSX.IntrinsicElements> = PropsWithAsAttributes<{}, As>;

export function HeaderLogo<As extends keyof JSX.IntrinsicElements = 'div'>(
  props: HeaderProps<As>,
): React.ReactElement | null {
  const { children, as = 'div', className, ...otherProps } = props;
  const Tag = as as string;
  return (
    <Tag className={cnHeader('Logo', [className])} {...otherProps}>
      {children}
    </Tag>
  );
}
