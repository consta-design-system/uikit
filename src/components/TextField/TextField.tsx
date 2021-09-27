import './TextField.css';

import React, { forwardRef, useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixCaption } from '../../mixs/MixCaption/MixCaption';
import { cnMixLabel } from '../../mixs/MixLabel/MixLabel';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import {
  sizeMap,
  TextFieldComponent,
  textFieldPropFormDefault,
  TextFieldProps,
  textFieldPropSizeDefault,
  textFieldPropViewDefault,
  textFieldPropWidthDefault,
} from './helpers';

export const cnTextField = cn('TextField');

export function TextFieldRender<TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) {
  const textFieldRef = React.useRef<HTMLDivElement>(null);

  const {
    className,
    type = 'text',
    value,
    onChange,
    id,
    name,
    rows,
    cols,
    minRows,
    maxRows,
    inputRef,
    maxLength,
    disabled,
    size = textFieldPropSizeDefault,
    view = textFieldPropViewDefault,
    form = textFieldPropFormDefault,
    state,
    width = textFieldPropWidthDefault,
    onBlur,
    onFocus,
    autoFocus = false,
    placeholder,
    leftSide,
    rightSide,
    autoComplete,
    max,
    min,
    readOnly,
    required,
    step,
    tabIndex,
    ariaLabel,
    label,
    labelAlign = 'top',
    caption,
    iconSize: iconSizeProp,
    ...otherProps
  } = usePropsHandler(cnTextField(), props, textFieldRef);
  const [focus, setFocus] = useState<boolean>(autoFocus);
  const textarea = type === 'textarea';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = typeof leftSide === 'string';
  const rightSideIsString = typeof rightSide === 'string';
  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    !disabled && onChange?.({ e, id, name, value: value || null });
  };

  const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus(false);
    onBlur?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus(true);
    onFocus?.(e);
  };

  const commonProps = {
    'className': cnTextField('Input'),
    'value': value || '',
    'onChange': handleChange,
    maxLength,
    disabled,
    'onBlur': handleBlur,
    'onFocus': handleFocus,
    autoFocus,
    placeholder,
    autoComplete,
    readOnly,
    required,
    tabIndex,
    name,
    'id': id ? id.toString() : '',
    'aria-label': ariaLabel,
  };

  const textareaProps = {
    rows,
    cols,
    minRows: minRows || rows,
    maxRows: maxRows || rows,
    inputRef:
      inputRef === null
        ? undefined
        : (inputRef as (node: HTMLTextAreaElement) => void | React.RefObject<HTMLTextAreaElement>),
  };

  const inputProps = {
    type,
    max,
    min,
    step,
    ref: inputRef as React.Ref<HTMLInputElement>,
  };

  return (
    <div
      className={cnTextField(null, [cnMixLabel({ align: labelAlign, size }), className])}
      {...otherProps}
    >
      {label && <FieldLabel size={size}>{label}</FieldLabel>}
      <div className={cnTextField('CaptionContainer', [cnMixCaption({ size })])}>
        <div
          className={cnTextField('InputContainer', {
            size,
            view,
            form,
            state,
            disabled,
            width,
            type,
            focus,
            withValue: !!value,
          })}
          ref={useForkRef([ref, textFieldRef])}
        >
          {LeftIcon && (
            <div
              className={cnTextField('Side', {
                position: 'left',
                type: leftSideIsString ? 'string' : 'icon',
              })}
              title={typeof leftSide === 'string' ? leftSide : undefined}
            >
              {leftSideIsString ? (
                leftSide
              ) : (
                <LeftIcon className={cnTextField('Icon')} size={iconSize} />
              )}
            </div>
          )}
          {textarea ? (
            <TextAreaAutoSize {...commonProps} {...textareaProps} />
          ) : (
            <input {...commonProps} {...inputProps} />
          )}
          {RightIcon && (
            <div
              className={cnTextField('Side', {
                position: 'right',
                type: rightSideIsString ? 'string' : 'icon',
              })}
              title={typeof rightSide === 'string' ? rightSide : undefined}
            >
              {rightSideIsString ? (
                rightSide
              ) : (
                <RightIcon className={cnTextField('Icon')} size={iconSize} />
              )}
            </div>
          )}
        </div>
        {caption && <FieldCaption status={state}>{caption}</FieldCaption>}
      </div>
    </div>
  );
}

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;

export * from './helpers';
