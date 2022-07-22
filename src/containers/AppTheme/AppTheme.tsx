import './AppTheme.css';

import { Theme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/react';
import React from 'react';

import { themeAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnAppTheme = cn('AppTheme');

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  const [theme] = useAtom(themeAtom);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
