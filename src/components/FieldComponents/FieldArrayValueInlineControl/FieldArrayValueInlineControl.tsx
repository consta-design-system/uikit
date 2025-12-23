import { AtomMut } from '@reatom/framework';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { forwardRef, useRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { usePropAtom, useSendToAtom, withCtx } from '##/utils/state';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { FieldPropSize } from '../types';
import { cnFieldArrayValueInlineControl } from './cnFieldArrayValueInlineControl';
import {
  FieldArrayValueInlineControlComponent,
  FieldArrayValueInlineControlProps,
} from './types';

const gapMap: Record<FieldPropSize, string> = {
  l: 'calc(var(--space-3xs) + var(--space-2xs))',
  m: 'var(--space-2xs)',
  s: 'var(--space-3xs)',
  xs: 'var(--space-3xs)',
};

const verticalPaddingMap: Record<FieldPropSize, string> = {
  l: 'var(--space-xs)',
  m: 'calc(var(--space-xs) - var(--space-3xs))',
  s: 'var(--space-2xs)',
  xs: 'var(--space-3xs)',
};

const inputHeightMap: Record<FieldPropSize, string> = {
  l: 'var(--space-2xl)',
  m: 'calc(var(--space-2xl) - var(--space-2xs))',
  s: 'var(--space-xl)',
  xs: 'var(--space-l)',
};

const InputFakeElement = forwardRef<
  HTMLDivElement,
  PropsWithHTMLAttributes<
    {
      valueAtom: AtomMut<string | undefined>;
      inputMinWidthAtom: AtomMut<number>;
    },
    HTMLDivElement
  >
>(({ valueAtom, inputMinWidthAtom, ...otherProps }, componentRef) => {
  const [value] = useAtom(valueAtom);

  const ref = useRef<HTMLDivElement>(null);

  const { width } = useComponentSize(ref);

  useUpdate(
    (ctx, width) => {
      inputMinWidthAtom(ctx, width);
    },
    [width],
  );

  return (
    <div {...otherProps} ref={useForkRef([componentRef, ref])}>
      {value}
    </div>
  );
});

const Root = forwardRef<
  HTMLDivElement,
  PropsWithHTMLAttributes<
    {
      inputMinWidthAtom: AtomMut<number>;
      size: FieldArrayValueInlineControlProps<unknown>['size'];
    },
    HTMLDivElement
  >
>(
  (
    {
      children,
      className,
      inputMinWidthAtom,
      size = 'm',
      style,
      ...otherProps
    },
    ref,
  ) => {
    const [inputMinWidth] = useAtom(inputMinWidthAtom);

    return (
      <div
        {...otherProps}
        className={cnFieldArrayValueInlineControl(null, [className])}
        ref={ref}
        style={{
          ...style,
          ['--field-array-value-inline-control-items-gap' as string]:
            gapMap[size],
          ['--field-array-value-inline-control-input-min-width' as string]: `${inputMinWidth}px`,
          ['--field-array-value-inline-control-vertical-padding' as string]: `${verticalPaddingMap[size]}`,
          ['--field-array-value-inline-control-input-height' as string]: `${inputHeightMap[size]}`,
        }}
      >
        {children}
      </div>
    );
  },
);

const FieldArrayValueInlineControlRender = (
  props: FieldArrayValueInlineControlProps<unknown>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    inputRef: inputRefProp,
    inputMaxLength,
    inputMinLength,
    value = [],
    inputValue,
    inputDefaultValue = '',
    renderValue,
    onFocus,
    onBlur,
    autoFocus,
    inputTabIndex,
    inputAriaLabel,
    disabled,
    size = 'm',
    placeholder,
    onKeyDown,
    onKeyDownCapture,
    onChange,
    onKeyUp,
    onKeyUpCapture,
    onCopy,
    onCopyCapture,
    onCut,
    onCutCapture,
    onPaste,
    onPasteCapture,
    onWheel,
    disableInput,
    ...otherProps
  } = props;

  const propsAtom = useSendToAtom(props);
  const inputValuePropAtom = usePropAtom(propsAtom, 'inputValue');
  // const valueAtom = usePropAtom(propsAtom, 'value');
  const inputValueAtom = useCreateAtom<string | undefined>(
    inputValue || inputDefaultValue,
  );
  const inputDefaultValueAtom = useCreateAtom(inputDefaultValue);
  const inputMinWidthAtom = useCreateAtom(0);

  const fakeInputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = useAction(
    (ctx, e: React.ChangeEvent<HTMLInputElement>) => {
      inputValueAtom(ctx, e.target.value);
      const { onChange } = ctx.get(propsAtom);
      if (onChange) {
        onChange(e);
      }
    },
    [],
  );

  useAtom((ctx) => {
    const inputValueProp = ctx.spy(inputValuePropAtom);
    const inputDefaultValue = ctx.get(inputDefaultValueAtom);
    if (inputDefaultValue) {
      inputDefaultValueAtom(ctx, '');
    } else {
      if (inputRef.current) {
        inputRef.current.value = inputValueProp || '';
      }

      inputValueAtom(ctx, inputValueProp);
    }
  });

  return (
    <Root
      {...otherProps}
      className={cnFieldArrayValueInlineControl(null, [className])}
      ref={ref}
      size={size}
      inputMinWidthAtom={inputMinWidthAtom}
    >
      {renderValue(value || [])}
      <input
        className={cnFieldArrayValueInlineControl('Input', {
          disabled: disableInput,
        })}
        onChange={handleChange}
        ref={useForkRef([inputRef, inputRefProp])}
        maxLength={inputMaxLength}
        onFocus={onFocus}
        onBlur={onBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        tabIndex={inputTabIndex}
        aria-label={inputAriaLabel}
        onKeyDown={onKeyDown}
        onKeyDownCapture={onKeyDownCapture}
        onKeyUp={onKeyUp}
        onKeyUpCapture={onKeyUpCapture}
        disabled={disabled}
        type="text"
        placeholder={value.length ? undefined : placeholder}
        onCopy={onCopy}
        onCopyCapture={onCopyCapture}
        onCut={onCut}
        onCutCapture={onCutCapture}
        onPaste={onPaste}
        onPasteCapture={onPasteCapture}
        onWheel={onWheel}
        defaultValue={inputDefaultValue}
        readOnly={disableInput}
      />
      <InputFakeElement
        ref={fakeInputRef}
        className={cnFieldArrayValueInlineControl('HelperInputFakeElement')}
        valueAtom={inputValueAtom}
        inputMinWidthAtom={inputMinWidthAtom}
      />
    </Root>
  );
};

export const FieldArrayValueInlineControl = withCtx(
  forwardRef(FieldArrayValueInlineControlRender),
) as FieldArrayValueInlineControlComponent;
