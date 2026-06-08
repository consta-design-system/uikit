import {
  action,
  Atom,
  atom,
  Computed,
  computed,
  effect,
  wrap,
} from '@reatom/core';
import React, { memo } from 'react';

import { setRefs } from '##/utils/setRef';
import { factoryComponent } from '##/utils/state/component';
import { computedSet } from '##/utils/state/computedSet';
import { resizeObservedAtom } from '##/utils/state/resizeObservedAtom';
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

const InputFakeElement = memo(
  factoryComponent<
    HTMLDivElement,
    PropsWithHTMLAttributes<
      {
        valueAtom: Atom<string | undefined>;
      },
      HTMLDivElement
    >
  >(() => ({ ref, valueAtom, ...otherProps }) => (
    <div {...otherProps} ref={ref}>
      {valueAtom()}
    </div>
  )),
);

const Root = factoryComponent<
  HTMLDivElement,
  PropsWithHTMLAttributes<
    {
      inputMinWidthAtom: Computed<number>;
      size: FieldArrayValueInlineControlProps<unknown>['size'];
    },
    HTMLDivElement
  >
>(
  () =>
    ({
      children,
      className,
      inputMinWidthAtom,
      size = 'm',
      style,
      ref,
      ...otherProps
    }) => (
      <div
        {...otherProps}
        className={cnFieldArrayValueInlineControl(null, [className])}
        ref={ref}
        style={{
          ...style,
          ['--field-array-value-inline-control-items-gap' as string]:
            gapMap[size],
          ['--field-array-value-inline-control-input-min-width' as string]: `${inputMinWidthAtom()}px`,
          ['--field-array-value-inline-control-vertical-padding' as string]: `${verticalPaddingMap[size]}`,
          ['--field-array-value-inline-control-input-height' as string]: `${inputHeightMap[size]}`,
        }}
      >
        {children}
      </div>
    ),
);

export const FieldArrayValueInlineControl = factoryComponent<
  HTMLDivElement,
  FieldArrayValueInlineControlProps<unknown>
>(({ inputDefaultValue }, propsAtom) => {
  const fakeInputEl = atom<HTMLDivElement | null>(null);
  const inputElAtom = atom<HTMLInputElement | null>(null, 'inputElAtom');

  const inputValuePropAtom = computed(
    () => propsAtom().inputValue || inputElAtom()?.value || inputDefaultValue,
  );
  const inputValueAtom = computedSet(() => inputValuePropAtom());

  const inputMinWidthAtom = resizeObservedAtom(fakeInputEl, (el) =>
    Math.ceil(el?.getBoundingClientRect().width || 0),
  );

  const handleChange = action((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = inputElAtom();
    if (inputEl) {
      inputEl.value = e.target.value;
    }
    inputValueAtom.set(e.target.value);
    propsAtom().onChange?.(e);
  });

  const inputRef = action((el: HTMLInputElement | null) =>
    setRefs([inputElAtom.set, propsAtom().inputRef], el),
  );

  effect(() => {
    const inputValueProp = inputValuePropAtom();
    const inputEl = inputElAtom();

    if (inputEl && inputValueProp) {
      inputEl.value = inputValueProp || '';
      inputValueAtom.set(inputValueProp);
    }
  });

  return ({
    ref,
    size,
    className,
    renderValue,
    value = [],
    disableInput = false,
    inputRef: inputRefProp,
    inputMaxLength,
    onFocus,
    onBlur,
    autoFocus,
    inputTabIndex,
    inputAriaLabel,
    onKeyDown,
    onKeyDownCapture,
    onKeyUp,
    onKeyUpCapture,
    disabled,
    placeholder,
    onCopy,
    onCopyCapture,
    onCut,
    onCutCapture,
    onPaste,
    onPasteCapture,
    onWheel,
    inputDefaultValue,
    inputMinLength,
    inputValue,
    onChange,
    ...otherProps
  }: FieldArrayValueInlineControlProps<unknown>) => {
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
          onChange={wrap(handleChange)}
          ref={wrap(inputRef)}
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
          ref={fakeInputEl.set}
          className={cnFieldArrayValueInlineControl('HelperInputFakeElement')}
          valueAtom={inputValueAtom}
        />
      </Root>
    );
  };
}) as FieldArrayValueInlineControlComponent;
