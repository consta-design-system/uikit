import React from 'react';

import { IconComponent, IconPropSize } from '../../../icons/Icon/Icon';
import { AutoCompete } from '../../../utils/types/AutoComplete';
import {
  TextField,
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
  leftSide?: string | IconComponent;
  rightSide?: string | IconComponent;
  autoComplete?: AutoCompete;
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
  ref: React.RefObject<HTMLDivElement>,
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
      component: 'TextField' as const,
      event: 'change',
      options: {
        placeholder: newProps.placeholder,
        pageURL: window.location.href,
        DOMRef: ref.current,
        value: newProps.value,
        props: newProps,
      },
    };
    if (inputChanged) {
      handler!(value);
    }

    return props.onBlur?.(...onBlurArgs);
  };

  return newProps;
};
