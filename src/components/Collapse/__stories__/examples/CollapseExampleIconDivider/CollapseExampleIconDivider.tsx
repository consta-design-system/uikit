import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconDivider = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="Здесь есть разделитель"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        divider
      >
        {content}
      </Collapse>
    </div>
  );
};
