# Tabs

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React, { useState } from 'react';
import { Tabs } from '@gpn-design/uikit/Tabs';

type Item = string;

const items = ['один', 'два', 'три'];

export function App() {
  const [value, setValue] = useState<string[] | null | undefined>(['три']);
  return (
    <Tabs<Item>
      value={value}
      onChange={({ value }) => setValue(value)}
      items={items}
      getItemKey={(item) => item}
      getItemLabel={(item) => item}
    />
  );
}
```

Компоненту обязательно нужно расширить его интерфейс:
`<Tabs<T>>` - T - интерфейс элемента массива items

## Свойства

<!-- props:start -->

| Свойство      | Тип                                                                                             | По умолчанию           | Описание                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| size?         | `'s' | 'm'`                                                                                     | `'m'`                  | Размер                                                                      |
| view?         | `'bordered' | 'clear'`                                                                          | `'bordered'`           | Вид                                                                         |
| className?    | `string`                                                                                        | -                      | Дополнительный класс                                                        |
| innerRef?     | `React.Ref<HTMLDivElement>`                                                                     | -                      | Ссылка на корневой DOM элемент компонента                                   |
| items?        | `T[]`                                                                                           | -                      | Массив элементов                                                            |
| value?        | `T[] | null`                                                                                    | -                      | Выбранный элемент                                                           |
| id?           | `string | number`                                                                               | -                      | Вспомогательное свойсво вернентся в onChange                                |
| name?         | `string`                                                                                        | -                      | Вспомогательное свойсво вернентся в onChange                                |
| onChange?     | `(obj: {e: React.MouseEvent; id?: string | number; name?: string; value: T[] | null}) => void;` | -                      | событие с рабатывающее при выборе пользователем пункта                      |
| getItemKey?   | `(item: T) => string | number`                                                                  | `(item) => item.id`    | Ожидается что результат функции возвращает уникальный ключ каждого из items |
| getItemLabel? | `(item: T) => string`                                                                           | `(item) => item.label` | Результат функции будет использоваться в качестве текста в табе             |
| getItemIcon?  | `(item: T) => React.FC<IIcon> | undefined`                                                      | -                      | Результат функции будет использоваться в качестве иконки в табе             |
| onlyIcon?     | `boolean`                                                                                       | -                      | Показавать в табе только иконку                                             |

и все из `React.HTMLAttributes<HTMLDivElement>`

<!-- props:end -->

## Примеры

### Размер табов

Чтобы изменить размер, используйте модификатор `_size`.

```ts
import React, { useState } from 'react';
import { Tabs } from '@gpn-design/uikit/Tabs';

type Item = string;

const items = ['один', 'два', 'три'];

function App() {
  const [value, setValue] = useState<Item[]>(['три']);
  return (
      <Tabs<Item>
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        size="m"
      />
      <Tabs<Item>
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        size="s"
      />
  );
}
```

{{%story::desktop:ui-kit-examples-tabs--size%}}

### Вид табов

Чтобы изменить вид, используйте свойства `_view`.

```ts

import React, { useState } from 'react';
import { Tabs } from '@gpn-design/uikit/Tabs';

type Item = string;

const items = ['один', 'два', 'три'];

function App() {
  const [value, setValue] = useState<Item[]>(['три']);
  return (
      <Tabs<Item>
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        view="bordered"
      />
      <Tabs<Item>
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        view="clear"
      />
  );
}
```

{{%story::desktop:ui-kit-examples-tabs--view%}}

### Иконки у табов

Чтобы показать иконку у таба, используйте `getItemIcon`.

```ts
import React, { useState } from 'react';
import { Tabs } from '@gpn-design/uikit/Tabs';
import { IconPhoto } from '@gpn-design/uikit/IconPhoto';
import { IconRing } from '@gpn-design/uikit/IconRing';
import { IconCamera } from '@gpn-design/uikit/IconCamera';

type Item = {
  name?: string;
  icon?: IIcon;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Второй',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
];

function App() {
  const [value, setValue] = useState<Item[]>([
    {
      name: 'Первый',
      icon: IconPhoto,
    },
  ]);
  return (
    <Tabs<Item>
      value={value}
      onChange={({ value }) => setValue(value)}
      items={items}
      getItemKey={(item) => item.name}
      getItemLabel={(item) => item.name}
      getItemIcon={(item) => item.icon}
    />
  );
}
```

{{%story::desktop:ui-kit-examples-tabs--icon%}}
