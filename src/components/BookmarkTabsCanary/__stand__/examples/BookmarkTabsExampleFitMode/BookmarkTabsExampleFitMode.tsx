import { IconGitHub } from '@consta/icons/IconGitHub';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';
import { BookmarkTabsItemDefault } from '##/components/BookmarkTabsCanary/types';

export const items: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Название 1',
    leftIcon: IconGitHub,
    fixed: true,
  },
  {
    key: 2,
    label: 'Название 2',
    leftIcon: IconGitHub,
    fixed: true,
  },
  {
    key: 3,
    label: 'Название 3',
    leftIcon: IconGitHub,
  },
  {
    key: 4,
    label: 'Название 4',
    leftIcon: IconGitHub,
  },
  {
    key: 5,
    label: 'Название 5',
    leftIcon: IconGitHub,
  },
  {
    key: 6,
    label: 'Название 6',
  },
  {
    key: 7,
    label: 'Название 7',
    leftIcon: IconGitHub,
  },
  {
    key: 8,
    label: 'Название 8',
    leftIcon: IconGitHub,
  },
  {
    key: 9,
    label: 'Название 9',
    leftIcon: IconGitHub,
  },
  {
    key: 10,
    label: 'Название 10',
    leftIcon: IconGitHub,
  },
  {
    key: 11,
    label: 'Название 11',
    leftIcon: IconGitHub,
  },
  {
    key: 12,
    label: 'Название 12',
    leftIcon: IconGitHub,
  },
];

export const BookmarkTabsExampleFitModeScroll = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        fitMode="scroll"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};

export const BookmarkTabsExampleFitModeButtons = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        fitMode="buttons"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
