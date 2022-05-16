import React from 'react';
import './AppTheme.css';

import { cn } from '##/utils/bem';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

const cnAppTheme = cn('AppTheme');

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  return (
    <Theme className={cnAppTheme()} preset={presetGpnDefault}>
      {props.children}
    </Theme>
  );
};
