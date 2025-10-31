import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { ModalHeader, ModalLayout } from '##/components/Modal';
import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';

import { Sidebar, SidebarPropPosition } from '../../..';

const SidebarPosition: React.FC<{ position: SidebarPropPosition }> = ({
  position,
}) => {
  const [open, setOpen] = useFlag();
  return (
    <>
      <Button
        onClick={setOpen.on}
        size="m"
        view="primary"
        label="Открыть сайдбар"
        width="default"
      />
      <Sidebar
        isOpen={open}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        style={{ zIndex: 2000 }}
        position={position}
        border
      >
        <ModalLayout border fixed space={{ p: 's' }}>
          {/* Шапка */}
          <ModalHeader>Заголовок сайдбара</ModalHeader>
          {/* Тело */}
          <Text as="p" size="m" view="primary" lineHeight="m">
            Это содержимое сайдбара. Здесь может быть что угодно: текст,
            изображение, форма или таблица. Всё, что хочется вынести из
            контекста и показать поверх основной страницы.
          </Text>
          {/* Футер */}
          <div
            className={cnMixFlex({
              gap: 'xs',
              justify: 'flex-end',
            })}
          >
            <Button
              onClick={setOpen.off}
              size="m"
              view="clear"
              label="Нет уж"
              width="default"
            />
            <Button
              onClick={setOpen.off}
              size="m"
              view="ghost"
              label="Закрыть"
              width="default"
            />
          </div>
        </ModalLayout>
      </Sidebar>
    </>
  );
};

const positions: SidebarPropPosition[] = ['right', 'bottom', 'left', 'top'];

export const ExampleSidebarPosition = () => {
  return (
    <Example
      items={positions}
      getItemNode={(position) => <SidebarPosition position={position} />}
      getItemLabel={(position) => `position = "${position}"`}
    />
  );
};
