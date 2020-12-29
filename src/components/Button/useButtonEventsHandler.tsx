import React from 'react';

import {
  EventInterceptorContext,
  EventInterceptorPropComponent,
} from '../../EventInterceptor/EventInterceptor';
import { PropsWithAsAttributes } from '../../utils/types/PropsWithAsAttributes';

import { Props } from './Button';

export const useButtonEventsHandler = <As extends keyof JSX.IntrinsicElements = 'button'>(
  props: PropsWithAsAttributes<Props, As>,
) => {
  const eventInterceptor = React.useContext(EventInterceptorContext);
  const newProps: PropsWithAsAttributes<Props, As> = { ...props };
  newProps.onClick = (...onClickArgs) => {
    const [e] = onClickArgs;
    const value = {
      component: 'Button' as EventInterceptorPropComponent,
      event: e.type,
      options: {
        text: (e.currentTarget as HTMLButtonElement).innerText,
        pageURL: e.currentTarget.baseURI,
        DOMRef: e.currentTarget,
      },
    };
    eventInterceptor(value);

    return props.onClick?.(...onClickArgs);
  };

  return newProps;
};
