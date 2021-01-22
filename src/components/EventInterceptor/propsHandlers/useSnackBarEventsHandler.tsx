import React from 'react';

import { cnSnackBar, SnackBarProps } from '../../SnackBar/SnackBar';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useSnackBarEventsHandler = (
  props: SnackBarProps,
  handler: EventInterceptorHandler,
) => {
  const newProps = { ...props };

  React.useEffect(() => {
    if (newProps.items.length) {
      const value = {
        component: cnSnackBar() as EventInterceptorPropComponent,
        event: 'change',
        options: {
          pageURL: window.location.href,
          DOMRef: document.getElementsByClassName(cnSnackBar())[0],
          items: newProps.items,
        },
      };

      handler!(value);
    }
  }, [newProps.items.length]);

  return newProps;
};
