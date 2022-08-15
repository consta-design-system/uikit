import './SnackBar.stories.css';

import { boolean, select } from '@storybook/addon-knobs';
import React, { useReducer } from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { IconAlert } from '../../../icons/IconAlert/IconAlert';
import { IconProcessing } from '../../../icons/IconProcessing/IconProcessing';
import { IconRing } from '../../../icons/IconRing/IconRing';
import { IconThumbUp } from '../../../icons/IconThumbUp/IconThumbUp';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import { Text } from '../../Text/Text';
import { SnackBar } from '../SnackBar';
import {
  SnackBarItemDefault,
  snackBarItemShowProgressProp,
  SnackBarItemStatus,
} from '../types';
import mdx from './SnackBar.docs.mdx';

type State = SnackBarItemDefault[];
type Action =
  | { type: 'add'; item: SnackBarItemDefault }
  | { type: 'remove'; key: number | string };

const defaultKnobs = () => ({
  withIcon: boolean('withIcon', false),
  withActionButtons: boolean('withActionButtons', false),
  withAutoClose: boolean('withAutoClose', false),
  withCloseButton: boolean('withCloseButton', true),
  showProgress: select(
    'showProgress',
    ['', ...snackBarItemShowProgressProp],
    '',
  ),
  withComponentInsteadOfText: boolean('withComponentInsteadOfText', false),
});

const mapIconByStatus: Record<SnackBarItemStatus, IconComponent> = {
  success: IconThumbUp,
  warning: IconAlert,
  alert: IconAlert,
  system: IconProcessing,
  normal: IconRing,
};

const getItemIcon = (item: SnackBarItemDefault): IconComponent | undefined => {
  return item.status ? mapIconByStatus[item.status] : undefined;
};

const cnSnackBarStories = cn('SnackBarStories');

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

export const Playground = () => {
  const {
    withIcon,
    withActionButtons,
    withAutoClose,
    showProgress,
    withCloseButton,
    withComponentInsteadOfText,
  } = defaultKnobs();
  const [items, dispatchItems] = useReducer(reducer, []);
  const generateHandleAdd = (status: SnackBarItemStatus) => () => {
    const key = items.length + 1;

    const text = `Сообщение о каком-то событии - ${key}`;
    const message = withComponentInsteadOfText ? (
      <Text as="a" cursor="pointer" font="mono" weight="bold" size="l">
        {text}
      </Text>
    ) : (
      text
    );
    const item: SnackBarItemDefault = {
      key,
      message,
      status,
    };
    dispatchItems({ type: 'add', item });
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('alert');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

  const handlerRemoveItem = (item: SnackBarItemDefault) =>
    dispatchItems({ type: 'remove', key: item.key });

  return (
    <EventInterceptorProvider
      eventHandler={action('EventInterceptor')}
      map={eventInterceptorMap}
    >
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
        <SnackBar
          className={cnSnackBarStories('SnackBar')}
          items={items}
          getItemIcon={withIcon ? getItemIcon : undefined}
          {...(withCloseButton && {
            onItemClose: handlerRemoveItem,
          })}
          {...(withAutoClose && {
            onItemAutoClose: handlerRemoveItem,
          })}
          getItemAutoClose={withAutoClose ? () => 5 : undefined}
          getItemShowProgress={
            showProgress !== '' ? () => showProgress : undefined
          }
          getItemActions={
            withActionButtons
              ? () => [
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
                ]
              : undefined
          }
        />
      </div>
    </EventInterceptorProvider>
  );
};

export default createMetadata({
  title: 'Компоненты|/Обратная связь/SnackBar',
  id: 'components/SnackBar',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A11236',
    },
  },
});
