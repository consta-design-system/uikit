import React from 'react';

import { defaultGetItemLabel, SelectProps } from '../../Select/helpers';
import { EventInterceptorHandler } from '../EventInterceptor';

export const useSelectEventsHandler = <PROPS extends SelectProps>(
  props: PROPS,
  handler: EventInterceptorHandler,
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  const newProps: PROPS = { ...props };

  React.useEffect(() => {
    if (newProps.value) {
      const value = {
        component: 'Select' as const,
        event: 'change',
        options: {
          placeholder: newProps.placeholder,
          label: newProps.getItemLabel
            ? newProps.getItemLabel(newProps.value)
            : defaultGetItemLabel(newProps.value),
          value: newProps.value,
          pageURL: window.location.href,
          DOMRef: ref.current,
          props: newProps,
        },
      };
      handler!(value);
    }
  }, [newProps.value]);

  return props as PROPS;
};
