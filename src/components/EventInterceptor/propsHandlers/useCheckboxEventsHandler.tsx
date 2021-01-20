import React from 'react';

import { CheckboxProps, cnCheckbox } from '../../Checkbox/Checkbox';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useCheckboxEventsHandler = (
  props: CheckboxProps,
  handler: EventInterceptorHandler,
  checkboxRef: React.RefObject<HTMLLabelElement>,
) => {
  const newProps = { ...props };

  newProps.onChange = (...onChangeArgs) => {
    const [{ checked }] = onChangeArgs;
    const value = {
      component: cnCheckbox() as EventInterceptorPropComponent,
      event: 'change',
      options: {
        label: newProps.label,
        checked,
        pageURL: window.location.href,
        DOMRef: checkboxRef.current,
      },
    };
    handler!(value);

    return props.onChange?.(...onChangeArgs);
  };

  return newProps;
};
