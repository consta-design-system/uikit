import { Example } from '@consta/stand';
import React from 'react';

import { withTooltip } from '../../../../../hocs/withTooltip/withTooltip';
import { useFlag } from '../../../../../hooks/useFlag/useFlag';
import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { Button } from '../../../../Button/Button';
import { Select } from '../../../../Select/Select';
import { Modal } from '../../../Modal';

const ButtonWithTooltip = withTooltip({ mode: 'click', content: 'Я тултип' })(
  Button,
);

export const ModalExampleZIndex = () => {
  const [isModalOpen, setIsModalOpen] = useFlag();
  const [isModal2Open, setIsModal2Open] = useFlag();

  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Открыть модальное окно"
          width="default"
          onClick={setIsModalOpen.toggle}
        />
      </Example>
      <Modal
        className={cnMixSpace({ p: 'm' })}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={setIsModalOpen.off}
        onEsc={setIsModalOpen.off}
        style={{ zIndex: 2000 }}
      >
        <Select
          className={cnMixSpace({ mB: 'm' })}
          items={['один', 'два']}
          getItemLabel={(item) => item}
          getItemKey={(item) => item}
          onChange={({ value }) => console.log(value)}
          placeholder="Один или два"
        />
        <ButtonWithTooltip
          className={cnMixSpace({ mB: 'm', mR: 'm' })}
          label="Нажмите, и появится тултип"
        />
        <Button
          size="m"
          view="primary"
          label="Открыть вложенное модальное окно"
          width="default"
          onClick={setIsModal2Open.toggle}
        />
        <Modal
          className={cnMixSpace({ p: 'm' })}
          isOpen={isModal2Open}
          hasOverlay
          onClickOutside={setIsModal2Open.off}
          onEsc={setIsModal2Open.off}
        >
          <Select
            className={cnMixSpace({ mB: 'm' })}
            items={['один', 'два']}
            getItemLabel={(item) => item}
            getItemKey={(item) => item}
            onChange={({ value }) => console.log(value)}
            placeholder="Один или два"
          />
          <ButtonWithTooltip
            className={cnMixSpace({ mB: 'm' })}
            label="Нажмите, и появится тултип"
          />
        </Modal>
      </Modal>
    </>
  );
};
