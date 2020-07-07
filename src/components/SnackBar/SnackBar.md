# SnackBar

## Пример

```ts
import * as React from 'react';
import { SnackBar } from '@gpn-design/uikit/SnackBar';

function SnackBarExample() {
  const items = [
    {
      key: 1,
      message: 'Сообщение',
    },
  ];
  return <SnackBar items={items} />;
}
```

## Свойства

<!-- props:start -->

| Свойство   | Тип                                                                                                                                                                                                                                                                                                                                            | По умолчанию | Описание                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| className? | `string`                                                                                                                                                                                                                                                                                                                                       | -            | Дополнительный класс                                                                                   |
| items      | `{ key: string | number; message?: string | number; status?: 'system' | 'success' | 'warning' | 'alert' | 'normal' ; autoClose?: boolean | number; icon?: React.FC<IconProps>; actions?: { label: string | number; onClick: React.EventHandler<React.MouseEvent>; }[];onClose?: (item: Item) => void; onAutoClose?: (item: Item) => void; }[]` | -            | Массив элементов. Если не передавать `onAutoClose` то по истечению таймера будет срабатывать `onClose` |

<!-- props:end -->

{{%story::desktop:ui-kit-examples-snackbar--example%}}

## Пример с кнопками

```ts
import './SnackBarStories.css';

import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@gpn-design/uikit/Button';
import { IconProps } from '@gpn-design/uikit/Icon';
import { IconAdd } from '@gpn-design/uikit/IconAdd';
import { IconThumbUp } from '@gpn-design/uikit/IconThumbUp';
import { IconAlert } from '@gpn-design/uikit/IconAlert';
import { IconRing } from '@gpn-design/uikit/IconRing';
import { IconProcessing } from '@gpn-design/uikit/IconProcessing';
import { SnackBar, SnackBarItemStatus, Item } from '@gpn-design/uikit/SnackBar';

function reducer(
  state: Item[],
  action: { type: 'add' | 'remove'; item?: Item; key?: number | string },
) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

const getItemIconByStatus = (status: SnackBarItemStatus): React.FC<IconProps> | undefined => {
  const mapIconByStatus: Record<SnackBarItemStatus, React.FC<IconProps>> = {
    success: IconThumbUp,
    warning: IconAlert,
    alert: IconAlert,
    system: IconProcessing,
    normal: IconRing,
  };
  return mapIconByStatus[status];
};

const cnSnackBarStories = cn('SnackBarStories');

function SnackBarExample() {
  const [items, dispatchItems] = React.useReducer(reducer, []);
  const generateHandleAdd = (status: SnackBarItemStatus) => () => {
    const key = items.length + 1;
    const item: Item = {
      key,
      message: `Сообщение о каком-то событии - ${key}`,
      status,
      icon: getItemIconByStatus(status),
      onClose: () => dispatchItems({ type: 'remove', key }),
    };
    dispatchItems({ type: 'add', item });
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('alert');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

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
      <SnackBar className={cnSnackBarStories('SnackBar')} items={items} />
    </div>
  );
}
```

```css
.SnackBarStories {
  display: flex;
  flex-direction: row;
  margin-left: calc(-1 * var(--space-xs));
  margin-right: calc(-1 * var(--space-xs));
  height: calc(100vh - var(--space-3xl));
  &-SnackBar {
    padding-left: var(--space-xs);
    padding-right: var(--space-xs);
    width: 400px;
    flex: none;
    overflow: auto;
  }
  &-Buttons {
    padding-left: var(--space-xs);
    padding-right: var(--space-xs);
    flex: 1;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: flex-end;
  }
  &-ButtonAdd {
    margin-bottom: var(--space-m);
  }
}
```

{{%story::desktop:ui-kit-examples-snackbar--example2%}}
