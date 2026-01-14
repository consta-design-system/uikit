import './TextAreaAutoSize.css';

import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { useForkRef } from '##/hooks/useForkRef';
import { cn } from '##/utils/bem';
import { deepEqual } from '##/utils/objectCompare';
import {
  useCreateAtom,
  useRefAtom,
  useResizeObservedAtom,
  useSendToAtom,
  withCtx,
} from '##/utils/state';

export const cnTextAreaAutoSize = cn('TextAreaAutoSize');

export type TextAreaAutoSizeProps = {
  minRows?: number;
  maxRows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaAutoSize = withCtx(
  forwardRef<HTMLTextAreaElement, TextAreaAutoSizeProps>((props, ref) => {
    const {
      minRows = 1,
      maxRows,
      onChange,
      style,
      className,
      ...restProps
    } = props;

    const [textAreaElementAtom, textAreaRef] =
      useRefAtom<HTMLTextAreaElement>();
    const [fakeElementAtom, fakeRef] = useRefAtom<HTMLTextAreaElement>();

    const [textareaStyles, , textareaStylesAtom] = useAtom<React.CSSProperties>(
      {},
    );
    const [fakeStyles, , fakeStylesAtom] = useAtom<React.CSSProperties>({});

    const propsAtom = useSendToAtom(props);

    const calculateHeight = useAction((ctx) => {
      const textAreaElement = ctx.get(textAreaElementAtom);
      const fakeElement = ctx.get(fakeElementAtom);

      if (!textAreaElement || !fakeElement) return;
      const textAreaStyles = getComputedStyle(textAreaElement);

      const newFakeStyles = {
        minHeight: textAreaStyles.minHeight,
        maxHeight: textAreaStyles.maxHeight,
        width: textAreaStyles.width,
        padding: textAreaStyles.padding,
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

      if (!deepEqual(newFakeStyles, ctx.get(fakeStylesAtom))) {
        fakeStylesAtom(ctx, newFakeStyles);
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

      if (!deepEqual(newTextareaStyles, ctx.get(textareaStylesAtom))) {
        textareaStylesAtom(ctx, newTextareaStyles);
      }
    });

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
      useAction((ctx, e) => {
        ctx.get(propsAtom).onChange?.(e);
        const fakeElement = ctx.get(fakeElementAtom);
        if (fakeElement) {
          fakeElement.value = e.target.value;
        }
        calculateHeight();
      });

    useUpdate(calculateHeight, [
      minRows,
      maxRows,
      fakeElementAtom,
      textAreaElementAtom,
    ]);

    useResizeObservedAtom(
      useCreateAtom((ctx) => [
        ctx.spy(textAreaElementAtom),
        ctx.get(fakeElementAtom),
      ]),
      calculateHeight,
    );

    useCreateAtom((ctx) => {
      const fakeElement = ctx.spy(fakeElementAtom);
      const textAreaElement = ctx.spy(textAreaElementAtom);
      if (fakeElement && textAreaElement) {
        fakeElement.value = textAreaElement.value;
        calculateHeight();
      }
    });

    return (
      <>
        <textarea
          {...restProps}
          ref={useForkRef([textAreaRef, ref])}
          onChange={handleChange}
          style={{ ...style, ...textareaStyles }}
          className={cnTextAreaAutoSize(null, [className])}
        />
        {createPortal(
          <textarea
            ref={fakeRef}
            style={fakeStyles}
            className={cnTextAreaAutoSize('Fake')}
            id={cnTextAreaAutoSize('Fake', {
              id: restProps.id,
              name: restProps.name,
            })}
          />,
          document.body,
        )}
      </>
    );
  }),
);
