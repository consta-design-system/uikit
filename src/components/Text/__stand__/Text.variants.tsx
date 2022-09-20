import * as React from 'react';
import { useBoolean, useSelect, useText } from '@consta/stand';

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

const Variants = () => {
  const as = useSelect('as', ['p', 'div', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], undefined);
  const align = useSelect('align', ['', ...textPropAlign], '');
  const cursor = useSelect('cursor', ['', ...textPropCursor], '');
  const decoration = useSelect('decoration', ['', ...textPropDecoration], '');
  const display = useSelect('display', ['', ...textPropDisplay], '');
  const font = useSelect('font', textPropFont, 'primary');
  const lineHeight = useSelect('lineHeight', ['', ...textPropLineHeight], '');
  const size = useSelect('size', textPropSize, textPropSizeDefault);
  const spacing = useSelect('spacing', ['', ...textPropSpacing], '');
  const fontStyle = useSelect('fontStyle', ['', ...textPropFontStyle], '');
  const transform = useSelect('transform', ['', ...textPropTransform], '');
  const type = useSelect('type', ['', ...textPropType], '');
  const view = useSelect('View', textPropView, textPropViewDefault);
  const weight = useSelect('weight', ['', ...textPropWeight], '');
  const truncate = useBoolean('truncate', false);
  const text = useText(
    'Content',
    'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот const текст ничем не привлекает.',
);


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
      truncate={truncate}
    >
      {text}
    </Text>
  );
}

export default Variants;
