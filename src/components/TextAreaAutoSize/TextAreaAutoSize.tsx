import './TextAreaAutoSize.css';

import { action, atom, computed, effect, wrap } from '@reatom/core';
import React from 'react';
import { createPortal } from 'react-dom';

import { forkRef } from '##/hooks/useForkRef';
import { cn } from '##/utils/bem';
import { deepEqual } from '##/utils/objectCompare';
import { factoryComponent, resizeObservedAtom } from '##/utils/state';

export const cnTextAreaAutoSize = cn('TextAreaAutoSize');

export type TextAreaAutoSizeProps = {
  minRows?: number;
  maxRows?: number;
  portalRoot?: HTMLElement;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaAutoSize = factoryComponent<
  HTMLTextAreaElement,
  TextAreaAutoSizeProps
>((_, propsAtom) => {
  const textAreaElementAtom = atom<HTMLTextAreaElement | null>(null);
  const fakeElementAtom = atom<HTMLTextAreaElement | null>(null);
  const elementsAtom = computed(() => [
    textAreaElementAtom(),
    fakeElementAtom(),
  ]);
  const minRowsAtom = computed(() => propsAtom().minRows || 1);
  const maxRowsAtom = computed(() => propsAtom().maxRows);

  const textareaStylesAtom = atom<React.CSSProperties>({});
  const fakeStylesAtom = atom<React.CSSProperties>({});

  const calculateHeight = action(() => {
    const textAreaElement = textAreaElementAtom();
    const fakeElement = fakeElementAtom();
    const minRows = minRowsAtom();
    const maxRows = maxRowsAtom();

    if (!textAreaElement || !fakeElement) return;
    const textAreaStyles = getComputedStyle(textAreaElement);

    const newFakeStyles = {
      minHeight: textAreaStyles.minHeight,
      maxHeight: textAreaStyles.maxHeight,
      width: textAreaStyles.width,
      paddingBottom: textAreaStyles.paddingBottom,
      paddingTop: textAreaStyles.paddingTop,
      paddingLeft: textAreaStyles.paddingLeft,
      paddingRight: textAreaStyles.paddingRight,
      margin: textAreaStyles.margin,
      border: textAreaStyles.border,
      borderTop: textAreaStyles.borderTop,
      borderBottom: textAreaStyles.borderBottom,
      borderLeft: textAreaStyles.borderLeft,
      borderRight: textAreaStyles.borderRight,
      fontFamily: textAreaStyles.fontFamily,
      fontSize: textAreaStyles.fontSize,
      lineHeight: textAreaStyles.lineHeight,
      tabSize: textAreaStyles.tabSize,
      textIndent: textAreaStyles.textIndent,
      textRendering: textAreaStyles.textRendering,
      textTransform: textAreaStyles.textTransform,
      display: textAreaStyles.display,
      whiteSpace: textAreaStyles.whiteSpace,
      wordBreak: textAreaStyles.wordBreak,
    } as React.CSSProperties;

    if (!deepEqual(newFakeStyles, fakeStylesAtom())) {
      fakeStylesAtom.set(newFakeStyles);
    }

    const computedStyle = getComputedStyle(fakeElement);
    const lineHeight = parseFloat(computedStyle.lineHeight);

    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    const borderTop = parseFloat(computedStyle.borderTopWidth);
    const borderBottom = parseFloat(computedStyle.borderBottomWidth);

    const gap = paddingTop + paddingBottom + borderTop + borderBottom;

    const newHeight = fakeElement.scrollHeight;

    const minHeight = minRows * lineHeight + gap;
    const maxHeight = maxRows ? maxRows * lineHeight + gap : Infinity;

    const finalHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);

    if (isNaN(finalHeight)) {
      return;
    }

    const newTextareaStyles: React.CSSProperties = {
      height: `${finalHeight}px`,
      overflowY: maxRows && newHeight > maxHeight ? 'scroll' : 'hidden',
    };

    if (!deepEqual(newTextareaStyles, textareaStylesAtom())) {
      textareaStylesAtom.set(newTextareaStyles);
    }
  });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = action(
    (e) => {
      propsAtom().onChange?.(e);
      const fakeElement = fakeElementAtom();
      if (fakeElement) {
        fakeElement.value = e.target.value;
      }
      calculateHeight();
    },
  );

  const sizesAtom = resizeObservedAtom(
    elementsAtom,
    (el) => el?.getBoundingClientRect().width || 0,
  );

  effect(() => {
    fakeElementAtom();
    textAreaElementAtom();
    minRowsAtom();
    maxRowsAtom();
    sizesAtom();

    calculateHeight();
  });

  effect(() => {
    const fakeElement = fakeElementAtom();
    const textAreaElement = textAreaElementAtom();
    if (fakeElement && textAreaElement) {
      fakeElement.value = textAreaElement.value;
      calculateHeight();
    }
  });

  return ({
    ref,
    minRows,
    maxRows,
    style,
    className,
    portalRoot = document.body,
    ...restProps
  }) => (
    <>
      <textarea
        {...restProps}
        ref={forkRef([wrap(textAreaElementAtom.set), ref])}
        onChange={handleChange}
        style={{ ...style, ...textareaStylesAtom() }}
        className={cnTextAreaAutoSize(null, [className])}
      />
      {createPortal(
        <textarea
          ref={fakeElementAtom.set}
          style={fakeStylesAtom()}
          className={cnTextAreaAutoSize('Fake')}
          id={cnTextAreaAutoSize('Fake', {
            id: restProps.id,
            name: restProps.name,
          })}
        />,
        portalRoot,
      )}
    </>
  );
});
