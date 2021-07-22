import React, { useState } from 'react';

import { items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { CollapseGroup } from '../../../CollapseGroup';

const defaultOpened = items.map((_, index) => index);

export const CollapseGroupExampleControl = () => {
  const [opened, setOpened] = useState<number[] | null>(defaultOpened);

  return (
    <div className={cnDocsDecorator('Section')}>
      <CollapseGroup items={items} opened={opened} onOpen={({ value }) => setOpened(value)} />
    </div>
  );
};
