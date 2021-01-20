import React from 'react';

const eventInterceptorPropComponent = [
  'Button',
  'TextField',
  'Checkbox',
  'SnackBar',
  'Select',
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

export type EventHandler = <T>(
  props: T,
  handler: EventInterceptorHandler,
  ref?: React.RefObject<HTMLElement>,
) => T;
export type EventInterceptorPropMap = {
  [key: string]: EventHandler;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EventInterceptorContext = React.createContext<
  { eventHandler: EventInterceptorHandler; map: EventInterceptorPropMap } | undefined
>(undefined);

const EventInterceptorProvider = ({
  children,
  eventHandler,
  map,
}: {
  children: React.ReactNode;
  eventHandler: EventInterceptorHandler;
  map: EventInterceptorPropMap;
}) => {
  return (
    <EventInterceptorContext.Provider value={{ eventHandler, map }}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
export * from './eventInterceptorMap';
