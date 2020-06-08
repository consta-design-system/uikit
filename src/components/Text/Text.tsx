import './Text.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { componentIsFunction } from '../../utils/componentIsFunction';
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

export type TextProps = {
  as?: React.ElementType;
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
  className?: string;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLElement>;
};

export type IText<T = {}> = TextProps &
  (Omit<React.HTMLAttributes<Element>, keyof (TextProps & T)> & Omit<T, keyof TextProps>);

export const cnText = cn('Text');

export function Text<T>(props: IText<T>): React.ReactElement | null {
  const {
    as: Component = 'div',
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
    innerRef,
    ...otherProps
  } = props;

  return (
    <Component
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
      ref={innerRef}
      {...(componentIsFunction(Component) && { innerRef })}
    >
      {children}
    </Component>
  );
}
