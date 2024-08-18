import React, { forwardRef } from 'react';

import { Fi, FieldControlLayout, getFieldIconSize } from '##/components/Field';

import { TextFieldTypeComponent } from '..';

export const TextFieldTypeText: TextFieldTypeComponent<'text'> = forwardRef(
  (props, ref) => {
    const {
      className,
      value,
      defaultValue,
      onChange,
      id,
      name,
      inputRef: inputRefProp,
      maxLength,
      disabled,
      size,
      view,
      form,
      status,
      onBlur,
      onFocus,
      autoFocus,
      placeholder,
      leftSide,
      rightSide,
      autoComplete,
      withClearButton,
      incrementButtons: incrementButtonsProp = true,
      max,
      min,
      readOnly,
      required,
      step = 1,
      tabIndex,
      ariaLabel,
      label,
      labelIcon,
      inputContainerRef,
      labelPosition = 'top',
      caption,
      iconSize: iconSizeProp,
      focused,
      onClick,
      // onkey props
      onKeyDown: onKeyDownProp,
      onKeyDownCapture,
      onKeyPress,
      onKeyPressCapture,
      onKeyUp,
      onKeyUpCapture,
      onClear,
      ...otherProps
    } = props;
  },
);
