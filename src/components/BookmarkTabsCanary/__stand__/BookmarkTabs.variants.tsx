import { IconGitHub } from '@consta/icons/IconGitHub';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';

import { items } from '../__mocks__/mock.data';
import {
  BookmarkTabsItemDefault,
  bookmarkTabsPropForm,
  bookmarkTabsPropFormDefault,
  bookmarkTabsPropSize,
  bookmarkTabsPropSizeDefault,
  bookmarkTabsPropView,
  bookmarkTabsPropViewDefault,
} from '../types';

const Variants = () => {
  const size = useSelect(
    'size',
    bookmarkTabsPropSize,
    bookmarkTabsPropSizeDefault,
  );
  const view = useSelect(
    'view',
    bookmarkTabsPropView,
    bookmarkTabsPropViewDefault,
  );
  const form = useSelect(
    'form',
    bookmarkTabsPropForm,
    bookmarkTabsPropFormDefault,
  );
  const fitMode = useSelect('fitMode', ['scroll', 'buttons'], 'buttons');
  const withAddButton = useBoolean('withAddButton', true);
  const withCloseButton = useBoolean('withCloseButton', true);

  const [array, setArray] = useState<BookmarkTabsItemDefault[]>(items);
  const [value, setValue] = useState(items[3]);

  const onRemove = (item: BookmarkTabsItemDefault) => {
    setArray(array.filter((el) => el.key !== item.key));
  };

  const onCreate = () => {
    const key = Number(array[array.length - 1]?.key ?? 0) + 1;
    setArray([
      ...array,
      {
        key,
        label: `Название ${key}`,
        leftIcon: IconGitHub,
      },
    ]);
  };

  return (
    <BookmarkTabs
      items={array}
      size={size}
      form={form}
      value={value}
      fitMode={fitMode}
      onChange={setValue}
      view={view}
      getItemRightIcon={() => IconGitHub}
      onRemove={withCloseButton ? onRemove : undefined}
      onCreate={withAddButton ? onCreate : undefined}
    />
  );
};

export default Variants;
