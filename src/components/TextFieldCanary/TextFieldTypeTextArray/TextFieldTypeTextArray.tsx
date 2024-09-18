import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
  FieldClearButton,
  FieldControlLayout,
  renderSide,
} from '##/components/FieldComponents';
import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys, UseKeysPropKeys } from '##/hooks/useKeys';
import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { getElementWidth, useResizeObserved } from '##/hooks/useResizeObserved';
import { getStyleProps } from '##/hooks/useStyleProps';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';

import { TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';
import { cnTextFieldTypeTextArray } from './cnTextFieldTypeTextArray';

export const TextFieldTypeTextArray: TextFieldTypeComponent<'textArray'> =
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
      style,
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
      handleClear: inputHandleClear,
      handleFocus,
      focused,
      withValue,
      ref,
      inputRef,
      handleClick,
    } = useTextField({
      onClick,
      onChange: undefined,
      onBlur,
      onFocus,
      disabled,
      id,
      name,
    });

    const controllRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    const mutableRefs = useMutableRef([
      onChange,
      inputHandleClear,
      value,
    ] as const);

    const getRemoveItem = (index: number) => (e: React.MouseEvent) => {
      if (value?.length) {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange?.(newValue.length ? newValue : null, { e });
      }
    };

    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        mutableRefs.current[1](e);
        if (value?.length) {
          mutableRefs.current[0]?.(null, { e });
        }
      },
      [],
    );

    const keys: UseKeysPropKeys<HTMLInputElement> = useMemo(
      () => ({
        Enter: (e) => {
          const stringValue = e.target.value;
          if (stringValue) {
            mutableRefs.current[0]?.(
              [...(mutableRefs.current[2] || []), stringValue],
              {
                e,
              },
            );

            e.target.value = '';

            if (controllRef.current) {
              controllRef.current.scrollTo({
                top: controllRef.current.scrollHeight,
              });
            }
          }
        },
        Backspace: (e) => {
          const stringValue = e.target.value;
          const currnetValue = mutableRefs.current[2];

          if (!stringValue && currnetValue?.length) {
            e.preventDefault();
            const newValue = [...currnetValue];
            newValue.pop();
            mutableRefs.current[0]?.(newValue, {
              e,
            });
          }
        },
      }),
      [],
    );

    const handleInputKeyDown = useKeys<HTMLInputElement>({
      isActive: !!onChange,
      keys,
      onEvent: onKeyDown,
    });

    const rightSlotsRefs = useRefs<HTMLDivElement>(2, [
      !!rightSide,
      withClearButton && !disabled && (withValue || value?.length),
    ]);

    const controlSize = useComponentSize(controllRef);

    const slotSizes = useResizeObserved(rightSlotsRefs, getElementWidth);

    const stylesRoot: Record<'max-height' | 'height', string> | undefined =
      ref.current
        ? getStyleProps(ref.current, ['max-height', 'height'])
        : undefined;

    useEffect(() => {
      if (controllRef.current && scrollWrapperRef.current && focused) {
        scrollWrapperRef.current.scrollTo({
          top: controlSize.height,
        });
      }
    }, [controlSize.height]);

    return (
      <FieldControlLayout
        {...otherProps}
        className={cnTextFieldTypeTextArray(null, [className])}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && (withValue || value?.length) && (
            <FieldClearButton size={size} onClick={handleClear} />
          ),
          renderSide(rightSide, size, iconSize),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
        rightSlotsRefs={rightSlotsRefs}
        style={{
          ...style,
          ['--text-tield-textarray-max-height' as string]:
            stylesRoot?.['max-height'] || stylesRoot?.height || 'auto',
          ['--text-field-textarray-slot-sizes-width' as string]: `${slotSizes.reduce(
            (a, b) => a + b,
          )}px`,
          ['--text-field-textarray-slot-sizes-lenght' as string]:
            slotSizes.filter((width) => !!width).length,
        }}
      >
        <div
          ref={scrollWrapperRef}
          className={cnTextFieldTypeTextArray('ScrollWrapper', [
            cnMixScrollBar({ size: 'xs' }),
          ])}
        >
          <FieldArrayValueInlineControl
            size={size}
            inputRef={useForkRef([inputRef, inputRefProp])}
            value={value ?? []}
            onInputFocus={handleFocus}
            onInputBlur={handleBlur}
            onInputChange={handleChange}
            inputAutoFocus={autoFocus}
            onInputKeyDown={handleInputKeyDown}
            ref={controllRef}
            renderValue={(item, index) => (
              <FieldArrayValueItem
                key={index}
                size={size}
                label={item}
                disabled={disabled}
                onRemove={getRemoveItem(index)}
              />
            )}
          />
        </div>
      </FieldControlLayout>
    );
  });
