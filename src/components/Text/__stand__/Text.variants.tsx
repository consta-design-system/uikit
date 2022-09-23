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

type WithUndefindValue = <T extends unknown>(
  value: T,
) => Exclude<T, 'undefined'> | undefined;

const valueWithUndefined: WithUndefindValue = (value) => {
  return value !== 'undefined'
    ? (value as Exclude<typeof value, 'undefined'>)
    : undefined;
};

type OptionsWithUndefined = <T extends unknown>(
  value: readonly T[] | T[],
) => Array<T | 'undefined'>;

const optionsWithUndefined: OptionsWithUndefined = (options) => {
  return ['undefined', ...options];
};

const Variants = () => {
  const as = useSelect(
    'as',
    ['div', 'p', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    'p',
  );
  const align = useSelect(
    'align',
    optionsWithUndefined(textPropAlign),
    'undefined',
  );
  const cursor = useSelect(
    'cursor',
    optionsWithUndefined(textPropCursor),
    'undefined',
  );
  const decoration = useSelect(
    'decoration',
    optionsWithUndefined(textPropDecoration),
    'undefined',
  );
  const display = useSelect(
    'display',
    optionsWithUndefined(textPropDisplay),
    'undefined',
  );
  const font = useSelect('font', textPropFont, 'primary');
  const lineHeight = useSelect(
    'lineHeight',
    optionsWithUndefined(textPropLineHeight),
    'undefined',
  );
  const size = useSelect('size', textPropSize, textPropSizeDefault);
  const spacing = useSelect(
    'spacing',
    optionsWithUndefined(textPropSpacing),
    'undefined',
  );
  const fontStyle = useSelect(
    'fontStyle',
    optionsWithUndefined(textPropFontStyle),
    'undefined',
  );
  const transform = useSelect(
    'transform',
    optionsWithUndefined(textPropTransform),
    'undefined',
  );
  const type = useSelect(
    'type',
    optionsWithUndefined(textPropType),
    'undefined',
  );
  const view = useSelect('View', textPropView, textPropViewDefault);
  const weight = useSelect(
    'weight',
    optionsWithUndefined(textPropWeight),
    'undefined',
  );
  const truncate = useBoolean('truncate', false);
  const text = useText(
    'Content',
    'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот const текст ничем не привлекает.',
  );

  return (
    <Text
      as={as}
      align={valueWithUndefined(align)}
      cursor={valueWithUndefined(cursor)}
      decoration={valueWithUndefined(decoration)}
      display={valueWithUndefined(display)}
      font={font}
      lineHeight={valueWithUndefined(lineHeight)}
      size={valueWithUndefined(size)}
      spacing={valueWithUndefined(spacing)}
      fontStyle={valueWithUndefined(fontStyle)}
      transform={valueWithUndefined(transform)}
      type={valueWithUndefined(type)}
      view={valueWithUndefined(view)}
      weight={valueWithUndefined(weight)}
      truncate={truncate}
    >
      {text}
    </Text>
  );
};

export default Variants;
