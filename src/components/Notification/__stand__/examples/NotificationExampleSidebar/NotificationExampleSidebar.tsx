import { IconEye } from '@consta/icons/IconEye';
import { IconRing } from '@consta/icons/IconRing';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { ModalLayout } from '##/components/Modal';
import { Sidebar } from '##/components/Sidebar';
import { useFlag } from '##/hooks/useFlag';
import { cnMixSpace } from '##/mixs/MixSpace';

import {
  Notification,
  NotificationDefaultItem,
  NotificationHeader,
} from '../../..';

const emptyFunction = (e: React.MouseEvent) => {};

const item: NotificationDefaultItem = {
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
};

const items: NotificationDefaultItem[] = Array(30).fill(item);

export const NotificationExampleSidebar = () => {
  const [isOpen, setIsOpen] = useFlag();
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
      <Sidebar
        scrollContainerRef={scrollContainerRef}
        isOpen={isOpen}
        onClickOutside={setIsOpen.off}
        style={{ zIndex: 100 }}
        border
      >
        <ModalLayout
          fixed={[true, false]}
          border={[true, false]}
          space={[{ mB: 's' }]}
        >
          <NotificationHeader
            className={cnMixSpace({ p: 's' })}
            onClose={setIsOpen.off}
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
      </Sidebar>
    </Example>
  );
};
