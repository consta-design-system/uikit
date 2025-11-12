import './NotificationExamplePopover.css';

import { IconEye } from '@consta/icons/IconEye';
import { IconRing } from '@consta/icons/IconRing';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '##/components/Button';
import { ModalLayout } from '##/components/Modal';
import { Popover } from '##/components/Popover';
import { useFlag } from '##/hooks/useFlag';
import { cnMixCard } from '##/mixs/MixCard';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  Notification,
  NotificationDefaultItem,
  NotificationHeader,
} from '../../..';

const emptyFunction = (e: React.MouseEvent) => {};

export const items: NotificationDefaultItem[] = [
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    caption: 'Меньше минуты назад',
    read: true,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    caption: 'Меньше минуты назад',
    read: true,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    caption: 'Меньше минуты назад',
    read: false,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
];

const cnNotificationExamplePopover = cn('NotificationExamplePopover');

export const NotificationExamplePopover = () => {
  const [isOpen, setIsOpen] = useFlag();
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Example col={1}>
      <Button
        ref={buttonRef}
        iconLeft={IconRing}
        label="Открыть уведомления"
        onClick={setIsOpen.toggle}
      />
      <Transition
        in={isOpen}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={popoverRef}
      >
        {(animate) => {
          return (
            <Popover
              className={cnNotificationExamplePopover('Popover', [
                cnMixPopoverAnimate({ animate }),
                cnMixCard({ shadow: true, form: 'round' }),
              ])}
              offset="xs"
              anchorRef={buttonRef}
              ref={popoverRef}
              direction="downStartLeft"
              style={{ zIndex: 1000 }}
              onClickOutside={setIsOpen.off}
            >
              <ModalLayout
                className={cnNotificationExamplePopover('ScrollContainer', [
                  cnMixScrollBar({ size: 's' }),
                ])}
                border={[true, false]}
                fixed={[true, false]}
                space={[{ mB: 's' }]}
                ref={scrollContainerRef}
              >
                <NotificationHeader
                  className={cnNotificationExamplePopover(
                    'Header',
                    cnMixSpace({ p: 's' }),
                  )}
                  title="Уведомления"
                  actions={[
                    {
                      label: 'Удалить всe',
                      onClick: emptyFunction,
                      icon: IconTrash,
                    },
                    {
                      label: 'Отметить все как прочитанное',
                      onClick: emptyFunction,
                      icon: IconEye,
                    },
                  ]}
                />
                <Notification
                  items={items}
                  getItemUserName={(item) => item.label}
                  scrollContainerRef={scrollContainerRef}
                />
              </ModalLayout>
            </Popover>
          );
        }}
      </Transition>
    </Example>
  );
};
