import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconPosition = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <div style={{ maxWidth: 300 }}>
        <Collapse
          label="Иконка слева"
          isOpen={isOpen}
          onClick={() => setOpen(!isOpen)}
          iconPosition="left"
        >
          {content}
        </Collapse>
        <Collapse
          label="Иконка справа"
          isOpen={isOpenTwo}
          onClick={() => setOpenTwo(!isOpenTwo)}
          iconPosition="right"
        >
          {content}
        </Collapse>
      </div>
    </div>
  );
};
