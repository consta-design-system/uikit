# Badge

## Пример использования

Использование компонента:

```ts
// src/App.ts
import React from 'react';
import { Badge } from '@gpn-design/uikit/Badge';

const App = () => {
  return <Badge label="badge" />;
};
```

## Свойства

<!-- props:start -->

| Свойство   | Тип                                                     | По умолчанию | Описание                                      |
| ---------- | ------------------------------------------------------- | ------------ | --------------------------------------------- |
| size?      | `'s' | 'm' | 'l'`                                       | `'m'`        | Размер                                        |
| view?      | `'filled' | 'stroked'`                                  | `'filled'`   | Вид                                           |
| status?    | `'success' | 'error' | 'warning' | 'normal' | 'system'` | `'normal'`   | Статус                                        |
| form?      | `'default' | 'round'`                                   | `'default'`  | Форма                                         |
| minified?  | `boolean`                                               | -            | Отвечает за отрисовку компонента в виде точки |
| icon?      | `React.FC<IconProps>;`                                  | -            | Добавляет иконку                              |
| label?     | `string`                                                | -            | Текст на бейдже                               |
| className? | `string`                                                | -            | Дополнительный класс (mix)                    |
| ref?       | `React.Ref<HTMLElement>`                                | -            | Ссылка на корневой DOM элемент компонента     |
| as?        | `keyof JSX.IntrinsicElements`                           | `'div'`      | Корневой элемент                              |

<!-- props:end -->

## Примеры

### Размер бейджа

Чтобы изменить размер бейджа, используйте модификатор `_size`.

```ts
<Badge size="s" label="Badge" />
<Badge size="m" label="Badge" />
<Badge size="l" label="Badge" />
```

{{%story::desktop:ui-kit-examples-badge--size%}}

### Вид бейджа

Чтобы изменить вид бейджа, используйте модификатор `_view`.

```ts
<Badge view="filled" label="Badge" />
<Badge view="stroked" label="Badge" />
```

{{%story::ui-kit-examples-badge--view%}}

### Статус бейджа

Чтобы изменить статус бейджа, используйте модификатор `_status`.

```ts
<Badge status="success" label="Badge" />
<Badge status="error" label="Badge" />
<Badge status="warning" label="Badge" />
<Badge status="normal" label="Badge" />
<Badge status="system" label="Badge" />
```

{{%story::ui-kit-examples-badge--status%}}

### Маленький бейдж

Чтобы использолвать маленький бейдж, используйте модификатор `_minified`.

```ts
<Badge minified label="Badge" />
```

{{%story::ui-kit-examples-badge--minified%}}

### Бейдж с иконкой

Чтобы получить бейдж сиконкой, используйте модификатор `_icon`.

```ts
<Badge icon={IconUser} label="Badge" />
```

{{%story::ui-kit-examples-badge--icon%}}

### Пример использования свойства "as"

- указываем новый Тэг или компонент
- расширяем интерфейс нашего компонента нужными нам свойствами

```ts
<Badge as="a" href="#" label="Лэйбл" />
```

{{%story::ui-kit-examples-badge--as%}}
