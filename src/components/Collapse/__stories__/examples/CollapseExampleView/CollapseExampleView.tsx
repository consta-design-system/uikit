import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Collapse } from '../../../Collapse';

export const CollapseExampleView = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse label="Primary" view="primary" isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        {content}
      </Collapse>
      <Collapse
        label="Secondary"
        view="secondary"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        {content}
      </Collapse>
    </div>
  );
};
