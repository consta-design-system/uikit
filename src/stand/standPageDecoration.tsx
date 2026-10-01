import { Group, Lib } from '@consta/stand';
import React, { StrictMode } from 'react';

// import { Theme } from '##/components/Theme';

export const StandPageDecoration: Lib<Group>['standPageDecoration'] = (
  props,
) => {
  // const content = <Theme preset={props.theme}>{props.children}</Theme>;

  const content = props.children;
  if (process.env.NODE_ENV === 'development') {
    return <StrictMode>{content}</StrictMode>;
  }

  return <>content</>;
};
