import './ModalExampleCustom.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconConnection } from '@consta/icons/IconConnection';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { AvatarGroup } from '##/components/AvatarGroup';
import { Button } from '##/components/Button';
import { ChipsItem } from '##/components/Chips';
import { FieldLabel } from '##/components/FieldComponents';
import { Select } from '##/components/SelectCanary';
import { Text } from '##/components/Text';
import { TextField } from '##/components/TextFieldCanary';
import { getLastPoint, useBreakpoints } from '##/hooks/useBreakpoints';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

const cnModalExampleCustom = cn('ModalExampleCustom');

export const ModalExampleCustom = () => {
  const ref = useRef<HTMLDivElement>(null);

  const isDesktop =
    getLastPoint(
      useBreakpoints({
        ref,
        map: { isDesktop: 600 },
        isActive: true,
      }),
    ) === 'isDesktop';

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 460 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalExampleCustom('Modal')}
        isOpen
        hasOverlay={false}
        border
      >
        <ModalLayout space={{ p: 'm' }} border={[true, false]}>
          <ModalHeader onClose={() => {}}>
            <div
              className={cnModalExampleCustom('HeaderContent', [
                cnMixFlex({
                  gap: 's',
                  justify: 'space-between',
                  direction: 'row',
                  align: 'center',
                }),
              ])}
            >
              <Text view="primary" size="m" weight="semibold">
                {isDesktop ? 'Поделиться файлом' : 'Поделиться'}
              </Text>
              <Button
                size="s"
                view="clear"
                label={isDesktop ? 'Копировать ссылку' : 'Копировать'}
                iconLeft={IconConnection}
              />
            </div>
          </ModalHeader>
          <div
            className={cnModalExampleCustom('Body', [
              cnMixFlex({ gap: 's', direction: 'column' }),
            ])}
          >
            <div
              className={cnModalExampleCustom('EmailBox', [
                cnMixFlex({ gap: 's' }),
              ])}
            >
              <TextField
                className={cnModalExampleCustom('Input')}
                placeholder="Введите почту"
              />
              <Button
                className={cnModalExampleCustom('SendButton')}
                label="Отправить"
              />
            </div>
            <div
              className={cnModalExampleCustom('ChipsBox', [
                cnMixFlex({ gap: 's', wrap: 'wrap' }),
                cnMixSpace({ mB: 'xl' }),
              ])}
            >
              <ChipsItem
                size="s"
                iconLeft={IconAdd}
                label="Филатов Олег Владимирович"
              />
              <ChipsItem
                size="s"
                iconLeft={IconAdd}
                label="Петрова Ксения Михайловна"
              />
            </div>
            <div
              className={cnModalExampleCustom('AccessBox', [
                cnMixFlex({
                  gap: 's',
                  direction: isDesktop ? 'row' : 'column',
                }),
              ])}
            >
              <div
                className={cnModalExampleCustom('Access', [
                  cnMixFlex({ gap: 's', direction: 'column' }),
                ])}
              >
                <FieldLabel>Настройки доступа</FieldLabel>
                <Select
                  items={[
                    {
                      id: 1,
                      label: 'Только к просмотру',
                    },
                    { id: 2, label: 'Просмотр и изменение' },
                  ]}
                  value={{
                    id: 1,
                    label: 'Только к просмотру',
                  }}
                  onChange={() => {}}
                  size="m"
                  view="default"
                />
              </div>
              <div
                className={cnModalExampleCustom('Users', [
                  cnMixFlex({ gap: 'm', direction: 'column' }),
                ])}
              >
                <FieldLabel>Пользователи</FieldLabel>
                <AvatarGroup
                  visibleCount="auto"
                  items={[
                    { name: 'Филатов Олег Владимирович' },
                    { name: 'Петрова Ксения Михайловна' },
                    { name: 'Иванов Иван Иванович' },
                    { name: 'Сидоров Петр Петрович' },
                    { name: 'Сидорова Елена Ивановна' },
                    { name: 'Иванова Елена Петровна' },
                    { name: 'Иванов Петр Иванович' },
                    { name: 'Сидоров Иван Петрович' },
                    { name: 'Сидорова Елена Ивановна' },
                    { name: 'Иванова Елена Петровна' },
                    { name: 'Иванов Петр Иванович' },
                    { name: 'Сидоров Иван Петрович' },
                    { name: 'Сидорова Елена Ивановна' },
                    { name: 'Иванова Елена Петровна' },
                    { name: 'Иванов Петр Иванович' },
                    { name: 'Сидоров Иван Петрович' },
                  ]}
                />
              </div>
            </div>
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
