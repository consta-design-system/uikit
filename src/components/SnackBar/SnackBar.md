# SnackBar

Компоненту обязательно нужно расширить его интерфейс:
`<SnackBar<ITEM>>` - ITEM - интерфейс элемента массива items

## Свойства

<!-- props:start -->

| Свойство          | Тип                                                                                                                                                                   | По умолчанию     | Описание                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| className?        | `string`                                                                                                                                                              | -                | Дополнительный класс                                                                             |
| innerRef?         | `React.Ref<HTMLDivElement>`                                                                                                                                           | -                | Ссылка на корневой DOM элемент компонента                                                        |
| items             | `ITEM[]`                                                                                                                                                              | -                | Массив элементов                                                                                 |
| getItemKey        | `(item: ITEM) => string | number;`                                                                                                                                    | -                | Ожидается что результат функции возвращает уникальный ключ каждого из `items`                    |
| getItemMessage?   | `(item: ITEM) => string | number | undefined;`                                                                                                                        | -                | Результат функции будет использоваться в качестве сообщения                                      |
| getItemAutoClose? | `(item: ITEM) => boolean | number | undefined;`                                                                                                                       | -                | Результат функции укажет количество секунд после которого сообщение скроется, `true` = 3 секунды |
| getItemOnClose?   | `(item: ITEM) => (e?: React.MouseEvent) => void;`                                                                                                                     | -                | Результат функции будет функция которая сработает при закрытии сообщения                         |
| getItemStatus?    | `(item: ITEM) => 'system' | 'success' | 'warning' | 'alert' | 'normal';`                                                                                              | `() => 'normal'` | Результат функции укажет модификатор статуса каждого из `items`, если статус не                  |
| getItemIcon?      | `(item: ITEM) => React.FC<IIcon> | undefined;`                                                                                                                        | -                | Результат функции будет использоваться в качестве иконки                                         |
| getItemAction?    | `(item: ITEM) => {label: string | number;onClick: React.EventHandler<React.MouseEvent>;} | {label: string | number;onClick: React.EventHandler<React.MouseEvent>;}[]` | -                | Результат функции будет использоваться в качестве кнопок в теле сообщения                        |

<!-- props:end -->

## Пример

```ts
import './SnackBarStories.css';

import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@gpn-design/uikit/Button';
import { IIcon } from '@gpn-design/uikit/Icon';
import { IconAdd } from '@gpn-design/uikit/IconAdd';
import { IconThumbUp } from '@gpn-design/uikit/IconThumbUp';
import { IconAlert } from '@gpn-design/uikit/IconAlert';
import { IconRing } from '@gpn-design/uikit/IconRing';
import { IconProcessing } from '@gpn-design/uikit/IconProcessing';
import {
  SnackBar,
  SnackBarPropItemAction,
  SnackBarPropItemStatus,
  SnackBarPropGetItemOnClose,
} from '@gpn-design/uikit/SnackBar';

declare type Item = {
  key: number;
  message: string;
  actions?: SnackBarPropItemAction<Item> | SnackBarPropItemAction<Item>[];
  status?: SnackBarPropItemStatus;
};

const itemDefault: Item = {
  key: 1,
  message: 'Сообщение о каком-то событии',
  status: 'warning',
  actions: [
    {
      label: 'Согласен',
      onClick: (e) => {
        e.stopPropagation();
        console.log('Согласен');
      },
    },
    {
      label: 'Не согласен',
      onClick: (e) => {
        e.stopPropagation();
        console.log('Не согласен');
      },
    },
  ],
};

const itemsInit: Item[] = [itemDefault];
const getItemKey = (item: Item) => item.key;
const getItemMessage = (item: Item) => item.message;
const getItemActions = (item: Item) => item.actions;
const getItemStatus = (item: Item) => item.status;
const getItemIcon = (item: Item): React.FC<IIcon> | undefined => {
  const mapIconByStatus: Record<SnackBarPropItemStatus, React.FC<IIcon>> = {
    success: IconThumbUp,
    warning: IconAlert,
    alert: IconAlert,
    system: IconProcessing,
    normal: IconRing,
  };
  return mapIconByStatus[item.status];
};
const getItemAutoClose = (item: Item) =>
  item.status === 'normal' || item.status === 'system' ? 5 : false;
const cnSnackBarStories = cn('SnackBarStories');

function SnackBarStories() {
  const [items, setItems] = React.useState<Item[]>(itemsInit);

  const getItemOnClose: SnackBarPropGetItemOnClose<Item> = (closedItem) => (
    e?: React.MouseEvent
  ) => {
    e && e.stopPropagation();
    setItems(items.filter((item) => item.key !== closedItem.key));
  };

  const generateHandleAdd = (status: SnackBarPropItemStatus) => () => {
    setItems([
      ...items,
      {
        ...itemDefault,
        key: items.length + 1,
        status,
      },
    ]);
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('alert');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('normal');

  return (
    <div className={cnSnackBarStories()}>
      <div className={cnSnackBarStories('Buttons')}>
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          label="Выполненно"
          onClick={handleSuccessAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          label="Ошибка"
          onClick={handleAlertAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          label="Предупреждение"
          onClick={handleWarningAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          label="Системное"
          onClick={handleSystemAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          label="Нормальное"
          onClick={handleNormalAdd}
        />
      </div>
      <SnackBar<Item>
        className={cnSnackBarStories('SnackBar')}
        items={items}
        getItemKey={getItemKey}
        getItemMessage={getItemMessage}
        getItemIcon={getItemIcon}
        getItemOnClose={getItemOnClose}
        getItemAction={getItemActions}
        getItemAutoClose={getItemAutoCloseForExaple}
        getItemStatus={getItemStatus}
      />
    </div>
  );
}
```

{{%story::desktop:ui-kit-examples-snackbar--example%}}
