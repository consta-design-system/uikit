import React from 'react';
import bem from '../../utils/bem';
import './styles.css';

const b = bem('text');

type CommonProps = {
  tag: string;
  align?: 'left' | 'center' | 'right';
  decoration?: 'underline';
  display?: 'block' | 'inline-block' | 'inline';
  font?: 'mono' | 'sans' | 'serif';
  lineHeight?: '2xs' | 'xs' | 's' | 'm' | 'l';
  size?: '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  spacing?: 'xs' | 's' | 'm' | 'l';
  fontStyle?: 'italic';
  transform?: 'uppercase';
  type?: 'blockquote' | 'p' | 'h3' | 'h2' | 'h1';
  view?:
    | 'alert'
    | 'brand'
    | 'ghost'
    | 'link'
    | 'link-minor'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning';
  weight?: 'black' | 'bold' | 'light' | 'regular' | 'semibold' | 'thin';
  width?: 'default';
  className?: string;
};

const Text: React.FC<CommonProps> = props => {
  const {
    tag = 'div',
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
    ...rest
  } = props;

  return React.createElement(
    tag,
    {
      className: b(
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
        className,
      ),
      ...rest,
    },
    children,
  );
};

export default Text;
