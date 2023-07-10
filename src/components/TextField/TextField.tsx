import './TextField.css';

import { IconClose } from '@consta/icons/IconClose';
import { IconEye } from '@consta/icons/IconEye';
import { IconEyeClose } from '@consta/icons/IconEyeClose';
import { IconSelect } from '@consta/icons/IconSelect';
import { IconSelectOpen } from '@consta/icons/IconSelectOpen';
import React, { forwardRef, useCallback, useEffect } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { useFlag } from '../../hooks/useFlag/useFlag';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useMutableRef } from '../../hooks/useMutableRef/useMutableRef';
import { useSortSteps } from '../../hooks/useSortSteps/useSortSteps';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { isString } from '../../utils/type-guards';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import {
  getIncrementFlag,
  getTypeForRender,
  getValueByStep,
  sizeMap,
} from './helpers';
import {
  TextFieldComponent,
  textFieldPropFormDefault,
  TextFieldProps,
  textFieldPropSizeDefault,
  textFieldPropViewDefault,
  textFieldPropWidthDefault,
} from './types';

export const COMPONENT_NAME = 'TextField' as const;
export const cnTextField = cn(COMPONENT_NAME);

export const TextFieldRender = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const textFieldRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
    inputRef: inputRefProp,
    maxLength,
    disabled,
    size = textFieldPropSizeDefault,
    view = textFieldPropViewDefault,
    form = textFieldPropFormDefault,
    state,
    status,
    width = textFieldPropWidthDefault,
    onBlur,
    onFocus,
    autoFocus = false,
    placeholder,
    leftSide,
    rightSide,
    autoComplete,
    withClearButton,
    incrementButtons = true,
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
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, textFieldRef);
  const [focus, setFocus] = useFlag(autoFocus);
  const [passwordVisible, setPasswordVisuble] = useFlag(false);

  const valueRef = useMutableRef(value);
  const onClickRef = useMutableRef(onClick);
  const onChangeRef = useMutableRef(onChange);

  const handleEyeClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setPasswordVisuble.toggle();
      inputRef.current?.focus();
    },
    [],
  );

  const textarea = type === 'textarea';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = isString(leftSide);
  const rightSideIsString = isString(rightSide);
  const iconSize = getByMap(sizeMap, size, iconSizeProp);

  const sortedSteps = useSortSteps({
    step,
    min: Number(min),
    max: Number(max),
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      !disabled &&
        onChangeRef.current?.({ e, id, name, value: e.target.value || null });
    },
    [id, name, disabled],
  );

  const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus.off();
    onBlur?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus.on();
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
    tabIndex,
    name,
    onKeyDownCapture,
    onKeyPress,
    onKeyPressCapture,
    onKeyUp,
    onKeyUpCapture,
    'id': id ? id.toString() : '',
    'aria-label': ariaLabel,
  };

  const Eye = passwordVisible ? IconEyeClose : IconEye;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const flag = getIncrementFlag(e);
    onKeyDownProp?.(e);
    if (type === 'number' && typeof flag === 'boolean' && !disabled) {
      e.preventDefault();
      onChangeRef.current?.({
        e,
        id,
        name,
        value: getValueByStep(sortedSteps, value, flag, min, max),
      });
    }
  };

  const textareaProps = {
    rows,
    cols,
    minRows: minRows || rows,
    maxRows: maxRows || rows,
    ref: useForkRef([inputRef, inputRefProp]) as (
      node: HTMLTextAreaElement,
    ) => void,
  };

  const inputProps = {
    type: getTypeForRender(type, passwordVisible),
    max,
    min,
    step: !Array.isArray(sortedSteps) ? sortedSteps : 0,
    onKeyDown,
    ref: useForkRef([
      inputRef,
      inputRefProp,
    ]) as React.RefCallback<HTMLInputElement>,
  };

  const handleClear = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeRef.current?.({
      e,
      id,
      name,
      value: null,
    });
  }, []);

  const changeNumberValue = (
    e: React.MouseEvent<HTMLButtonElement>,
    isIncrement = true,
  ) => {
    onChangeRef.current?.({
      e,
      id,
      name,
      value: getValueByStep(sortedSteps, value, isIncrement, min, max),
    });
  };

  const rootProps = {
    onClick: useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      inputRef.current?.focus();
      onClickRef.current?.(e);
    }, []),
  };

  // при смене passwordVible, перемещаем курсор в конец строки
  useEffect(() => {
    if (type === 'password' && inputRef.current) {
      inputRef.current.selectionStart = valueRef.current?.length || 0;
    }
  }, [passwordVisible]);

  return (
    <div
      className={cnTextField({ labelPosition, size, view, width }, [className])}
      ref={useForkRef([ref, textFieldRef])}
      {...rootProps}
      {...otherProps}
    >
      {label && (
        <FieldLabel
          as="label"
          htmlFor={id?.toString()}
          icon={labelIcon}
          required={required}
          className={cnTextField('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnTextField('Body')}>
        <div
          ref={inputContainerRef}
          className={cnTextField('InputContainer', {
            view,
            form,
            status: status || state,
            disabled,
            type,
            focus: focus || focused,
            withValue: !!value,
          })}
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

          {type === 'number' && incrementButtons && (
            <div className={cnTextField('Counter')}>
              <button
                onFocus={handleFocus}
                onClick={(e) => changeNumberValue(e, true)}
                type="button"
                className={cnTextField('CounterButton')}
              >
                <IconSelectOpen size="xs" />
              </button>
              <button
                onFocus={handleFocus}
                onClick={(e) => changeNumberValue(e, false)}
                type="button"
                className={cnTextField('CounterButton')}
              >
                <IconSelect size="xs" />
              </button>
            </div>
          )}

          {value && withClearButton && type !== 'number' && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleClear}
              className={cnTextField('ClearButton')}
            >
              <IconClose size="xs" className={cnTextField('ClearButtonIcon')} />
            </button>
          )}

          {type === 'password' && value && (
            <button
              className={cnTextField('ClearButton')}
              type="button"
              onClick={handleEyeClick}
            >
              <Eye className={cnTextField('Icon')} size={iconSize} />
            </button>
          )}

          {RightIcon && type !== 'number' && type !== 'password' && (
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
        {caption && (
          <FieldCaption
            className={cnTextField('Caption')}
            status={status || state}
          >
            {caption}
          </FieldCaption>
        )}
      </div>
    </div>
  );
};

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;
export * from './types';
