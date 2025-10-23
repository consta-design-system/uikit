import './ModalStatusExample.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconAlert } from '@consta/icons/IconAlert';
import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconExit } from '@consta/icons/IconExit';
import { IconMail } from '@consta/icons/IconMail';
import { IconWarning } from '@consta/icons/IconWarning';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button, ButtonPropView } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  Modal,
  ModalHeader,
  ModalHeaderPropStatus,
  ModalLayout,
} from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

const cnModalStatusExample = cn('ModalStatusExample');

type Item = {
  label: string;
  closeButton?: boolean;
  description?: React.ReactNode;
  icon: IconComponent;
  status: ModalHeaderPropStatus;
  controls: { label: string; view: ButtonPropView }[];
};

const items: Item[] = [
  {
    label: 'Обращение зарегистрировано',
    description: (
      <>
        Вы можете ознакомиться со статусом на вкладке <b>Мои обращения</b>
      </>
    ),
    icon: IconAllDone,
    status: 'success',
    controls: [
      {
        label: 'Перейти к обращению',
        view: 'primary',
      },
      {
        label: 'Закрыть',
        view: 'ghost',
      },
    ],
  },
  {
    label: 'Сохранить изменения?',
    closeButton: true,
    description:
      'Вы закрываете окно редактирования таблицы. Данные, которые вы внесли не будут сохранены',
    icon: IconWarning,
    status: 'warning',
    controls: [
      {
        label: 'Вернуться к редактированию',
        view: 'primary',
      },
      {
        label: 'Закрыть без сохранения',
        view: 'ghost',
      },
    ],
  },
  {
    label: 'Нет доступа',
    closeButton: true,
    description:
      'У вашей учетной записи отсутствует доступ к данному разделу. Вы можете запросить доступ у администратора',
    icon: IconAlert,
    status: 'alert',
    controls: [
      {
        label: 'Запросить доступ',
        view: 'primary',
      },
      {
        label: 'Закрыть',
        view: 'ghost',
      },
    ],
  },
  {
    label: 'Подтвердите адрес электронной почты',
    closeButton: true,
    description:
      'Мы отправили письмо на ivanov@mail.ru. Перейдите по ссылке в письме, чтобы подтвердить электронную почту',
    icon: IconMail,
    status: 'normal',
    controls: [
      {
        label: 'Отправить письмо повторно',
        view: 'primary',
      },
    ],
  },
  {
    label: 'Выйти из системы',
    icon: IconExit,
    status: 'system',
    controls: [
      {
        label: 'Выйти',
        view: 'primary',
      },
      {
        label: 'Остаться',
        view: 'ghost',
      },
    ],
  },
];

const ExampleItem: React.FC<Item> = ({
  label,
  closeButton,
  description,
  icon: Icon,
  status,
  controls,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref} style={{ height: 370 }} />
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalStatusExample('Modal')}
        isOpen
        hasOverlay={false}
        border
        position="top"
      >
        <ModalLayout
          space={[{ p: 'm' }, description ? { p: 'm' } : undefined]}
          border={[false, true]}
        >
          <ModalHeader
            onClose={closeButton ? () => {} : undefined}
            icon={Icon}
            status={status}
            direction="vertical"
          >
            {label}
          </ModalHeader>
          {description && <Text align="center">{description}</Text>}
          <div
            className={cnModalStatusExample('Footer', [
              cnMixSpace({ p: 's' }),
              cnMixFlex({ gap: 's', direction: 'column' }),
            ])}
          >
            {controls.map(({ label, view }) => (
              <Button key={label} view={view} label={label} width="full" />
            ))}
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};

const getUndefined = () => undefined;

export const ModalStatusExample = () => {
  return (
    <Example
      col={{ 1: 0, 2: 760 }}
      items={items}
      getItemNode={ExampleItem}
      getItemStatus={getUndefined}
      getItemDescription={getUndefined}
      getItemLabel={getUndefined}
    />
  );
};
