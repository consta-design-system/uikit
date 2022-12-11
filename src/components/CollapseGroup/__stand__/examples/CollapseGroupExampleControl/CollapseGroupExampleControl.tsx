import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { items } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

const defaultOpened = items.map((_, index) => index);

export const CollapseGroupExampleControl = () => {
  const [opened, setOpened] = useState<number[] | null>(defaultOpened);

  return (
    <Example>
      <CollapseGroup
        items={items}
        opened={opened}
        onOpen={({ value }) => setOpened(value)}
      />
    </Example>
  );
};
