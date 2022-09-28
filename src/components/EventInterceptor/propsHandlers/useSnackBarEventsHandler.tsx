import React from 'react';

import { SnackBarItemDefault, SnackBarProps } from '../../SnackBar/types';
import { EventInterceptorHandler } from '../EventInterceptor';

export const useSnackBarEventsHandler = <
  P extends SnackBarProps<SnackBarItemDefault>,
>(
  props: P,
  handler: EventInterceptorHandler,
): P => {
  const newProps: P = { ...props };

  React.useEffect(() => {
    if (newProps.items.length) {
      const value = {
        component: 'SnackBar' as const,
        event: 'change',
        options: {
          pageURL: window.location.href,
          DOMRef: document.getElementsByClassName('SnackBar')[0],
          items: newProps.items,
          props: newProps,
        },
      };

      handler!(value);
    }
  }, [newProps.items.length]);

  return newProps;
};
