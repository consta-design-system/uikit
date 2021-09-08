import './Text.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const textPropAlign = ['left', 'center', 'right'] as const;
export type TextPropAlign = typeof textPropAlign[number];

export const textPropDisplay = ['block', 'inlineBlock', 'inline'] as const;
export type TextPropDisplay = typeof textPropDisplay[number];

export const textPropFont = ['primary', 'mono'] as const;
export type TextPropFont = typeof textPropFont[number];

export const textPropCursor = ['pointer'] as const;
export type TextPropCursor = typeof textPropCursor[number];

export const textPropDecoration = ['underline'] as const;
export type TextPropDecoration = typeof textPropDecoration[number];

export const textPropLineHeight = ['2xs', 'xs', 's', 'm', 'l'] as const;
export type TextPropLineHeight = typeof textPropLineHeight[number];
export const textPropLineHeightDefault: TextPropLineHeight = 'm';

export const textPropSize = [
  'm',
  '2xs',
  'xs',
  's',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const;
export type TextPropSize = typeof textPropSize[number];
export const textPropSizeDefault: TextPropSize = textPropSize[0];

export const textPropSpacing = ['xs', 's', 'm', 'l'] as const;
export type TextPropSpacing = typeof textPropSpacing[number];

export const textPropType = ['blockquote', 'p', 'h3', 'h2', 'h1'] as const;
export type TextPropType = typeof textPropType[number];

export const textPropView = [
  'primary',
  'alert',
  'brand',
  'ghost',
  'link',
  'linkMinor',
  'primary',
  'secondary',
  'success',
  'warning',
] as const;
export type TextPropView = typeof textPropView[number];
export const textPropViewDefault: TextPropView = textPropView[0];

export const textPropWeight = ['black', 'bold', 'light', 'regular', 'semibold', 'thin'] as const;
export type TextPropWeight = typeof textPropWeight[number];

export const textPropFontStyle = ['italic'] as const;
export type TextPropFontStyle = typeof textPropFontStyle[number];

export const textPropTransform = ['uppercase'] as const;
export type TextPropTransform = typeof textPropTransform[number];

export const textPropWidth = ['default'] as const;
export type TextPropWidth = typeof textPropWidth[number];

type Props = {
  align?: TextPropAlign;
  cursor?: TextPropCursor;
  decoration?: TextPropDecoration;
  display?: TextPropDisplay;
  font?: TextPropFont;
  lineHeight?: TextPropLineHeight;
  size?: TextPropSize;
  spacing?: TextPropSpacing;
  fontStyle?: TextPropFontStyle;
  transform?: TextPropTransform;
  type?: TextPropType;
  view?: TextPropView;
  weight?: TextPropWeight;
  width?: TextPropWidth;
};

export const cnText = cn('Text');

export const Text = forwardRefWithAs<Props>((props, ref) => {
  const {
    as = 'div',
    align,
    cursor,
    decoration,
    display,
    font,
    lineHeight = textPropLineHeightDefault,
    size = textPropSizeDefault,
    spacing,
    fontStyle,
    transform,
    type,
    view = textPropViewDefault,
    weight,
    width,
    className,
    children,
    ...otherProps
  } = props;

  const Tag = as as string;

  return (
    <Tag
      {...otherProps}
      className={cnText(
        {
          align,
          cursor,
          decoration,
          display,
          font,
          lineHeight,
          size,
          spacing,
          fontStyle,
          transform,
          type,
          view,
          weight,
          width,
        },
        [className],
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
