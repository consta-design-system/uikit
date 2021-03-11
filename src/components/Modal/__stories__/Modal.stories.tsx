import './Modal.stories.css';

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Modal } from '../Modal';

import mdx from './Modal.mdx';

type SelectOption = {
  label: string;
  value: string;
};

type Group = { label: string; items: SelectOption[] };
export type Option = SelectOption | Group;

const cnModalStories = cn('ModalStories');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const defaultKnobs = () => ({
  hasOverlay: boolean('hasOverlay', true),
  width: select('width', ['auto'], 'auto'),
  position: select('position', ['center', 'top'], 'center'),
});

export function Playground(props: {
  children: React.ReactNode;
  dropdownRef: React.RefObject<HTMLElement>[];
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { hasOverlay, width, position } = defaultKnobs();

  return (
    <div className={cnModalStories()}>
      <Button
        size="m"
        view="primary"
        label="Открыть модальное окно"
        width="default"
        onClick={(): void => setIsModalOpen(true)}
      />
      <Modal
        className={cnModalStories('Modal')}
        isOpen={isModalOpen}
        hasOverlay={hasOverlay}
        onOverlayClick={(): void => setIsModalOpen(false)}
        width={width}
        position={position}
        refsForExcludeClickOutside={[...(props.dropdownRef || [])]}
        // eslint-disable-next-line no-console
        onClose={(): void => console.log('Коллбэк на закрытие')}
        // eslint-disable-next-line no-console
        onOpen={(): void => console.log('Коллбэк на открытие')}
      >
        {props.children || (
          <>
            <Text as="p" size="s" view="secondary" className={cnModalStories('Title')}>
              Заголовок модалки
            </Text>
            <Text as="p" size="m" view="primary" className={cnModalStories('Body')}>
              Описание в теле модалки. Здесь может находиться какая-то информация. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </Text>
          </>
        )}
        <div className={cnModalStories('Action')}>
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

export default createMetadata({
  title: 'Компоненты|/Modal',
  id: 'components/Modal',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
