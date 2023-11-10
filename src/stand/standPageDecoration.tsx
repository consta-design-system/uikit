import { Group, Lib } from '@consta/stand';
import React, { StrictMode } from 'react';

import { Theme } from '##/components/Theme';

export const StandPageDecoration: Lib<Group>['standPageDecoration'] = (
  props,
) => {
  return (
    <StrictMode>
      <Theme preset={props.theme}>{props.children}</Theme>
    </StrictMode>
  );
};
