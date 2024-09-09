import './TextFieldTypeTextArea.css';

import React, { forwardRef } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import {
  cnFieldInput,
  FieldClearButton,
  FieldControlLayout,
  renderSide,
} from '##/components/Field';
import { getElementSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

import { TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';

export const cnTextFieldTypeTextArea = cn('TextFieldTypeTextArea');

export const TextFieldTypeTextArea: TextFieldTypeComponent<'textArea'> =
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
      type,
      tabIndex,
      ariaLabel,
      iconSize,
      onClick,
      resize = true,
      // onkey props
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,
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
      id,
      name,
    });

    const rightSlotsRefs = useRefs<HTMLDivElement>(2, [
      !!rightSide,
      withClearButton && !disabled && withValue,
    ]);

    const slotSizes = useResizeObserved(rightSlotsRefs, getElementSize);

    const textAreaProps = {
      'className': cnTextFieldTypeTextArea('TextArea', { resize }, [
        cnFieldInput(),
        cnMixScrollBar({ size: 'xs', trackSize: 'native' }),
      ]),
      placeholder,
      // autoFocus={autoFocus}
      autoComplete,
      'onBlur': handleBlur,
      'onChange': handleChange,
      'onFocus': handleFocus,
      'defaultValue': defaultValue || undefined,
      'value': value || undefined,
      'ref': useForkRef([inputRefProp, inputRef]),
      readOnly,
      tabIndex,
      'aria-label': ariaLabel,
      'onKeyDown': onKeyDown,
      'onKeyDownCapture': onKeyDownCapture,
      'onKeyUp': onKeyUp,
      'onKeyUpCapture': onKeyUpCapture,
      'maxLength': maxLength,
      'disabled': disabled,
    };

    return (
      <FieldControlLayout
        {...otherProps}
        className={cnTextFieldTypeTextArea(null, [className])}
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
          ['--text-field-textarea-slot-sizes-width' as string]: `${slotSizes
            .map((item) => item.width)
            .reduce((a, b) => a + b)}px`,
          ['--text-field-textarea-slot-sizes-lenght' as string]:
            slotSizes.filter((item) => !!item.width).length,
        }}
        rightSlotsRefs={rightSlotsRefs}
      >
        {resize === 'auto' ? (
          <TextAreaAutoSize {...textAreaProps} />
        ) : (
          <textarea {...textAreaProps} />
        )}
      </FieldControlLayout>
    );
  });
