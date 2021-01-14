import React from 'react';

import { EventInterceptorPropMap, map as mapDefault } from './eventInterceptorMap';

const eventInterceptorPropComponent = [
  'Button',
  'TextField',
  'Checkbox',
  'SnackBar',
  'BasicSelect',
] as const;
export type EventInterceptorPropComponent = typeof eventInterceptorPropComponent[number];

export type EventInterceptorProps = {
  component: EventInterceptorPropComponent;
  event?: string;
  options: {
    [key: string]: any;
  };
};

export type EventInterceptorHandler = ((props: EventInterceptorProps) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EventInterceptorContext = React.createContext<
  { eventHandler: EventInterceptorHandler; map: EventInterceptorPropMap } | undefined
>(undefined);

const EventInterceptorProvider = ({
  children,
  eventHandler,
  map = mapDefault,
}: {
  children: React.ReactNode;
  eventHandler: EventInterceptorHandler;
  map?: EventInterceptorPropMap;
}) => {
  return (
    <EventInterceptorContext.Provider value={{ eventHandler, map }}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
