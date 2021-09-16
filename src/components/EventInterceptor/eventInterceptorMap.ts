import { COMPONENT_NAME as BUTTON_NAME } from '../Button/Button';
import { COMPONENT_NAME as CHECKBOX_NAME } from '../Checkbox/Checkbox';
import { COMPONENT_NAME as SELECT_NAME } from '../Select/Select';
import { COMPONENT_NAME as SNACKBAR_NAME } from '../SnackBar/SnackBar';
import { COMPONENT_NAME as TEXTFIELD_NAME } from '../TextField/TextField';

import { useButtonEventHandler } from './propsHandlers/useButtonEventHandler';
import { useCheckboxEventsHandler } from './propsHandlers/useCheckboxEventsHandler';
import { useSelectEventsHandler } from './propsHandlers/useSelectEventsHandler';
import { useSnackBarEventsHandler } from './propsHandlers/useSnackBarEventsHandler';
import { useTextFieldEventsHandler } from './propsHandlers/useTextFieldEventsHandler';

export const eventInterceptorMap = {
  [BUTTON_NAME]: useButtonEventHandler,
  [CHECKBOX_NAME]: useCheckboxEventsHandler,
  [SELECT_NAME]: useSelectEventsHandler,
  [SNACKBAR_NAME]: useSnackBarEventsHandler,
  [TEXTFIELD_NAME]: useTextFieldEventsHandler,
} as const;
