import { useBoolean, useSelect, useText } from '@consta/stand';
import * as React from 'react';

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
  const as = useSelect(
    'as',
    ['div', 'p', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    'p',
  );
  const align = useSelect('align', textPropAlign);
  const cursor = useSelect('cursor', textPropCursor);
  const decoration = useSelect('decoration', textPropDecoration);
  const display = useSelect('display', textPropDisplay);
  const font = useSelect('font', textPropFont, 'primary');
  const lineHeight = useSelect('lineHeight', textPropLineHeight);
  const size = useSelect('size', textPropSize, textPropSizeDefault);
  const spacing = useSelect('spacing', textPropSpacing);
  const fontStyle = useSelect('fontStyle', textPropFontStyle);
  const transform = useSelect('transform', textPropTransform);
  const type = useSelect('type', textPropType);
  const view = useSelect('View', textPropView, textPropViewDefault);
  const weight = useSelect('weight', textPropWeight);
  const truncate = useBoolean('truncate', false);
  const text = useText(
    'Content',
    'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот const текст ничем не привлекает.',
  );

  return (
    <Text
      as={as}
      align={align}
      cursor={cursor}
      decoration={decoration}
      display={display}
      font={font}
      lineHeight={lineHeight}
      size={size}
      spacing={spacing}
      fontStyle={fontStyle}
      transform={transform}
      type={type}
      view={view}
      weight={weight}
      truncate={truncate}
    >
      {text}
    </Text>
  );
};

export default Variants;
