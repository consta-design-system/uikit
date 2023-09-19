import './HeaderLogo.css';

import React from 'react';

import { AsTags } from '##/utils/types/AsTags';

import { cn } from '../../../utils/bem';
import { PropsWithAsAttributes } from '../../../utils/types/PropsWithAsAttributes';

export const cnHeaderLogo = cn('HeaderLogo');

export type HeaderProps<As extends AsTags> = PropsWithAsAttributes<{}, As>;

export const HeaderLogo = <As extends AsTags = 'div'>(
  props: HeaderProps<As>,
): React.ReactElement => {
  const { children, as = 'div', className, ...otherProps } = props;
  const Tag = as as string;
  return (
    <Tag className={cnHeaderLogo(null, [className])} {...otherProps}>
      {children}
    </Tag>
  );
};
