import React from 'react';

import { SnackBar } from '../../SnackBar/SnackBar';
import { EventInterceptorHandler } from '../EventInterceptor';

type SnackBarProps = Parameters<typeof SnackBar>[0];

export const useSnackBarEventsHandler = <P extends SnackBarProps>(
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
