import React from 'react';

import { eventInterceptorMap } from './eventInterceptorMap';
import { EventInterceptorComponentName } from './types';

export type EventInterceptorMap = typeof eventInterceptorMap;

export type EventInterceptorProps = {
  component: EventInterceptorComponentName;
  event?: string;
  options: {
    [key: string]: any;
  };
};

export type EventInterceptorHandler =
  | ((props: EventInterceptorProps) => void)
  | undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EventInterceptorContext = React.createContext<
  | { eventHandler: EventInterceptorHandler; map: EventInterceptorMap }
  | undefined
>(undefined);

const EventInterceptorProvider = ({
  children,
  eventHandler,
  map,
}: {
  children: React.ReactNode;
  eventHandler: EventInterceptorHandler;
  map: EventInterceptorMap;
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EventInterceptorContext.Provider value={{ eventHandler, map }}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
export * from './eventInterceptorMap';
