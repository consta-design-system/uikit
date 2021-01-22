import React from 'react';

import { cnTextField, TextFieldProps } from '../../TextField/TextField';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export const useTextFieldEventsHandler = (
  props: TextFieldProps,
  handler: EventInterceptorHandler,
  textFieldRef: React.RefObject<HTMLDivElement>,
) => {
  const [inputChanged, setInputChanged] = React.useState<boolean>(false);
  const newProps = { ...props };

  React.useEffect(() => {
    setInputChanged(true);
  }, [newProps.value]);

  newProps.onFocus = (...onfocusArgs) => {
    setInputChanged(false);

    return props.onFocus?.(...onfocusArgs);
  };

  newProps.onBlur = (...onBlurArgs) => {
    const value = {
      component: cnTextField() as EventInterceptorPropComponent,
      event: 'change',
      options: {
        placeholder: newProps.placeholder,
        pageURL: window.location.href,
        DOMRef: textFieldRef.current,
        value: newProps.value,
      },
    };
    if (inputChanged) {
      handler!(value);
    }

    return props.onBlur?.(...onBlurArgs);
  };

  return newProps;
};
