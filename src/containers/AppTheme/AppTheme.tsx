import React from 'react';
import './AppTheme.css';

import { cn } from '##/utils/bem';

import { Theme } from '@consta/uikit/Theme';

const cnAppTheme = cn('AppTheme');

import { themeAtom } from '##/modules/theme';
import { useAtom } from '@reatom/react';

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  const [theme] = useAtom(themeAtom);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
