import './ModalExample.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { Modal } from '../../../Modal';

const cnModalExample = cn('ModalExample');

export function ModalExample() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="Открыть модальное окно"
        width="default"
        onClick={(): void => setIsModalOpen(true)}
      />
      <Modal
        className={cnModalExample('Modal')}
        isOpen={isModalOpen}
        hasOverlay
        onOverlayClick={(): void => setIsModalOpen(false)}
      >
        <Text as="p" size="s" view="secondary" className={cnModalExample('Title')}>
          Заголовок модалки
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalExample('Body')}>
          Описание в теле модалки. Здесь может находиться какая-то информация. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </Text>
        <div className={cnModalExample('Action')}>
          <Button
            size="m"
            view="primary"
            label="Закрыть"
            width="default"
            onClick={(): void => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
}
