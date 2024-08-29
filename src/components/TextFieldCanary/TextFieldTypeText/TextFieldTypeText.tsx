import React, { forwardRef } from 'react';

import {
  FieldControlLayout,
  FieldInput,
  getFieldIconSize,
  renderSide,
} from '##/components/Field';

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
      readOnly,
      required,
      tabIndex,
      ariaLabel,
      iconSize,
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

    return (
      <FieldControlLayout
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
      >
        <FieldInput />
      </FieldControlLayout>
    );
  },
);
