# Text

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
    />
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

