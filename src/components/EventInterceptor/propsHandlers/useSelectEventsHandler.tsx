import React, { useEffect } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { defaultGetItemLabel, SelectProps } from '../../Select/helpers';
import { EventInterceptorHandler } from '../EventInterceptor';

export const useSelectEventsHandler = <PROPS extends SelectProps>(
  props: PROPS,
  handler: EventInterceptorHandler,
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  const newProps: PROPS = { ...props };
  const [valueChanged, setValueChanged] = useFlag();

  useEffect(() => {
    setValueChanged.on();
  }, [newProps.value]);

  newProps.onFocus = (...onfocusArgs) => {
    setValueChanged.off();
    return props.onFocus?.(...onfocusArgs);
  };

  newProps.onBlur = (...onBlurArgs) => {
    const value = {
      component: 'Select' as const,
      event: 'change',
      options: {
        placeholder: newProps.placeholder,
        label: newProps.value
          ? (newProps.getItemLabel ?? defaultGetItemLabel)(newProps.value)
          : undefined,
        value: newProps.value,
        pageURL: window.location.href,
        DOMRef: ref.current,
        props: newProps,
      },
    };
    valueChanged && handler!(value);
    return props.onBlur?.(...onBlurArgs);
  };

  return newProps;
};
