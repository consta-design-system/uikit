import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleIsAccordion = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <CollapseGroup items={items} isAccordion />
    </div>
  );
};
