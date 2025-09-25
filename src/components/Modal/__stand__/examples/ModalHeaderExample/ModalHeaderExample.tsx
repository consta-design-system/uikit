import { IconAllDone } from '@consta/icons/IconAllDone';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

export const ModalHeaderExample = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 300 }} />
      </Example>
      <Modal
        rootClassName={cnModalExampleStaticModal()}
        container={ref}
        isOpen
        hasOverlay={false}
        style={{ width: 400 }}
        border
      >
        <ModalLayout space={{ p: 'm' }} border={[true, false]}>
          <ModalHeader onClose={() => {}} icon={IconAllDone} status="success">
            Это заголовок модального окна
          </ModalHeader>
          Это содержимое модального окна. Здесь может быть что угодно: текст,
          изображение, форма или таблица. Всё, что хочется вынести из контекста
          и показать поверх основной страницы.
        </ModalLayout>
      </Modal>
    </>
  );
};
