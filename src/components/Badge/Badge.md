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

| Свойство   | Тип                                                     | По умолчанию | Описание                                                 |
| ---------- | ------------------------------------------------------- | ------------ | -------------------------------------------------------- |
| size?      | `'s' | 'm' | 'l'`                                       | `'m'`        | Размер                                                   |
| view?      | `'filled' | 'stroked'`                                  | `'filled'`   | Вид                                                      |
| status?    | `'success' | 'error' | 'warning' | 'normal' | 'system'` | `'normal'`   | Статус                                                   |
| form?      | `'default' | 'round'`                                   | `'default'`  | Форма                                                    |
| minified?  | `boolean`                                               | -            | Отвечает за отрисовку компонента в виде точки            |
| icon?      | `React.FC<IIcon>;`                                      | -            | Добавляет иконку                                         |
| label?     | `string`                                                | -            | Текст на бейдже                                          |
| className? | `string`                                                | -            | Дополнительный класс (mix)                               |
| innerRef?  | `React.Ref<any>`                                        | -            | Ссылка на корневой DOM элемент компонента                |
| as?        | `React.ElementType;`                                    | `'div'`      | Корневой элемент, можно прокинуть компонент или html тэг |

<!-- props:end -->

## Примеры

### Размер бейджа

Чтобы изменить размер бейджа, используйте модификатор `_size`.

{{%story::desktop:ui-kit-examples-badge--size%}}

### Вид бейджа

Чтобы изменить вид бейджа, используйте модификатор `_view`.

{{%story::ui-kit-examples-badge--view%}}

### Статус бейджа

Чтобы изменить статус бейджа, используйте модификатор `_status`.

{{%story::ui-kit-examples-badge--status%}}

### Маленький бейдж

Чтобы использолвать маленький бейдж, используйте модификатор `_minified`.

{{%story::ui-kit-examples-badge--minified%}}

### Бейдж с иконкой

Чтобы получить бейдж сиконкой, используйте модификатор `_icon`.

{{%story::ui-kit-examples-badge--icon%}}

### Пример использования свойства "as"

- указываем новый Тэг или компонент
- расширяем интерфейс нашего компонента нужными нам свойствами

```ts
<Badge<{ href: string }> as="a" href="#" label="Лэйбл" />
```
