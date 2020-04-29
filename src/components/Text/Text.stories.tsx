import React, { Fragment } from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from './Text';

const defaultKnobs = () => ({
  as: select('as', ['p', 'div', 'a', 'span', 'h1', 'h2'], undefined),
  align: select('align', ['left', 'center', 'right'], undefined),
  decoration: select('decoration', ['underline'], undefined),
  display: select('display', ['block', 'inline-block', 'inline'], undefined),
  font: select('font', ['mono', 'sans', 'serif'], 'serif'),
  lineHeight: select('lineHeight', ['2xs', 'xs', 's', 'm', 'l'], undefined),
  size: select(
    'size',
    ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    undefined
  ),
  spacing: select('spacing', ['xs', 's', 'm', 'l'], undefined),
  fontStyle: select('fontStyle', ['italic'], undefined),
  transform: select('transform', ['uppercase'], undefined),
  type: select('type', ['blockquote', 'p', 'h3', 'h2', 'h1'], undefined),
  view: select(
    'View',
    ['alert', 'brand', 'ghost', 'link', 'link-minor', 'primary', 'secondary', 'success', 'warning'],
    'primary'
  ),
  weight: select('weight', ['black', 'bold', 'light', 'regular', 'semibold', 'thin'], 'regular'),
});

storiesOf('UI-KIT|/Text', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./Text.md')['default'],
      },
    })
  )
  .add('Текст', () => (
    <Text<{ href: string }> href="#" {...defaultKnobs()}>
      {text(
        'Content',
        'Чтобы человек захотел это прочитать, у него должна быть очень веская причина. Может быть, его заставили. Может быть, это модный автор, и все друзья уже прочитали. Может быть, где-то здесь в тексте решение его насущной проблемы. Или он просто устроился в кресле, чтобы познакомиться с классной книгой. В любом случае нужна веская причина. Сам по себе этот текст ничем не привлекает.'
      )}
    </Text>
  ));

storiesOf('UI-KIT|/Examples/Text', module)
  .add('_size', () => {
    return (
      <Fragment>
        <Text
          as="div"
          align="left"
          font="sans"
          lineHeight="l"
          size="2xl"
          spacing="m"
          transform="uppercase"
          view="primary"
          weight="bold"
          type="h3"
        >
          Заголовок несет суть
        </Text>
        <Text as="p" align="left" font="serif" lineHeight="s" size="s" view="primary">
          Абзац – это часть текста между отступами с новой строки. Абзац можно назвать микротекстом.
          В общей теме могут выделяться и микротемы. При этом каждый абзац раскрывает свою
          микротему. Что же ещё можно сказать про абзацы? Мы видим, что обычно в абзацах несколько
          предложений. И в таком случае каждый абзац служит для выделения своей микротемы.
        </Text>
      </Fragment>
    );
  })
  .add('_view', () => {
    return (
      <StoryBookExample>
        <Text size="l" align="left" font="sans" view="primary">
          Primary используется для основного текста
        </Text>
        <Text size="l" align="left" font="sans" view="secondary">
          Secondary используется для второстепенного текста
        </Text>
        <Text size="l" align="left" font="sans" view="warning">
          Warning используется для предупреждений
        </Text>
        <Text size="l" align="left" font="sans" view="alert">
          Alert используется для ошибок
        </Text>
      </StoryBookExample>
    );
  });
