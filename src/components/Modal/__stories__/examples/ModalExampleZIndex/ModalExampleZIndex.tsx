import React from 'react';

import { withTooltip } from '../../../../../hocs/withTooltip/withTooltip';
import { useFlag } from '../../../../../hooks/useFlag/useFlag';
import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Button } from '../../../../Button/Button';
import { Select } from '../../../../Select/Select';
import { Modal } from '../../../Modal';

const ButtonWithTooltip = withTooltip({ mode: 'click', content: 'Я тултип' })(Button);

export function ModalExampleZIndex() {
  const [isModalOpen, setIsModalOpen] = useFlag();
  const [isModal2Open, setIsModal2Open] = useFlag();

  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="Открыть модальное окно"
        width="default"
        onClick={setIsModalOpen.toogle}
      />
      <Modal
        className={cnMixSpace({ p: 'm' })}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={setIsModalOpen.off}
        onEsc={setIsModalOpen.off}
        style={{ zIndex: 100 }}
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
          className={cnMixSpace({ mB: 'm', mR: '6xl' })}
          label="нажми и появится тултип"
        />
        <Button
          size="m"
          view="primary"
          label="Открыть вложенное модальное окно"
          width="default"
          onClick={setIsModal2Open.toogle}
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
          <ButtonWithTooltip className={cnMixSpace({ mB: 'm' })} label="нажми и появится тултип" />
        </Modal>
      </Modal>
    </div>
  );
}
