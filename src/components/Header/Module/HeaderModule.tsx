import './HeaderModule.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';

export const cnHeaderModule = cn('HeaderModule');
const headerModulePropIndent = ['s', 'm', 'l'] as const;

export type HeaderModulePropIndent = typeof headerModulePropIndent[number];

type HeaderModuleProps = PropsWithJsxAttributes<
  {
    indent?: HeaderModulePropIndent;
  },
  'div'
>;

export const HeaderModule: React.FC<HeaderModuleProps> = ({
  className,
  children,
  indent,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={cnHeaderModule({ indent }, [className])}>
      {children}
    </div>
  );
};
