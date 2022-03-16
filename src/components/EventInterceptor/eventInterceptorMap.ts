import { useButtonEventHandler } from './propsHandlers/useButtonEventHandler';
import { useCheckboxEventsHandler } from './propsHandlers/useCheckboxEventsHandler';
import { useSelectEventsHandler } from './propsHandlers/useSelectEventsHandler';
import { useSnackBarEventsHandler } from './propsHandlers/useSnackBarEventsHandler';
import { useTextFieldEventsHandler } from './propsHandlers/useTextFieldEventsHandler';

export const eventInterceptorMap = {
  Button: useButtonEventHandler,
  Checkbox: useCheckboxEventsHandler,
  Select: useSelectEventsHandler,
  SnackBar: useSnackBarEventsHandler,
  TextField: useTextFieldEventsHandler,
  Card: undefined,
  Tag: undefined,
} as const;
