import './Modal.variants.css';

import { IconAllDone } from '@consta/icons/IconAllDone';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '..';

type SelectOption = {
  label: string;
  value: string;
};

type Group = { label: string; items: SelectOption[] };
export type Option = SelectOption | Group;

const cnModalVariants = cn('ModalVariants');

const Variants = () => {
  const [open, setOpen] = useFlag(true);
  const hasOverlay = useBoolean('hasOverlay', true);
  const form = useSelect('form', ['default', 'brick'], 'default');
  const position = useSelect('position', ['center', 'top'], 'center');
  const border = useBoolean('border', false);
  const withHeader = useBoolean('withHeader', false);
  const fixedHeader = useBoolean('fixedHeader', false, withHeader);
  const directionHeader = useSelect(
    'directionHeader',
    ['vertical', 'horizontal'],
    'vertical',
    withHeader,
  );
  const withFooter = useBoolean('withFooter', false);
  const fixedFooter = useBoolean('fixedFooter', false, withFooter);

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
        form={form}
        position={position}
        border={border}
      >
        <ModalLayout
          fixed={[fixedHeader, fixedFooter]}
          border={[withHeader && border, withFooter && border]}
          space={{ p: 's' }}
        >
          {withHeader ? (
            <ModalHeader
              icon={IconAllDone}
              status="success"
              onClose={setOpen.off}
              direction={directionHeader}
            >
              Заголовок модального окна
            </ModalHeader>
          ) : undefined}
          <Text as="p" size="m" view="primary" lineHeight="m">
            Это содержимое модального окна. Здесь может быть что угодно: текст,
            изображение, форма или таблица. Всё, что хочется вынести из
            контекста и показать поверх основной страницы. Это содержимое
            модального окна. Здесь может быть что угодно: текст, изображение,
            форма или таблица. Всё, что хочется вынести из контекста и показать
            поверх основной страницы.Это содержимое модального окна. Здесь может
            быть что угодно: текст, изображение, форма или таблица. Всё, что
            хочется вынести из контекста и показать поверх основной страницы.Это
            содержимое модального окна. Здесь может быть что угодно: текст,
            изображение, форма или таблица. Всё, что хочется вынести из
            контекста и показать поверх основной страницы.Это содержимое
            модального окна. Здесь может быть что угодно: текст, изображение,
            форма или таблица. Всё, что хочется вынести из контекста и показать
            поверх основной страницы.
          </Text>
          {withFooter ? (
            <div
              className={cnMixFlex({
                justify: 'flex-end',
              })}
            >
              <Button
                size="m"
                view="primary"
                label="Закрыть"
                width="default"
                onClick={setOpen.off}
              />
            </div>
          ) : undefined}
        </ModalLayout>
      </Modal>
    </div>
  );
};

export default Variants;
