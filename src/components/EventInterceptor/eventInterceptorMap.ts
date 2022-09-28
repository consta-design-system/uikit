import { useButtonEventHandler } from './propsHandlers/useButtonEventHandler';
import { useCheckboxEventsHandler } from './propsHandlers/useCheckboxEventsHandler';
import { useSelectEventsHandler } from './propsHandlers/useSelectEventsHandler';
import { useSnackBarEventsHandler } from './propsHandlers/useSnackBarEventsHandler';
import { useTextFieldEventsHandler } from './propsHandlers/useTextFieldEventsHandler';
import { EventInterceptorComponentName } from './types';

export const eventInterceptorMap: Partial<
  Record<EventInterceptorComponentName, ((...args: any[]) => any) | undefined>
> = {
  Button: useButtonEventHandler,
  Checkbox: useCheckboxEventsHandler,
  Select: useSelectEventsHandler,
  SnackBar: useSnackBarEventsHandler,
  TextField: useTextFieldEventsHandler,
};
