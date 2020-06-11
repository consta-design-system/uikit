# ProgressSpin

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React from 'react';
import { ProgressSpin } from '@gpn-design/uikit/ProgressSpin';

const App = () => {
  return <ProgressSpin progress={70} />;
};
```

## Свойства

<!-- props:start -->

| Свойство   | Тип                        | По умолчанию | Описание                                  |
| ---------- | -------------------------- | ------------ | ----------------------------------------- |
| size?      | `'m' | 's'`                | `'m'`        | Размер                                    |
| animation? | `boolean`                  | -            | Включает плавное изменение прогрессбара   |
| progress?  | `number`                   | -            | Процент заполнения прогрессбара           |
| className? | `string`                   | -            | Дополнительный класс                      |
| ref?       | `React.Ref<SVGSVGElement>` | -            | Ссылка на корневой DOM элемент компонента |

<!-- props:end -->

## Примеры

### Размер

Чтобы изменить размер, используйте модификатор `_size`.

```ts
<ProgressSpin progress={70} size="m" />
<ProgressSpin progress={70} size="s" />
```

{{%story::desktop:ui-kit-examples-progressspin--size%}}

### Процент заполнения прогрессбара

Чтобы изменить размер, используйте модификатор `_progress`.

```ts
<ProgressSpin progress={20} size="m" />
<ProgressSpin progress={70} size="m" />
<ProgressSpin progress={90} size="m" />
```

{{%story::desktop:ui-kit-examples-progressspin--progress%}}
