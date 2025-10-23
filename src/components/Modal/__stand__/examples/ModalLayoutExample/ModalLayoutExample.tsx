import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';

import { Modal, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

export const ModalLayoutExample = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 300 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        isOpen
        hasOverlay={false}
        style={{ height: 250, width: 400 }}
        border
      >
        <ModalLayout space={{ p: 'm' }} border fixed>
          {/* Шапка */}
          Это заголовок модального окна
          {/* Тело */}
          <Text as="p" size="m" view="primary" lineHeight="m">
            Это содержимое модального окна. Здесь может быть что угодно: текст,
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
            <Button size="m" view="primary" label="Кнопка" width="default" />
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
