import React from 'react';

import { eventInterceptorMap } from './eventInterceptorMap';

export type EventInterceptorMap = typeof eventInterceptorMap;
export type EventInterceptorMapKeys = keyof EventInterceptorMap;

export type EventInterceptorProps = {
  component: EventInterceptorMapKeys;
  event?: string;
  options: {
    [key: string]: any;
  };
};

export type EventInterceptorHandler = ((props: EventInterceptorProps) => void) | undefined;

// export type EventHandler = <T>(
//   props: T,
//   handler: EventInterceptorHandler,
//   ref?: React.RefObject<HTMLElement>,
// ) => T;
// export type EventInterceptorPropMap = {
//   [key: string]: EventHandler;
// };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EventInterceptorContext = React.createContext<
  { eventHandler: EventInterceptorHandler; map: EventInterceptorMap } | undefined
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
    <EventInterceptorContext.Provider value={{ eventHandler, map }}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
export * from './eventInterceptorMap';
