import React from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import {
  cnTextField,
  TextFieldPropAutoComplete,
  TextFieldPropForm,
  TextFieldPropId,
  TextFieldPropName,
  TextFieldPropOnChange,
  TextFieldPropSize,
  TextFieldPropState,
  TextFieldPropValue,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export type Props = {
  className?: string;
  value?: TextFieldPropValue;
  onChange?: TextFieldPropOnChange;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  type?: string;
  disabled?: boolean;
  cols?: number;
  maxLength?: number;
  size?: TextFieldPropSize;
  view?: TextFieldPropView;
  form?: TextFieldPropForm;
  state?: TextFieldPropState;
  width?: TextFieldPropWidth;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  autoFocus?: boolean;
  placeholder?: string;
  leftSide?: string | React.FC<IconProps>;
  rightSide?: string | React.FC<IconProps>;
  autoComplete?: TextFieldPropAutoComplete;
  max?: number | string;
  min?: number | string;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
  ariaLabel?: string;
  iconSize?: IconPropSize;
  children?: never;
};

export const useTextFieldEventsHandler = (
  props: Props,
  handler: EventInterceptorHandler,
  textFieldRef: React.RefObject<HTMLDivElement>,
) => {
  const [inputChanged, setInputChanged] = React.useState<boolean>(false);
  const newProps = { ...props };

  React.useEffect(() => {
    setInputChanged(true);
  }, [newProps.value]);

  newProps.onFocus = (...onfocusArgs) => {
    setInputChanged(false);

    return props.onFocus?.(...onfocusArgs);
  };

  newProps.onBlur = (...onBlurArgs) => {
    const value = {
      component: cnTextField() as EventInterceptorPropComponent,
      event: 'change',
      options: {
        placeholder: newProps.placeholder,
        pageURL: window.location.href,
        DOMRef: textFieldRef.current,
        value: newProps.value,
      },
    };
    if (inputChanged) {
      handler!(value);
    }

    return props.onBlur?.(...onBlurArgs);
  };

  return newProps;
};
