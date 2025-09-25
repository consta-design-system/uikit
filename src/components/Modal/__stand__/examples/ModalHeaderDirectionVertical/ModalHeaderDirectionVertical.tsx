import './ModalHeaderDirectionVertical.css';

import { IconWifiOff } from '@consta/icons/IconWifiOff';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

const cnModalHeaderDirectionVertical = cn('ModalHeaderDirectionVertical');

export const ModalHeaderDirectionVertical = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 400 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalHeaderDirectionVertical('Modal')}
        isOpen
        hasOverlay={false}
        border
      >
        <ModalLayout space={[{ p: 'm' }, { p: 'm' }]} border>
          <ModalHeader
            onClose={() => {}}
            direction="vertical"
            status="warning"
            icon={IconWifiOff}
          >
            Ошибка подключения
          </ModalHeader>
          <Text align="center">
            Не удается подключиться к WI-FI. Проверьте соединение и повторите
            попытку
          </Text>
          <div
            className={cnModalHeaderDirectionVertical('Footer', [
              cnMixFlex({
                gap: 'xs',
                direction: 'column',
              }),
              cnMixSpace({ p: 'm' }),
            ])}
          >
            <Button label="Повторить попытку" width="full" />
            <Button view="ghost" label="Отмена" width="full" />
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
