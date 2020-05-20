import React, { Fragment } from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import * as wp from '../../utils/whitepaper/whitepaper';
import {
  Text,
  TextPropAlign,
  TextPropLineHeight,
  TextPropSize,
  TextPropSpacing,
  TextPropView,
  TextPropWeight,
} from './Text';

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
  .add('_align', () => {
    const align: Array<TextPropAlign> = ['left', 'center', 'right'];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 3, col: 'gap_third', row: 'third' })}>
        {align.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
              {`text_align_${item}`}
            </Text>
            <Text align={item}>Газпром Нефть</Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_decoration', () => {
    return (
      <Fragment>
        <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
          text_decoration_underline
        </Text>
        <Text decoration="underline">Газпром Нефть</Text>
      </Fragment>
    );
  })
  .add('_lineheight', () => {
    const lineHeight: Array<TextPropLineHeight> = ['2xs', 'xs', 's', 'm', 'l'];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' })}>
        {lineHeight.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
              {`text_line-height_${item}`}
            </Text>
            <Text lineHeight={item}>
              «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
            </Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_size', () => {
    const size: Array<TextPropSize> = [
      '2xs',
      'xs',
      's',
      'm',
      'l',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
    ];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' })}>
        {size.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
              {`text_size_${item}`}
            </Text>
            <Text size={item}>Нефть</Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_spacing', () => {
    const spacing: Array<TextPropSpacing> = ['xs', 's', 'm', 'l'];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' })}>
        {spacing.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
              {`text_spacing_${item}`}
            </Text>
            <Text spacing={item}>
              «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
            </Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_style', () => {
    return (
      <Fragment>
        <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
          text_style_italic
        </Text>
        <Text fontStyle="italic">Газпром Нефть</Text>
      </Fragment>
    );
  })
  .add('_transform', () => {
    return (
      <Fragment>
        <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
          text_transform_uppercase
        </Text>
        <Text transform="uppercase">Газпром Нефть</Text>
      </Fragment>
    );
  })
  .add('_view', () => {
    const view: Array<TextPropView> = [
      'alert',
      'brand',
      'ghost',
      'link',
      'link-minor',
      'primary',
      'secondary',
      'success',
      'warning',
    ];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' })}>
        {view.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
              {`text_view_${item}`}
            </Text>
            <Text size="l" view={item}>
              Газпром Нефть
            </Text>
          </div>
        ))}
      </div>
    );
  })
  .add('_weight', () => {
    const weight: Array<TextPropWeight> = ['black', 'bold', 'semibold', 'regular', 'light', 'thin'];
    return (
      <div className={wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' })}>
        {weight.map((item, index) => (
          <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
              {`text_weight_${item}`}
            </Text>
            <Text size="l" weight={item}>
              Газпром Нефть
            </Text>
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
  })
  .add('_labelanddata', () => {
    return (
      <Fragment>
        <div className={wp.decorator({ 'indent-b': 'm' })}>
          <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
            ФИО
          </Text>
          <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
            Иванов Дмитрий Петрович
          </Text>
        </div>
        <div className={wp.decorator({ 'indent-b': 'm' })}>
          <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
            Должность сотрудника
          </Text>
          <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
            Инженер по бурению
          </Text>
        </div>
        <div className={wp.decorator({ 'indent-b': 'm' })}>
          <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
            Подразделение
          </Text>
          <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
            Группа разведки и бурения
          </Text>
        </div>
      </Fragment>
    );
  })
  .add('_combinedweightandstyle', () => {
    return (
      <Text as="div" align="left" font="sans" lineHeight="l" size="m" view="primary" type="p">
        <Text as="span" fontStyle="italic">
          Примечание.&nbsp;
        </Text>
        База скважин сформирована на основе отчетов сотрудников. Любые&nbsp;
        <Text weight="black" as="span">
          срочные изменения
        </Text>{' '}
        должны вноситься по регламенту в сроки, указанные Центром Разработок.
      </Text>
    );
  });
