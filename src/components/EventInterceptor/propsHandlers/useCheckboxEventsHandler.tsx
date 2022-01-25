import React from 'react';

import { Checkbox } from '../../Checkbox/Checkbox';
import { EventInterceptorHandler } from '../EventInterceptor';

type CheckboxProps = Parameters<typeof Checkbox>[0];

export const useCheckboxEventsHandler = <P extends CheckboxProps>(
  props: P,
  handler: EventInterceptorHandler,
  ref: React.RefObject<HTMLLabelElement>,
): P => {
  const newProps: P = { ...props };

  newProps.onChange = (...onChangeArgs) => {
    const [{ checked }] = onChangeArgs;
    const value = {
      component: 'Checkbox' as const,
      event: 'change',
      options: {
        label: newProps.label,
        checked,
        pageURL: window.location.href,
        DOMRef: ref.current,
        props: newProps,
      },
    };
    handler!(value);

    return props.onChange?.(...onChangeArgs);
  };

  return newProps;
};
