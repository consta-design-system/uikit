import React from 'react';

import { Props } from '../../Button/Button';
import { EventInterceptorHandler } from '../EventInterceptor';

export type ButtonProps = Props;

export const useButtonEventHandler = <T extends ButtonProps>(
  props: T,
  handler: EventInterceptorHandler,
  ref: React.RefObject<HTMLElement>,
): T => {
  const newProps: T = { ...props };

  newProps.onClick = (...onClickArgs) => {
    const [e] = onClickArgs;
    const value = {
      component: 'Button' as const,
      event: e.type,
      options: {
        text: (e.currentTarget as HTMLButtonElement).innerText,
        pageURL: e.currentTarget.baseURI,
        DOMRef: ref.current,
        props: newProps,
      },
    };
    handler!(value);

    return props.onClick?.(...onClickArgs);
  };

  return newProps;
};
