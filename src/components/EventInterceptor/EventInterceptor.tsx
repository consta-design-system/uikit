import React from 'react';

import { eventInterceptorMap } from './eventInterceptorMap';

const DATA_ANALYTIC_PREFIX = 'data-analytic-';

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

export const getDataAnalyticsAttribute = (props: any) => {
  const dataAnalyticAttributes: {
    [key: string]: any;
  } = {};

  Object.keys(props).forEach(function(key) {
    if (key.includes(DATA_ANALYTIC_PREFIX)) {
      const value = props[key];
      dataAnalyticAttributes[key] = value;
    }
  });
  return dataAnalyticAttributes;
};

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
