import React, { Fragment } from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text, TextPropAlign } from './Text';

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

// классы для tpl-grid из whitepaper
// используется ТОЛЬКО для документации
const grid = {
  parent: 'tpl-grid tpl-grid_xs-columns_3 tpl-grid_col-gap_third tpl-grid_row-gap_third',
  fraction: 'tpl-grid__fraction tpl-grid__fraction_s-col_1',
};

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
  .add('_align', () => {
    // const align = ['left', 'center', 'right'];
    const align: Array<TextPropAlign> = ['left', 'center', 'right'];
    return (
      <div className={grid.parent}>
        {align.map((item, index) => (
          <div key={index} className={grid.fraction}>
            <Text align={item}>Газпром Нефть</Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_headingandparagraph', () => {
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
  });
