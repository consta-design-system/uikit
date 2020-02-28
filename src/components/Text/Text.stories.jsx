import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Text from '.';

const defaultKnobs = () => ({
  tag: select('Tag', ['p', 'div', 'a', 'span', 'h1', 'h2'], 'p'),
  align: select('Align', ['left', 'center', 'right'], 'left'),
  decoration: select('Underline', ['underline', false], false),
  display: select('Display', ['block', 'inline-block', 'inline'], 'block'),
  font: select('Font', ['mono', 'sans', 'serif'], 'serif'),
  lineHeight: select('Line height', ['2xs', 'xs', 's', 'm', 'l'], 'm'),
  size: select('Size', ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'], 'm'),
  spacing: select('Spacing', ['xs', 's', 'm', 'l', false], false),
  fontStyle: select('Italic', ['italic', false], false),
  transform: select('Uppercase', ['uppercase', false], false),
  type: select('Type', ['blockquote', 'p', 'h3', 'h2', 'h1', false], false),
  view: select(
    'View',
    ['alert', 'brand', 'ghost', 'link', 'link-minor', 'primary', 'secondary', 'success', 'warning'],
    'primary',
  ),
  weight: select('Weight', ['black', 'bold', 'light', 'regular', 'semibold', 'thin'], 'regular'),
});

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Текст', () => (
    <Text href="#" {...defaultKnobs()}>
      {text(
        'Content',
        'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот текст ничем не привлекает.',
      )}
    </Text>
  ));
