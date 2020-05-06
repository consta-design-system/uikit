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
      as = 'p'
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
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text align="left">Газпром Нефть</Text>
    <Text align="center">Газпром Нефть</Text>
    <Text align="right">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--align%}}

### Decoration

Модификатор на декорирование текста

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text decoration="underline">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--decoration%}}

### Line-height

Модификатор на высоту строки

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text lineHeight="2xs">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text lineHeight="xs">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text lineHeight="s">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text lineHeight="m">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text lineHeight="l">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--lineheight%}}

### Size

Модификатор на размер текста

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text size="2xs">Нефть</Text>
    <Text size="xs">Нефть</Text>
    <Text size="s">Нефть</Text>
    <Text size="m">Нефть</Text>
    <Text size="l">Нефть</Text>
    <Text size="xl">Нефть</Text>
    <Text size="2xl">Нефть</Text>
    <Text size="3xl">Нефть</Text>
    <Text size="4xl">Нефть</Text>
    <Text size="5xl">Нефть</Text>
    <Text size="6xl">Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--size%}}

### Spacing

Модификатор на межбуквенное расстояние

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text spacing="xs">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text spacing="s">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text spacing="m">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
    <Text spacing="l">
      «Газпром Нефть» ведет работу в крупнейших российских нефтегазовых регионах.
    </Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--spacing%}}

### Style

Модификатор на начертание

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text fontStyle="italic">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--style%}}

### Transform

Модификатор на регистр

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text transform="uppercase">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--transform%}}

### View

Модификатор на описание цвета текста

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text view="alert">Газпром Нефть</Text>
    <Text view="brand">Газпром Нефть</Text>
    <Text view="ghost">Газпром Нефть</Text>
    <Text view="link">Газпром Нефть</Text>
    <Text view="link-minor">Газпром Нефть</Text>
    <Text view="primary">Газпром Нефть</Text>
    <Text view="secondary">Газпром Нефть</Text>
    <Text view="success">Газпром Нефть</Text>
    <Text view="warning">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--view%}}

### Weight

Модификатор для задания жирности текста.

> Браузер имитирует шрифт с заданной жирностью, если такового нет в наборе. Поэтому убедитесь, что жирность, которую вы используете, существует.

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text weight="black">Газпром Нефть</Text>
    <Text weight="bold">Газпром Нефть</Text>
    <Text weight="semibold">Газпром Нефть</Text>
    <Text weight="regular">Газпром Нефть</Text>
    <Text weight="light">Газпром Нефть</Text>
    <Text weight="thin">Газпром Нефть</Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--weight%}}

### Заголовок с абзацем

Пример классической конструкции: заголовок и абзац текста

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
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
  );
}
```

{{%story::desktop:ui-kit-examples-text--headingandparagraph%}}

### Подпись и данные

Используется в формах с данными

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

function App() {
  return (
    <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
      ФИО
    </Text>
    <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
      Колебаев Илья Сергеевич
    </Text>
    <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
      Должность сотрудника
    </Text>
    <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
      Инженер по бурению
    </Text>
    <Text as="div" align="left" font="sans" lineHeight="l" size="s" view="secondary" type="p">
      Подразделение
    </Text>
    <Text as="div" align="left" font="serif" lineHeight="l" size="l" view="primary">
      Группа разведки и бурения
    </Text>
  );
}
```

{{%story::desktop:ui-kit-examples-text--labelanddata%}}

### Форматирование частей абзаца

Чтобы обратить внимание на важные части текста

```ts
import React from 'react';
import Text from '@gpn-design/uikit/Text';

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