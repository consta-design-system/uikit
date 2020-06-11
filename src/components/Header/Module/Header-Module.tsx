import './Header-Module.css';

import React from 'react';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { cnHeader } from '../Header';

export type HeaderModulePropIndent = 's' | 'm' | 'l';

type Props = {
  indent?: HeaderModulePropIndent;
};

export type HeaderModuleProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const HeaderModule: React.FC<HeaderModuleProps> = ({
  className,
  children,
  indent,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={cnHeader('Module', { indent }, [className])}>
      {children}
    </div>
  );
};
