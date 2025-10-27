import './Sidebar.variants.css';

import { IconSettings } from '@consta/icons/IconSettings';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { ModalHeader, ModalLayout } from '##/components/Modal';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Sidebar, sidebarPropSize } from '..';

const cnSidebarVariants = cn('SidebarVariants');

const Variants = () => {
  const size = useSelect('size', sidebarPropSize, sidebarPropSize[1]);
  const position = useSelect(
    'position',
    ['right', 'bottom', 'left', 'top'],
    'right',
  );
  const [open, setOpen] = useFlag(true);
  const hasOverlay = useBoolean('hasOverlay', true);

  const withHeader = useBoolean('withHeader', false);
  const fixedHeader = useBoolean('fixedHeader', false, withHeader);

  const withFooter = useBoolean('withFooter', false);
  const fixedFooter = useBoolean('fixedFooter', false, withFooter);
  const border = useBoolean('border');

  return (
    <div className={cnSidebarVariants()}>
      <Button
        size="m"
        view="primary"
        label="Открыть сайдбар"
        width="default"
        onClick={setOpen.on}
      />
      <Sidebar
        className={cnSidebarVariants('Sidebar')}
        isOpen={open}
        hasOverlay={hasOverlay}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        size={size}
        position={position}
        border={border}
      >
        <ModalLayout
          fixed={[fixedHeader, fixedFooter]}
          border={[border && withHeader, border && withFooter]}
          space={{ p: 's' }}
        >
          {withHeader ? (
            <ModalHeader
              className={cnSidebarVariants('Header')}
              icon={IconSettings}
              onClose={setOpen.off}
            >
              Заголовок
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
            содержимое модального окна.
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
      </Sidebar>
    </div>
  );
};

export default Variants;
