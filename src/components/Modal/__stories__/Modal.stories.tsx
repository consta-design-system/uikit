import './Modal.stories.css';

import React, { useRef, useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Combobox } from '../../Combobox/Combobox';
import { Text } from '../../Text/Text';
import { Modal } from '../Modal';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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

const items = [
  { label: 'Neptunium', value: 'Neptunium' },
  { label: 'Plutonium', value: 'Plutonium' },
  { label: 'Americium', value: 'Americium' },
  { label: 'Curium', value: 'Curium' },
  { label: 'Berkelium', value: 'Berkelium' },
  {
    label: 'Californium Berkelium Curium Plutonium',
    value: 'Californium Berkelium Curium Plutonium',
  },
  { label: 'Einsteinium', value: 'Einsteinium' },
  { label: 'Fermium', value: 'Fermium' },
  { label: 'Mendelevium', value: 'Mendelevium' },
  { label: 'Nobelium', value: 'Nobelium' },
  { label: 'Lawrencium', value: 'Lawrencium' },
  { label: 'Rutherfordium', value: 'Rutherfordium' },
  { label: 'Dubnium', value: 'Dubnium' },
  { label: 'Seaborgium', value: 'Seaborgium' },
  { label: 'Bohrium', value: 'Bohrium' },
  { label: 'Hassium', value: 'Hassium' },
  { label: 'Meitnerium', value: 'Meitnerium' },
  { label: 'Darmstadtium', value: 'Darmstadtium' },
  { label: 'Roentgenium', value: 'Roentgenium' },
  { label: 'Copernicium', value: 'Copernicium' },
  { label: 'Nihonium', value: 'Nihonium' },
  { label: 'Flerovium', value: 'Flerovium' },
  { label: 'Moscovium', value: 'Moscovium' },
  { label: 'Livermorium', value: 'Livermorium' },
  { label: 'Tennessine', value: 'Tennessine' },
  { label: 'Oganesson', value: 'Oganesson' },
];

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

export const WithCreateStory = createStory(
  () => {
    const getItemLabel = (option: SelectOption): string => option.label;
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<Option | null | undefined>();

    return (
      <Playground dropdownRef={[dropdownRef]}>
        <Text as="p" size="s" view="secondary" className={cnModalStories('title')}>
          Заголовок модалки
        </Text>
        <div style={{ padding: 20 }}>
          <Combobox
            id="example"
            options={items}
            value={value}
            onChange={setValue}
            getOptionLabel={getItemLabel}
            dropdownRef={dropdownRef}
          />
        </div>
      </Playground>
    );
  },
  {
    name: 'c combobox',
  },
);

export default createMetadata({
  title: 'Компоненты|/Modal',
  id: 'components/Modal',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
