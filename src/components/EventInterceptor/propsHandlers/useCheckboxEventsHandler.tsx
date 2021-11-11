import React from 'react';

import { Checkbox, COMPONENT_NAME } from '../../Checkbox/Checkbox';
import { EventInterceptorHandler, getDataAnalyticsAttribute } from '../EventInterceptor';

type CheckboxProps = Parameters<typeof Checkbox>[0];

export const useCheckboxEventsHandler = <P extends CheckboxProps>(
  props: P,
  handler: EventInterceptorHandler,
  checkboxRef: React.RefObject<HTMLLabelElement>,
): P => {
  const newProps: P = { ...props };

  newProps.onChange = (...onChangeArgs) => {
    const [{ checked }] = onChangeArgs;
    const value = {
      component: COMPONENT_NAME,
      event: 'change',
      options: {
        label: newProps.label,
        checked,
        pageURL: window.location.href,
        DOMRef: checkboxRef.current,
        dataAnalyticAttributes: getDataAnalyticsAttribute(newProps),
      },
    };
    handler!(value);

    return props.onChange?.(...onChangeArgs);
  };

  return newProps;
};
