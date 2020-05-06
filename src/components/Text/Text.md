# Text  

Весь текст на странице должен быть обернут в компонент `Text`, а стили должны задаваться свойствами.

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React from 'react';
import { Text } from '@gpn-design/uikit/Text';

export function App() {
  return (
    <Text
      as = 'div'
      align = 'center'
      decoration = 'none'
      display = 'block'
      font = 'mono'
      lineHeight = '2xs'
      size = 'm'
      spacing = 'xs'
      type = 'p'
      view = 'primary'
      weight = 'regular'
      width = 'default'
      className = 'custom-class-name'
    >
      Текст
    </>
  );
}
```

## Свойства

<!-- props:start -->

| Свойство    | Тип                                                                                                     | По умполчанию | Описание                                                      |
|-------------|---------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| as?         | `React.ElementType`                                                                                     | div           | Определяет какой html элемент отрендерится в DOM              |
| align?      | `'left' | 'center' | 'right'`                                                                           | —             | Выравнивание текста                                           |
| decoration? | `underline`                                                                                             | —             | Оформление текста в виде подчеркивания                        |
| display?    | `'block' | 'inline-block' | 'inline'`                                                                   | —             | Определяет как текстовый блок должен быть показан в документе |
| font?       | `'mono' | 'sans' | 'serif'`                                                                             | —             | Гарнитура текста                                              |
| lineHeight? | `'2xs' | 'xs' | 's' | 'm' | 'l'`                                                                        | —             | Высота линии текста                                           |
| size?       | `'2xs'| 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'`                          | —             | Размер текста                                                 |
| spacing?    | `'xs' | 's' | 'm' | 'l'`                                                                                | —             | Межбуквенное расстояние текста                                |
| fontStyle?  | `italic`                                                                                                | —             | Начертание текста                                             |
| transform?  | `uppercase`                                                                                             | —             | Преобразование текста в прописные символы                     |
| type?       | `'blockquote' | 'p' | 'h3' | 'h2' | 'h1'`                                                               | —             | Определяет уровень заголовока или абзац                       |
| view?       | `'alert' | 'brand' | 'ghost' | 'link' | 'link-minor' | 'primary' | 'secondary' | 'success' | 'warning'` | `primary`     | Внешний вид текста                                            |
| weight?     | `'black' | 'bold' | 'light' | 'regular' | 'semibold' | 'thin'`                                          | —             | Насыщенность текста                                           |
| width?      | `default`                                                                                               | —             | Ширина контейнера с текстом                                   |
| className?  | `string`                                                                                                | —             | Дополнительные классы для блока текста                        |
| children?   | `React.ReactNode`                                                                                       | —             | Дочерние компоненты                                           |
| innerRef?   | `React.Ref`                                                                                             | —             | Ссылка на корневой DOM элемент компонента                     |

<!-- props:end -->

## Примеры

### Align

Модификатор на выравнивание текста

```ts
import React, { Fragment } from 'react';
import { Text, TextPropAlign } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--align%}}

### Decoration

Модификатор на декорирование текста

```ts
import React, { Fragment } from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Fragment>
      <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
        text_decoration_underline
      </Text>
      <Text decoration="underline">Газпром Нефть</Text>
    </Fragment>
  );
}
```

{{%story::desktop:ui-kit-examples-text--decoration%}}

### Line-height

Модификатор на высоту строки

```ts
import React, { Fragment } from 'react';
import { Text, TextPropLineHeight } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--lineheight%}}

### Size

Модификатор на размер текста

```ts
import React, { Fragment } from 'react';
import { Text, TextPropSize } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--size%}}

### Spacing

Модификатор на межбуквенное расстояние

```ts
import React, { Fragment } from 'react';
import { Text, TextPropSpacing } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--spacing%}}

### Style

Модификатор на начертание

```ts
import React, { Fragment } from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Fragment>
      <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
        text_style_italic
      </Text>
      <Text fontStyle="italic">Газпром Нефть</Text>
    </Fragment>
  );
}
```

{{%story::desktop:ui-kit-examples-text--style%}}

### Transform

Модификатор на регистр

```ts
import React, { Fragment } from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Fragment>
      <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
        text_style_italic
      </Text>
      <Text transform="uppercase">Газпром Нефть</Text>
    </Fragment>
  );
}
```

{{%story::desktop:ui-kit-examples-text--transform%}}

### View

Модификатор на описание цвета текста

```ts
import React, { Fragment } from 'react';
import { Text, TextPropView } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--view%}}

### Weight

Модификатор для задания жирности текста.

> Браузер имитирует шрифт с заданной жирностью, если такового нет в наборе. Поэтому убедитесь, что жирность, которую вы используете, существует.

```ts
import React, { Fragment } from 'react';
import { Text, TextPropWeight } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--weight%}}

### Заголовок с абзацем

Пример классической конструкции: заголовок и абзац текста

```ts
import React, { Fragment } from 'react';
import { Text } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--headingandparagraph%}}

### Подпись и данные

Используется в формах с данными

```ts
import React, { Fragment } from 'react';
import { Text } from '@gpn-design/uikit/Text';
import * as wp from '../../utils/whitepaper/whitepaper';

function App() {
  return (
    <Fragment>
      <div className={wp.decorator({ 'indent-b': 'm' })}>
        <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
          ФИО
        </Text>
        <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
          Колебаев Илья Сергеевич
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
}
```

{{%story::desktop:ui-kit-examples-text--labelanddata%}}

### Форматирование частей абзаца

Чтобы обратить внимание на важные части текста

```ts
import React from 'react';
import { Text } from '@gpn-design/uikit/Text';

function App() {
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
}
```

{{%story::desktop:ui-kit-examples-text--combinedweightandstyle%}}