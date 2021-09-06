import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import {
  Text,
  textPropAlign,
  textPropCursor,
  textPropDecoration,
  textPropDisplay,
  textPropFont,
  textPropFontStyle,
  textPropLineHeight,
  textPropSize,
  textPropSizeDefault,
  textPropSpacing,
  textPropTransform,
  textPropType,
  textPropView,
  textPropViewDefault,
  textPropWeight,
} from '../Text';

import mdx from './Text.docs.mdx';

const defaultKnobs = () => ({
  as: select('as', ['p', 'div', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], undefined),
  align: select('align', ['', ...textPropAlign], ''),
  cursor: select('cursor', ['', ...textPropCursor], ''),
  decoration: select('decoration', ['', ...textPropDecoration], ''),
  display: select('display', ['', ...textPropDisplay], ''),
  font: select('font', textPropFont, 'primary'),
  lineHeight: select('lineHeight', ['', ...textPropLineHeight], ''),
  size: select('size', textPropSize, textPropSizeDefault),
  spacing: select('spacing', ['', ...textPropSpacing], ''),
  fontStyle: select('fontStyle', ['', ...textPropFontStyle], ''),
  transform: select('transform', ['', ...textPropTransform], ''),
  type: select('type', ['', ...textPropType], ''),
  view: select('View', textPropView, textPropViewDefault),
  weight: select('weight', ['', ...textPropWeight], ''),
  text: text(
    'Content',
    'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот текст ничем не привлекает.',
  ),
});

export function Playground() {
  const {
    as,
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
    text,
  } = defaultKnobs();

  return (
    <Text
      as={as}
      align={align || undefined}
      cursor={cursor || undefined}
      decoration={decoration || undefined}
      display={display || undefined}
      font={font}
      lineHeight={lineHeight || undefined}
      size={size}
      spacing={spacing || undefined}
      fontStyle={fontStyle || undefined}
      transform={transform || undefined}
      type={type || undefined}
      view={view || undefined}
      weight={weight || undefined}
    >
      {text}
    </Text>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Text',
  id: 'components/Text',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
