import React from 'react';

import { EventInterceptorContext, EventInterceptorMapKeys } from './EventInterceptor';

export const usePropsHandler = <PROPS extends {}>(
  componentName: EventInterceptorMapKeys,
  props: PROPS,
  ref?: React.Ref<HTMLElement>,
): PROPS => {
  const context = React.useContext(EventInterceptorContext);

  if (!context) {
    return props;
  }

  const { eventHandler, map } = context;
  const propsHandler = map[componentName] as ((...args: any[]) => any) | undefined;

  if (!propsHandler) {
    return props;
  }

  return propsHandler(props, eventHandler, ref) as PROPS;
};
