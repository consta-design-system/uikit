# Text  

Весь текст на странице должен быть обернут в компонент `Text`, а стили должны задаваться модификаторами.
::::: ИЛИ ПРОПСАМИ, ИЛИ СВОЙСТВАМИ ???? :::::

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
import { Text } from '@gpn-design/uikit/Text';

function App() {
  return (
      
  );
}
```

{{%story::desktop:ui-kit-examples-text--align%}}

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