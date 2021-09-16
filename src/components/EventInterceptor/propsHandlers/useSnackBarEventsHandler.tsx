import React from 'react';

import { COMPONENT_NAME, SnackBar } from '../../SnackBar/SnackBar';
import { EventInterceptorHandler } from '../EventInterceptor';

type SnackBarProps = Parameters<typeof SnackBar>[0];

export const useSnackBarEventsHandler = <P extends SnackBarProps>(
  props: P,
  handler: EventInterceptorHandler,
  ref?: React.Ref<HTMLElement>,
): P => {
  const newProps: P = { ...props };

  React.useEffect(() => {
    if (newProps.items.length) {
      const value = {
        component: COMPONENT_NAME,
        event: 'change',
        options: {
          pageURL: window.location.href,
          DOMRef: document.getElementsByClassName(COMPONENT_NAME)[0] || ref,
          items: newProps.items,
        },
      };

      handler!(value);
    }
  }, [newProps.items.length]);

  return newProps;
};
