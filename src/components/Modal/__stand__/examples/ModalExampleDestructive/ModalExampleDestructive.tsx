import './ModalExampleDestructive.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconClear } from '@consta/icons/IconClear';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import { FieldLabel } from '@consta/uikit/FieldComponents';
import React, { useRef } from 'react';

import { Button, ButtonPropView } from '##/components/Button';
import { Checkbox } from '##/components/Checkbox';
import { Text } from '##/components/Text';
import { TextField } from '##/components/TextFieldCanary';
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

const cnModalExampleDestructive = cn('ModalExampleDestructive');

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
    label: 'Удалить резюме?',
    description: (
      <Text align="center">
        Вы можете скрыть резюме — тогда его будете видеть только вы
      </Text>
    ),
    icon: IconTrash,
    status: 'alert',
    controls: [
      {
        label: 'Скрыть резюме',
        view: 'primary',
      },
      {
        label: 'Удалить навсегда',
        view: 'secondary',
      },
    ],
  },
  {
    label: 'Удалить аккаунт?',
    description: (
      <>
        <Text>
          После удаления, будут безвозвратно утеряны:
          <ul
            className={cnModalExampleDestructive(
              'List',
              cnMixSpace({ mB: 'm', mT: '2xs' }),
            )}
          >
            <li>Все ваши резюме</li>
            <li>Ваши сообщения</li>
            <li>Ваши фотографии</li>
          </ul>
        </Text>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>
          Введите «УДАЛИТЬ»:
        </FieldLabel>
        <TextField placeholder="Введите текст" clearButton />
      </>
    ),
    icon: IconClear,
    status: 'alert',
    controls: [
      {
        label: 'Удалить',
        view: 'primary',
      },
      {
        label: 'Отменить',
        view: 'ghost',
      },
    ],
  },
  {
    label: 'Удалить аккаунт?',
    description: (
      <>
        <Text>
          После удаления, будут безвозвратно утеряны:
          <ul
            className={cnModalExampleDestructive(
              'List',
              cnMixSpace({ mB: 'm', mT: '2xs' }),
            )}
          >
            <li>Все ваши резюме</li>
            <li>Ваши сообщения</li>
            <li>Ваши фотографии</li>
          </ul>
        </Text>
        <Checkbox
          label="Подтверждаю, что хочу удалить аккаунт"
          checked={false}
          align="top"
        />
      </>
    ),
    icon: IconClear,
    status: 'alert',
    controls: [
      {
        label: 'Удалить',
        view: 'primary',
      },
      {
        label: 'Отменить',
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
      <div ref={ref} style={{ height: 500 }} />
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalExampleDestructive('Modal')}
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
          {description}
          <div
            className={cnModalExampleDestructive('Footer', [
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

export const ModalExampleDestructive = () => {
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
