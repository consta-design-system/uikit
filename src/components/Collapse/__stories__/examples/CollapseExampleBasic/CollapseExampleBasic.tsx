import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExample = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="Это самый настоящий коллапс"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {content}
      </Collapse>
    </div>
  );
};
