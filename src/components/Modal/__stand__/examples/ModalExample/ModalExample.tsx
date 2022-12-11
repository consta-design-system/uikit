import './ModalExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { Modal } from '../../../Modal';

const cnModalExample = cn('ModalExample');

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Открыть модальное окно"
          width="default"
          onClick={(): void => setIsModalOpen(true)}
        />
      </Example>
      <Modal
        className={cnModalExample('Modal')}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={(): void => setIsModalOpen(false)}
        onEsc={(): void => setIsModalOpen(false)}
        style={{ zIndex: 2000 }}
      >
        <Text
          as="p"
          size="s"
          view="secondary"
          className={cnModalExample('Title')}
        >
          Это заголовок модального окна
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalExample('Body')}>
          Это содержимое модального окна. Здесь может быть что угодно: текст,
          изображение, форма или таблица. Всё, что хочется вынести из контекста
          и показать поверх основной страницы.
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
    </>
  );
};

export const ModalExampleTop = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Окно сверху"
          width="default"
          onClick={(): void => setIsModalOpen(true)}
        />
      </Example>
      <Modal
        className={cnModalExample('Modal')}
        isOpen={isModalOpen}
        hasOverlay
        position="top"
        onClickOutside={(): void => setIsModalOpen(false)}
        onEsc={(): void => setIsModalOpen(false)}
      >
        <Text
          as="p"
          size="s"
          view="secondary"
          className={cnModalExample('Title')}
        >
          Я окно
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalExample('Body')}>
          Я выше всех!
        </Text>
        <div className={cnModalExample('Action')}>
          <Button
            size="m"
            view="primary"
            label="Ясно-понятно"
            width="default"
            onClick={(): void => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export const ModalExampleCenter = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Окно по центру"
          width="default"
          onClick={(): void => setIsModalOpen(true)}
        />
      </Example>
      <Modal
        className={cnModalExample('Modal')}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={(): void => setIsModalOpen(false)}
        onEsc={(): void => setIsModalOpen(false)}
      >
        <Text
          as="p"
          size="s"
          view="secondary"
          className={cnModalExample('Title')}
        >
          Я окно
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalExample('Body')}>
          Я в самой серединке!
        </Text>
        <div className={cnModalExample('Action')}>
          <Button
            size="m"
            view="primary"
            label="И тут всё понятно"
            width="default"
            onClick={(): void => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export const ModalExampleNoOverlay = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Без подложки"
          width="default"
          onClick={(): void => setIsModalOpen(true)}
        />
      </Example>
      <Modal
        className={cnModalExample('Modal')}
        isOpen={isModalOpen}
        hasOverlay={false}
        onClickOutside={(): void => setIsModalOpen(false)}
        onEsc={(): void => setIsModalOpen(false)}
      >
        <Text
          as="p"
          size="s"
          view="secondary"
          className={cnModalExample('Title')}
        >
          Я окно
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalExample('Body')}>
          Я без подложки. Честно-честно.
        </Text>
        <div className={cnModalExample('Action')}>
          <Button
            size="m"
            view="primary"
            label="Закройся!"
            width="default"
            onClick={(): void => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};
