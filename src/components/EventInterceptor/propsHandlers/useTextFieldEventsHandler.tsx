import React from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import {
  COMPONENT_NAME,
  TextField,
  TextFieldPropAutoComplete,
  TextFieldPropForm,
  TextFieldPropId,
  TextFieldPropName,
  TextFieldPropOnChange,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropValue,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import { EventInterceptorHandler } from '../EventInterceptor';

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
  state?: TextFieldPropStatus;
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

type TextFieldProps = Parameters<typeof TextField>[0];

export const useTextFieldEventsHandler = <P extends TextFieldProps>(
  props: P,
  handler: EventInterceptorHandler,
  textFieldRef: React.RefObject<HTMLDivElement>,
): P => {
  const [inputChanged, setInputChanged] = React.useState<boolean>(false);
  const newProps: P = { ...props };

  React.useEffect(() => {
    setInputChanged(true);
  }, [newProps.value]);

  newProps.onFocus = (...onfocusArgs) => {
    setInputChanged(false);

    return props.onFocus?.(...onfocusArgs);
  };

  newProps.onBlur = (...onBlurArgs) => {
    const value = {
      component: COMPONENT_NAME,
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
