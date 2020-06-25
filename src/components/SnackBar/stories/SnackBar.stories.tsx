import './SnackBar.stories.css';

import * as React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { IconAlert } from '../../../icons/IconAlert/IconAlert';
import { IconProcessing } from '../../../icons/IconProcessing/IconProcessing';
import { IconRing } from '../../../icons/IconRing/IconRing';
import { IconThumbUp } from '../../../icons/IconThumbUp/IconThumbUp';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Item, SnackBar, SnackBarItemStatus } from '../SnackBar';
import md from '../SnackBar.md';

const knobs = () => ({
  withIcon: boolean('withIcon', false),
  withActionButtons: boolean('withActionButtons', false),
  withAutoClose: boolean('withAutoClose', false),
  withCloseButton: boolean('withCloseButton', true),
});

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

function SnackBarStories({ withIcon, withActionButtons, withAutoClose, withCloseButton }) {
  const [items, dispatchItems] = React.useReducer(reducer, []);
  const generateHandleAdd = (status: SnackBarItemStatus) => () => {
    const key = items.length + 1;
    const item: Item = {
      key,
      message: `Сообщение о каком-то событии - ${key}`,
      status,
      ...(withAutoClose && { autoClose: 5 }),
      ...(withIcon && { icon: getItemIconByStatus(status) }),
      ...(withActionButtons && {
        actions: [
          {
            label: 'Согласен',
            onClick: () => {
              console.log('Согласен');
            },
          },
          {
            label: 'Не согласен',
            onClick: () => {
              console.log('Не согласен');
            },
          },
        ],
      }),
      ...(withCloseButton && { onClose: () => dispatchItems({ type: 'remove', key }) }),
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
          view="ghost"
          size="s"
          width="full"
          label="Выполненно"
          onClick={handleSuccessAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Ошибка"
          onClick={handleAlertAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Предупреждение"
          onClick={handleWarningAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Системное"
          onClick={handleSystemAdd}
        />
        <Button
          className={cnSnackBarStories('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Нормальное"
          onClick={handleNormalAdd}
        />
      </div>
      <SnackBar className={cnSnackBarStories('SnackBar')} items={items} />
    </div>
  );
}

function SnackBarExample() {
  const items = [
    {
      key: 1,
      message: 'Сообщение',
    },
  ];
  return (
    <div className={cnSnackBarStories({ example: 1 })}>
      <SnackBar className={cnSnackBarStories('SnackBar')} items={items} />
    </div>
  );
}

function reducerExample2(
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

function SnackBarExample2() {
  const [items, dispatchItems] = React.useReducer(reducerExample2, []);
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
    <div className={cnSnackBarStories({ example: 2 })}>
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

storiesOf('UI-KIT|/SnackBar', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: md,
      },
    }),
  )
  .add('playground', () => <SnackBarStories {...knobs()} />);

storiesOf('UI-KIT|/Examples/SnackBar', module)
  .add('_example', SnackBarExample)
  .add('_example2', SnackBarExample2);
