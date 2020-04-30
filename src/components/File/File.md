# File

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React from 'react';
import { File } from '@gpn-design/uikit/File';

const App = () => {
  return <File extension="doc" />;
};
```

## Свойства

<!-- props:start -->

| Свойство         | Тип                         | По умолчанию | Описание                                  |
| ---------------- | --------------------------- | ------------ | ----------------------------------------- |
| size?            | `'m' | 's'`                 | `'m'`        | Размер                                    |
| extension?       | `string`                    | -            | Расширение файла                          |
| loading?         | `boolean`                   | -            | Индикация загрузки                        |
| loadingProgress? | `number`                    | -            | Указывает прогресс индикации загрузки     |
| className?       | `string`                    | -            | Дополнительный класс                      |
| innerRef?        | `React.Ref<HTMLDivElement>` | -            | Ссылка на корневой DOM элемент компонента |

<!-- props:end -->

## Примеры

### Размер

Чтобы изменить размер, используйте модификатор `_size`

```ts
<File size="m" />
<File size="s" />
```

{{%story::desktop:ui-kit-examples-file--size%}}

### Расширение

Указывая свойство `extension` компонент меняет иконку файла

```ts
<File extension="doc" />
<File extension="docx" />
<File extension="jpg" />
<File extension="mov" />
<File extension="BlaBla" />
```

{{%story::desktop:ui-kit-examples-file--extension%}}

### Индикатор загрузки

Указывая свойство `loading` включаете индикацию загрузки, также можете управлять прогрессбаром загрузки через свойство `loadingProgress`

```ts
<File loading />
<File loading loadingProgress={30} />
<File loading loadingProgress={60} />
<File loading loadingProgress={90} />
```

{{%story::desktop:ui-kit-examples-file--loading%}}
