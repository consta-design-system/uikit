import React, { forwardRef } from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldInput,
  renderSide,
} from '##/components/FieldComponents';
import { useForkRef } from '##/hooks/useForkRef';

import { TextFieldTypeComponent } from '..';
import { useTextField } from '../useTextField';

export const TextFieldTypeText: TextFieldTypeComponent<string> = forwardRef(
  (props, componentRef) => {
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
      size = 'm',
      view = 'default',
      form,
      status,
      onBlur,
      onFocus,
      autoFocus,
      placeholder,
      leftSide,
      rightSide,
      autoComplete,
      clearButton,
      readOnly,
      type = 'text',
      tabIndex,
      ariaLabel,
      iconSize,
      onClick,
      // onKey props
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,
      onCopy,
      onCopyCapture,
      onCut,
      onCutCapture,
      onPaste,
      onPasteCapture,
      onClear,
      onWheel,
      iconClear,
      ...otherProps
    } = props;

    const {
      handleBlur,
      handleChange,
      handleClear,
      handleFocus,
      focused,
      withValue,
      ref,
      inputRef,
      handleClick,
    } = useTextField({
      onClick,
      onChange,
      onBlur,
      onFocus,
      disabled,
      onClear,
    });

    return (
      <FieldControlLayout
        {...otherProps}
        className={className}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          clearButton && !disabled && withValue && (
            <FieldClearButton
              size={size}
              onClick={handleClear}
              icon={iconClear}
            />
          ),
          renderSide(rightSide, size, iconSize),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
      >
        <FieldInput
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          defaultValue={defaultValue || undefined}
          value={value === null ? '' : value}
          ref={useForkRef([inputRefProp, inputRef])}
          readOnly={readOnly}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          onKeyDownCapture={onKeyDownCapture}
          onKeyUp={onKeyUp}
          onKeyUpCapture={onKeyUpCapture}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
          id={id}
          name={name}
          onCopy={onCopy}
          onCopyCapture={onCopyCapture}
          onCut={onCut}
          onCutCapture={onCutCapture}
          onPaste={onPaste}
          onPasteCapture={onPasteCapture}
          onWheel={onWheel}
        />
      </FieldControlLayout>
    );
  },
);
