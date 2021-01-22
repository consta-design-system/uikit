import React from 'react';

import { EventInterceptorContext } from './EventInterceptor';

type PropsHandler = <T>(componentName: string, props: T, ref?: React.RefObject<HTMLElement>) => T;

export const usePropsHandler: PropsHandler = (componentName, props, ref) => {
  const context = React.useContext(EventInterceptorContext);

  if (!context) {
    return props;
  }

  const { eventHandler, map } = context;
  const propsHandler = map[componentName];

  if (!propsHandler) {
    return props;
  }

  return propsHandler(props, eventHandler, ref);
};
