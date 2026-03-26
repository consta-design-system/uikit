import { Group, Lib } from '@consta/stand';
import { connectLogger, log } from '@reatom/core';
import React, { StrictMode } from 'react';

import { Theme } from '##/components/Theme';

// connectLogger();

// declare global {
//   var LOG: typeof log;
// }

// globalThis.LOG = log;

export const StandPageDecoration: Lib<Group>['standPageDecoration'] = (
  props,
) => {
  const content = <Theme preset={props.theme}>{props.children}</Theme>;
  // if (process.env.NODE_ENV === 'development') {
  //   return <StrictMode>{content}</StrictMode>;
  // }

  return content;
};
