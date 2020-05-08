import './SnackBar.stories.css';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../../Button/Button';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { IconThumbUp } from '../../../icons/IconThumbUp/IconThumbUp';
import { IconAlert } from '../../../icons/IconAlert/IconAlert';

import { cn } from '../../../utils/bem';
import {
  SnackBar,
  SnackBarPropItemAction,
  SnackBarPropItemStatus,
  SnackBarPropGetItemOnClose,
} from '../SnackBar';
import { IIcon } from '../../../icons/Icon/Icon';

declare type Item = {
  key: number;
  message: string;
  actions?: SnackBarPropItemAction<Item> | SnackBarPropItemAction<Item>[];
  status?: SnackBarPropItemStatus;
};

const cnSnackBarStories = cn('SnackBarStories');

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
const getItemActions = (item) => item.actions;
const getItemStatus = (item) => item.status;
const getItemIcon = (item: Item): React.FC<IIcon> | undefined => {
  const mapIconByStatus: Record<SnackBarPropItemStatus, React.FC<IIcon>> = {
    success: IconThumbUp,
    warning: IconAlert,
    alert: IconAlert,
    system: undefined,
  };
  return mapIconByStatus[item.status];
};
const getItemAutoClose = (item) => (item.status === 'system' ? 3 : false);

storiesOf('UI-KIT|/SnackBar', module).add('playground', () => {
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
        getItemAutoClose={getItemAutoClose}
        getItemStatus={getItemStatus}
      />
    </div>
  );
});
