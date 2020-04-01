import React from 'react';
import { cn } from '../../utils/bem';
import './Text.css';

export const cnText = cn('text');

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
  | '6xl'
  | '';

export type TextPropLineHeight = '2xs' | 'xs' | 's' | 'm' | 'l' | '';

export type TextProps = {
  as?: React.ElementType;
  align?: 'left' | 'center' | 'right' | '';
  decoration?: 'underline' | '';
  display?: 'block' | 'inline-block' | 'inline' | '';
  font?: 'mono' | 'sans' | 'serif' | '';
  lineHeight?: TextPropLineHeight;
  size?: TextPropSize;
  spacing?: 'xs' | 's' | 'm' | 'l' | '';
  fontStyle?: 'italic' | '';
  transform?: 'uppercase' | '';
  type?: 'blockquote' | 'p' | 'h3' | 'h2' | 'h1' | '';
  view?:
    | 'alert'
    | 'brand'
    | 'ghost'
    | 'link'
    | 'link-minor'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | '';

  weight?: 'black' | 'bold' | 'light' | 'regular' | 'semibold' | 'thin' | '';
  width?: 'default' | '';
  className?: string;
  children: React.ReactNode;
};

declare type excludeHTMLAttributes =
  | 'as'
  | 'align'
  | 'decoration'
  | 'font'
  | 'lineHeight'
  | 'size'
  | 'spacing'
  | 'fontStyle'
  | 'transform'
  | 'type'
  | 'view'
  | 'weight'
  | 'width'
  | 'className'
  | 'children';

export type IText<T> = TextProps &
  (Omit<React.HTMLAttributes<Element>, excludeHTMLAttributes> | Omit<T, excludeHTMLAttributes>);

export function Text<T>(props: IText<T>) {
  const {
    as = 'div',
    align,
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
    className,
    children,
    ...otherProps
  } = props;

  const Component = as;

  return (
    <Component
      className={cnText(
        {
          align,
          decoration,
          display,
          font,
          'line-height': lineHeight,
          size,
          spacing,
          style: fontStyle,
          transform,
          type,
          view,
          weight,
          width,
        },
        [className]
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
}
