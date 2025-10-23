import './ModalExampleImage.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { ResponsesImageSuccess } from '##/responsesImages/ResponsesImageSuccess/ResponsesImageSuccess';
import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

const cnModalExampleImage = cn('ModalExampleImage');

export const ModalExampleImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 640 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalExampleImage('Modal')}
        isOpen
        hasOverlay={false}
        border
      >
        <ModalLayout space={[{ p: 'm' }, { pB: 'm', pH: 'm' }, { p: 'm' }]}>
          <ModalHeader onClose={() => {}} direction="vertical">
            <div
              className={cnModalExampleImage('HeaderContent', [
                cnMixFlex({
                  gap: 'xs',
                  align: 'center',
                  direction: 'column',
                }),
              ])}
            >
              <ResponsesImageSuccess className={cnModalExampleImage('Image')} />
              <Text align="center" view="primary" size="m" weight="semibold">
                Заголовок модального окна
              </Text>
            </div>
          </ModalHeader>
          <Text size="m" view="primary" lineHeight="m" align="center">
            На почту будет отправлено письмо от системы учета данных. При
            возникновении проблем обращайтесь на тех. портал в раздел «Помощь с
            заявками»
          </Text>
          <div
            className={cnMixFlex({
              gap: 'xs',
              justify: 'center',
            })}
          >
            <Button size="m" view="primary" label="Отменить" width="default" />
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
