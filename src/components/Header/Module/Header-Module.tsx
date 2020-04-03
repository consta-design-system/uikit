import './Header-Module.css';

import React from 'react';
import { cnHeader } from '../Header';

export type HeaderModulePropIndent = 's' | 'm' | 'l';

export type HeaderModuleProps = {
  indent?: HeaderModulePropIndent;
  as?: React.ElementType;
};

export type IHeaderModule = HeaderModuleProps &
  (Omit<React.HTMLAttributes<Element>, keyof HeaderModuleProps>);

export const HeaderModule: React.FC<IHeaderModule> = ({ children, indent }) => {
  return <div className={cnHeader('module', { indent })}>{children}</div>;
};
