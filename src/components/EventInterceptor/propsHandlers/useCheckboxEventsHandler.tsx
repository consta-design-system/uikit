import React from 'react';

import { CheckboxProps, cnCheckbox } from '../../Checkbox/Checkbox';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useCheckboxEventsHandler = (
  props: CheckboxProps,
  handler: EventInterceptorHandler,
) => {
  const newProps = { ...props };

  React.useEffect(() => {
    const value = {
      component: cnCheckbox() as EventInterceptorPropComponent,
      event: 'change',
      options: {
        label: newProps.label,
        checked: newProps.checked,
        pageURL: window.location.href,
        DOMRef: document.getElementsByClassName(cnCheckbox())[0],
      },
    };
    handler!(value);
  }, [newProps.checked]);

  return newProps;
};
