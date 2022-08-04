import React, { useMemo } from 'react';

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
  const value = useMemo(() => ({ eventHandler, map }), [eventHandler, map]);

  return (
    <EventInterceptorContext.Provider value={value}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
export * from './eventInterceptorMap';
