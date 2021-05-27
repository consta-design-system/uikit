import React from 'react';

import { defaultGetItemLabel, SelectProps } from '../../Select/helpers';
import { cnSelect } from '../../SelectComponents/cnSelect';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useSelectEventsHandler = (
  props: SelectProps,
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
          label: newProps.getItemLabel
            ? newProps.getItemLabel(newProps.value)
            : defaultGetItemLabel(newProps.value),
          value: newProps.value,
          pageURL: window.location.href,
          DOMRef: controlRef.current,
        },
      };
      handler!(value);
    }
  }, [newProps.value]);

  return props;
};
