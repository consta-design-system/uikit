import './TextFieldTypeTextArea.css';

import React, { forwardRef } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import {
  cnFieldInput,
  FieldClearButton,
  FieldControlLayout,
  renderSide,
} from '##/components/FieldComponents';
import { useForkRef } from '##/hooks/useForkRef';
import { useRefs } from '##/hooks/useRefs';
import { getElementWidth, useResizeObserved } from '##/hooks/useResizeObserved';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

import { TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';

export const cnTextFieldTypeTextArea = cn('TextFieldTypeTextArea');

export const TextFieldTypeTextArea: TextFieldTypeComponent<'textarea'> =
  forwardRef((props, componentRef) => {
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
      withClearButton,
      readOnly,
      type,
      tabIndex,
      ariaLabel,
      iconSize,
      onClick,
      resize,
      rows,
      minRows,
      maxRows,

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
    } = useTextField<HTMLTextAreaElement>({
      onClick,
      onChange,
      onBlur,
      onFocus,
      disabled,
      onClear,
    });

    const rightSlotsRefs = useRefs<HTMLDivElement>(2, [
      !!rightSide,
      withClearButton && !disabled && withValue,
    ]);

    const slotSizes = useResizeObserved(rightSlotsRefs, getElementWidth);

    const textareaProps = {
      'className': cnTextFieldTypeTextArea('TextArea', [
        cnFieldInput(),
        cnMixScrollBar({ size: 'xs', trackSize: 'native' }),
      ]),
      placeholder,
      autoComplete,
      'onBlur': handleBlur,
      'onChange': handleChange,
      'onFocus': handleFocus,
      'defaultValue': defaultValue || undefined,
      'value': value === null ? '' : value,
      'ref': useForkRef([inputRefProp, inputRef]),
      readOnly,
      tabIndex,
      'aria-label': ariaLabel,
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,
      maxLength,
      disabled,
      id,
      name,
      autoFocus,
      onCopy,
      onCopyCapture,
      onCut,
      onCutCapture,
      onPaste,
      onPasteCapture,
      onWheel,
    };

    const textAreaNoAutoSizeProps = {
      rows,
    };

    const textAreaAutoSizeProps = {
      minRows: minRows || rows,
      maxRows: maxRows || rows,
    };

    return (
      <FieldControlLayout
        {...otherProps}
        className={cnTextFieldTypeTextArea({ resize }, [className])}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && withValue && (
            <FieldClearButton size={size} onClick={handleClear} />
          ),
          renderSide(rightSide, size, iconSize),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
        style={{
          ['--text-field-textarea-slot-sizes-width' as string]: `${slotSizes.reduce(
            (a, b) => a + b,
          )}px`,
          ['--text-field-textarea-slot-sizes-length' as string]:
            slotSizes.filter((width) => !!width).length,
        }}
        rightSlotsRefs={rightSlotsRefs}
      >
        {resize === 'auto' ? (
          <TextAreaAutoSize {...textareaProps} {...textAreaAutoSizeProps} />
        ) : (
          <textarea {...textareaProps} {...textAreaNoAutoSizeProps} />
        )}
      </FieldControlLayout>
    );
  });
