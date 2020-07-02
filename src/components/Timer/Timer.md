# Timer

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React from 'react';
import { Timer } from '@gpn-design/uikit/Timer';

const App = () => {
  return <Timer seconds={5} progress={80} />;
};
```

## Свойства

<!-- props:start -->

| Свойство   | Тип                         | По умолчанию | Описание                                  |
| ---------- | --------------------------- | ------------ | ----------------------------------------- |
| size?      | `'m' | 's'`                 | `'m'`        | Размер                                    |
| seconds?   | `number`                    | `5`          | Секунды                                   |
| progress?  | `number`                    | `0`          | Процент заполнения прогрессбара           |
| animation? | `boolean`                   | -            | Включает плавное изменение прогрессбара   |
| className? | `string`                    | -            | Дополнительный класс                      |
| ref?       | `React.Ref<HTMLDivElement>` | -            | Ссылка на корневой DOM элемент компонента |

<!-- props:end -->

## Примеры

### Размер

Чтобы изменить размер, используйте модификатор `_size`.

```ts
<Timer size="m" seconds={5} progress={80} />
<Timer size="s" seconds={5} progress={80} />
```

{{%story::desktop:ui-kit-examples-timer--size%}}

### Изменить скорость анимации

по умолчанию скорость анимации равна 1сек, она указавается в переменной css

`--animation-duration: 1s;`

```css
.MyBlock.Timer-Progress.ProgressSpin {
  --animation-duration: 5s;
}
```
