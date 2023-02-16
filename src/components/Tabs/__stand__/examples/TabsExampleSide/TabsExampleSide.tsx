import { IconRestart } from '@consta/icons/IconRestart';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { Button } from '##/components/Button';

import { Tabs } from '../../../Tabs';

type Item = {
  label: string;
  status: 'success' | 'error';
};

const items: Item[] = [
  {
    label: 'typescript test',
    status: 'success',
  },
  {
    label: 'unit test',
    status: 'error',
  },
  {
    label: 'build test',
    status: 'success',
  },
];

const getItemRightSide = ({ status }: Item) => [
  <Badge size="xs" status={status} label={status} />,
  status === 'error' && (
    <Button
      tabIndex={0}
      as="span"
      label="Rerun"
      iconLeft={IconRestart}
      view="ghost"
      size="xs"
      onlyIcon
    />
  ),
];

export const TabsExampleSide = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemRightSide={getItemRightSide}
        fitMode="scroll"
      />
    </Example>
  );
};
