import { buttonEventHandler } from './propsHandlers/buttonEventHandler';
import { EventInterceptorHandler } from './EventInterceptor';

type EventHandler = <T>(props: T, handler: EventInterceptorHandler) => T;
export type EventInterceptorPropMap = {
  [key: string]: EventHandler;
};

export const map: EventInterceptorPropMap = {
  Button: buttonEventHandler as EventHandler,
};
