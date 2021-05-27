import { useButtonEventHandler } from './propsHandlers/useButtonEventHandler';
import { useCheckboxEventsHandler } from './propsHandlers/useCheckboxEventsHandler';
import { useSelectEventsHandler } from './propsHandlers/useSelectEventsHandler';
import { useSnackBarEventsHandler } from './propsHandlers/useSnackBarEventsHandler';
import { useTextFieldEventsHandler } from './propsHandlers/useTextFieldEventsHandler';
import { EventHandler, EventInterceptorPropMap } from './EventInterceptor';

export const eventInterceptorMap: EventInterceptorPropMap = {
  Button: useButtonEventHandler as EventHandler,
  TextField: useTextFieldEventsHandler as EventHandler,
  Checkbox: useCheckboxEventsHandler as EventHandler,
  SnackBar: useSnackBarEventsHandler as EventHandler,
  Select: useSelectEventsHandler as EventHandler,
};
