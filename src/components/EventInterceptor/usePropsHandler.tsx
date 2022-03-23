import React from 'react';

import { EventInterceptorContext } from './EventInterceptor';
import { EventInterceptorComponentName } from './types';

export const usePropsHandler = <PROPS extends {}>(
  componentName: EventInterceptorComponentName,
  props: PROPS,
  ref?: React.Ref<HTMLElement>,
): PROPS => {
  const context = React.useContext(EventInterceptorContext);

  if (!context) {
    return props;
  }

  const { eventHandler, map } = context;
  const propsHandler = map[componentName];

  if (!propsHandler) {
    return props;
  }

  return propsHandler(props, eventHandler, ref) as PROPS;
};
