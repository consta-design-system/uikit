import { Group, Lib } from '@consta/stand';
import React, { StrictMode } from 'react';

export const StandPageDecoration: Lib<Group>['standPageDecoration'] = (
  props,
) => {
  if (process.env.NODE_ENV === 'development') {
    return <StrictMode>{props.children}</StrictMode>;
  }

  return <>props.children</>;
};
