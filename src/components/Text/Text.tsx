import './Text.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import * as wp from '../../utils/whitepaper/whitepaper';

export type TextPropAlign = 'left' | 'center' | 'right';
export type TextPropDecoration = 'underline';
export type TextPropDisplay = 'block' | 'inline-block' | 'inline';
export type TextPropFont = 'primary' | 'mono';
export type TextPropLineHeight = '2xs' | 'xs' | 's' | 'm' | 'l';
export type TextPropSize =
  | '2xs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';
export type TextPropSpacing = 'xs' | 's' | 'm' | 'l';
export type TextPropFontStyle = 'italic';
export type TextPropTransform = 'uppercase';
export type TextPropType = 'blockquote' | 'p' | 'h3' | 'h2' | 'h1';
export type TextPropView =
  | 'alert'
  | 'brand'
  | 'ghost'
  | 'link'
  | 'link-minor'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';
export type TextPropWeight = 'black' | 'bold' | 'light' | 'regular' | 'semibold' | 'thin';
export type TextPropWidth = 'default';

type Props = {
  align?: TextPropAlign;
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

export const Text: ComponentWithAs<Props> = forwardRefWithAs<Props>((props, ref) => {
  const {
    as = 'div',
    align,
    decoration,
    display,
    font,
    lineHeight,
    size = 'm',
    spacing,
    fontStyle,
    transform,
    type,
    view = 'primary',
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
      className={cnText(null, [
        wp.text({
          align,
          decoration,
          display,
          font,
          'line-height': lineHeight,
          size,
          spacing,
          'style': fontStyle,
          transform,
          type,
          view,
          weight,
          width,
        }),
        className,
      ])}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
