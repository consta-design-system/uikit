import React from 'react';

import { SimpleSelectProps } from '../../BasicSelect/BasicSelect';
import { cnSelect } from '../../SelectComponents/cnSelect';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useBasicSelectEventsHandler = (
  props: SimpleSelectProps<unknown>,
  handler: EventInterceptorHandler,
  controlRef: React.RefObject<HTMLDivElement | null>,
) => {
  const newProps = { ...props };

  React.useEffect(() => {
    if (newProps.value) {
      const value = {
        component: cnSelect() as EventInterceptorPropComponent,
        event: 'change',
        options: {
          placeholder: newProps.placeholder,
          label: newProps.getOptionLabel(newProps.value),
          value: newProps.value,
          pageURL: window.location.href,
          DOMRef: controlRef.current,
        },
      };
      handler!(value);
    }
  }, [newProps.value]);

  return newProps;
};
