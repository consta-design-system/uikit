import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { FieldLabel } from '##/components/FieldComponents';
import { TextField } from '##/components/TextFieldCanary';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

export const ModalHeaderDirectionHorizontal = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 400 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        isOpen
        hasOverlay={false}
        style={{ width: 600 }}
        border
      >
        <ModalLayout space={{ p: 'm' }} border>
          <ModalHeader onClose={() => {}}>
            Создание карточки сотрудника
          </ModalHeader>
          <>
            <FieldLabel className={cnMixSpace({ mB: 'xs' })}>ФИО</FieldLabel>
            <TextField
              className={cnMixSpace({ mB: 'l' })}
              placeholder="Иванов Иван Иванович"
              defaultValue="Золотов Иван Сергеевич"
              clearButton
            />
            <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Почта</FieldLabel>
            <TextField
              placeholder="example@example.com"
              defaultValue="ivan@mail.ru"
              clearButton
            />
          </>
          <div
            className={cnMixFlex({
              gap: 'xs',
              justify: 'flex-end',
            })}
          >
            <Button view="ghost" label="Отмена" />
            <Button label="Создать карточку" />
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
