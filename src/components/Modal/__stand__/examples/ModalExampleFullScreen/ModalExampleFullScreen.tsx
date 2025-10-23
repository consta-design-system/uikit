import './ModalExampleFullScreen.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '../../..';

const cnModalExampleFullScreen = cn('ModalExampleFullScreen');

export const ModalExampleFullScreen = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <Example>
        <Button label="Открыть модальное окно" onClick={setOpen.on} />
      </Example>
      <Modal
        rootClassName={cnModalExampleFullScreen('Wrapper')}
        className={cnModalExampleFullScreen('Modal')}
        isOpen={open}
        hasOverlay={false}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
      >
        <ModalLayout space={{ p: 'm' }} border={[true, false]}>
          <ModalHeader onClose={setOpen.off}>
            Заголовок модального окна
          </ModalHeader>
          <Text>Содержимое модального окна</Text>
        </ModalLayout>
      </Modal>
    </>
  );
};
