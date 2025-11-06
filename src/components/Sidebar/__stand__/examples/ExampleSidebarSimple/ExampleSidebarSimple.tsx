import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { ModalHeader, ModalLayout } from '##/components/Modal';
import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';

import { Sidebar } from '../../..';

export const ExampleSidebarSimple = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Открыть сайдбар"
          width="default"
          onClick={setOpen.on}
        />
      </Example>
      <Sidebar
        isOpen={open}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        style={{ zIndex: 2000 }}
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
              view="primary"
              label="Кнопка"
              width="default"
            />
          </div>
        </ModalLayout>
      </Sidebar>
    </>
  );
};
