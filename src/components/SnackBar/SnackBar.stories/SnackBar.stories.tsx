import './SnackBar.stories.css';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { IIcon } from '../../../icons/Icon/Icon';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { IconThumbUp } from '../../../icons/IconThumbUp/IconThumbUp';
import { IconAlert } from '../../../icons/IconAlert/IconAlert';
import { IconRing } from '../../../icons/IconRing/IconRing';
import { IconProcessing } from '../../../icons/IconProcessing/IconProcessing';
import {
  SnackBar,
  SnackBarPropItemAction,
  SnackBarPropItemStatus,
  SnackBarPropGetItemOnClose,
} from '../SnackBar';

declare type Item = {
  key: number;
  message: string;
  actions?: SnackBarPropItemAction<Item> | SnackBarPropItemAction<Item>[];
  status?: SnackBarPropItemStatus;
};

const knobs = () => ({
  withIcon: boolean('withIcon', false),
  withActionButtons: boolean('withActionButtons', false),
  withAutoClose: boolean('withAutoClose', false),
  withCloseButton: boolean('withCloseButton', true),
});

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
    system: IconProcessing,
    normal: IconRing,
  };
  return mapIconByStatus[item.status];
};
const getItemAutoClose = () => 3;
const cnSnackBarStories = cn('SnackBarStories');

function Stories({ withIcon, withActionButtons, withAutoClose, withCloseButton }) {
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
        getItemIcon={withIcon && getItemIcon}
        getItemOnClose={withCloseButton && getItemOnClose}
        getItemAction={withActionButtons && getItemActions}
        getItemAutoClose={withAutoClose && getItemAutoClose}
        getItemStatus={getItemStatus}
      />
    </div>
  );
}

storiesOf('UI-KIT|/SnackBar', module)
  .addDecorator(withKnobs)
  .add('playground', () => <Stories {...knobs()} />);
