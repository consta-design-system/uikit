import './Modal.stories.css';

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Modal } from '../Modal';

import mdx from './Modal.mdx';

const cnModalStories = cn('ModalStories');

const defaultKnobs = () => ({
  hasOverlay: boolean('hasOverlay', true),
  closeByClickOnOverlay: boolean('closeByClickOnOverlay', true),
  width: select('width', ['auto'], 'auto'),
  position: select('position', ['center', 'top'], 'center'),
});

export function Playground() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { hasOverlay, closeByClickOnOverlay, width, position } = defaultKnobs();

  return (
    <div className={cnModalStories()}>
      <Button
        size="m"
        view="primary"
        label="Открыть модальное окно"
        width="default"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        className="myClassName"
        isOpen={isModalOpen}
        hasOverlay={hasOverlay}
        closeByClickOnOverlay={closeByClickOnOverlay}
        width={width}
        position={position}
        onClose={() => setIsModalOpen(false)}
      >
        <Text as="p" size="s" view="secondary" className={cnModalStories('title')}>
          Заголовок модалки
        </Text>
        <Text as="p" size="m" view="primary" className={cnModalStories('body')}>
          Описание в теле модалки. Здесь может находиться какая-то информация. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </Text>
        <div className={cnModalStories('action')}>
          <Button
            size="m"
            view="primary"
            label="Закрыть"
            width="default"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Modal',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
