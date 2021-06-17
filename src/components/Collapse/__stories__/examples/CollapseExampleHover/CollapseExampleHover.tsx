import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Collapse } from '../../../Collapse';

export const CollapseExampleHover = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="Здесь есть подсветка"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        hoverEffect
      >
        {content}
      </Collapse>
    </div>
  );
};
