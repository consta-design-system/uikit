import { Group, Lib } from '@consta/stand';
import React from 'react';

import { Theme } from '##/components/Theme';

export const StandPageDecoration: Lib<Group>['standPageDecoration'] = (
  props,
) => {
  return <Theme preset={props.theme}>{props.children}</Theme>;
};
