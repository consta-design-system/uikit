import './Modal.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Modal } from '../Modal';

type SelectOption = {
  label: string;
  value: string;
};

type Group = { label: string; items: SelectOption[] };
export type Option = SelectOption | Group;

const cnModalVariants = cn('ModalVariants');

const Variants = () => {
  const [open, setOpen] = useFlag();
  const hasOverlay = useBoolean('hasOverlay', true);
  const width = useSelect('width', ['auto'], 'auto');
  const position = useSelect('position', ['center', 'top'], 'center');

  return (
    <div className={cnModalVariants()}>
      <Button
        size="m"
        view="primary"
        label="Открыть модальное окно"
        width="default"
        onClick={setOpen.on}
      />
      <Modal
        className={cnModalVariants('Modal')}
        isOpen={open}
        hasOverlay={hasOverlay}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        width={width}
        position={position}
        refsForExcludeClickOutside={[...[]]}
      >
        <>
          <Text
            as="p"
            size="s"
            view="secondary"
            className={cnModalVariants('Title')}
          >
            Это заголовок модального окна
          </Text>
          <Text
            as="p"
            size="m"
            view="primary"
            className={cnModalVariants('Body')}
          >
            Это содержимое модального окна. Здесь может быть что угодно: текст,
            изображение, форма или таблица. Всё, что хочется вынести из
            контекста и показать поверх основной страницы.
          </Text>
        </>
        <div className={cnModalVariants('Action')}>
          <Button
            size="m"
            view="primary"
            label="Закрыть"
            width="default"
            onClick={setOpen.off}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Variants;
