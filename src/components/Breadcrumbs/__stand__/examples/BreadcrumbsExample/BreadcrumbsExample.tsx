import { IconCards } from '@consta/icons/IconCards';
import { IconDrag } from '@consta/icons/IconDrag';
import { IconHand } from '@consta/icons/IconHand';
import { IconLeaf } from '@consta/icons/IconLeaf';
import { Example } from '@consta/stand';
import React from 'react';

import { Breadcrumbs, DefaultItem } from '../../../Breadcrumbs';

const pages = [
  {
    icon: IconHand,
    label: 'Главная',
    href: 'https://url.com',
  },
  {
    icon: IconLeaf,
    label: 'Страница 1',
    href: 'https://url.com/page-1',
  },
  {
    icon: IconCards,
    label: 'Страница 2',
    href: 'https://url.com/page-2',
  },
  {
    icon: IconDrag,
    label: 'Страница 3',
    href: 'https://url.com/page-3',
  },
];

const pagesNoIcon = [
  {
    label: 'Главная',
    href: 'https://url.com',
  },
  {
    label: 'Страница 1',
    href: 'https://url.com/page-1',
  },
  {
    label: 'Страница 2',
    href: 'https://url.com/page-2',
  },
  {
    label: 'Страница 3',
    href: 'https://url.com/page-3',
  },
];

const pagesSubMenu = [
  {
    label: 'Главная',
    href: 'https://url.com',
    subMenu: [
      {
        label: 'Еще одна страница',
        href: 'https://url.com/1',
        subMenu: [
          {
            label: 'Подпункт',
            href: 'https://url.com/1-1',
          },
        ],
      },
      { label: 'Другая страница', href: 'https://url.com/2' },
    ],
  },
  {
    label: 'Страница 1',
    href: 'https://url.com/page-1',
  },
  {
    label: 'Страница 2',
    href: 'https://url.com/page-2',
  },
  {
    label: 'Страница 3',
    href: 'https://url.com/page-3',
    subMenu: [
      { label: 'Страница 3-1', href: 'https://url.com/page-3-1' },
      { label: 'Страница 3-2', href: 'https://url.com/page-3-2' },
    ],
  },
];

const pagesLongLabels = [
  {
    label: 'Главная',
    href: 'https://url.com',
  },
  {
    label: 'Раздел',
    href: 'https://url.com/page-1',
  },
  {
    label: 'Элемент раздела',
    href: 'https://url.com/page-2',
  },
  {
    label: 'Дополнителные свойства элемента раздела',
    href: 'https://url.com/page-3',
  },
  {
    label: 'Описание свойства элемента раздела',
    href: 'https://url.com/page-4',
  },
];

const pagesSimple = ['Главная', 'Страница 1', 'Страница 2', 'Страница 3'];

const onItemClick = (props: { item: DefaultItem; e: React.MouseEvent }) => {
  props.e.preventDefault();
};

export const BreadcrumbsCustomType = () => {
  return (
    <Example col={1}>
      <Breadcrumbs items={pagesSimple} getItemLabel={(item) => item} />
    </Example>
  );
};

export const BreadcrumbsExample = () => {
  return (
    <Example col={1}>
      <Breadcrumbs items={pagesNoIcon} size="m" onItemClick={onItemClick} />
    </Example>
  );
};

export const BreadcrumbsExampleActive = () => {
  return (
    <Example col={1}>
      <Breadcrumbs items={pagesNoIcon} size="m" onItemClick={onItemClick} />
    </Example>
  );
};

export const BreadcrumbsExampleSubMenu = () => {
  return (
    <Example col={1}>
      <Breadcrumbs items={pagesSubMenu} size="m" onItemClick={onItemClick} />
    </Example>
  );
};

export const BreadcrumbsExampleFitMode = () => {
  return (
    <Example col={1}>
      <Breadcrumbs
        items={pagesLongLabels}
        onItemClick={onItemClick}
        fitMode="dropdown"
      />
      <Breadcrumbs
        items={pagesLongLabels}
        onItemClick={onItemClick}
        fitMode="scroll"
      />
    </Example>
  );
};

export const BreadcrumbsExampleIcons = () => {
  return (
    <Example col={1}>
      <Breadcrumbs items={pages} size="m" onItemClick={onItemClick} />
    </Example>
  );
};

export const BreadcrumbsExampleIconRoot = () => {
  return (
    <Example col={1}>
      <Breadcrumbs
        items={pagesNoIcon}
        size="m"
        onlyIconRoot
        onItemClick={onItemClick}
      />
    </Example>
  );
};

export const BreadcrumbsExamplelastItemIsLink = () => {
  return (
    <Example col={1}>
      <Breadcrumbs
        items={pagesNoIcon}
        size="m"
        lastItemIsLink
        onItemClick={onItemClick}
      />
    </Example>
  );
};

export const BreadcrumbsExampleSize = () => {
  return (
    <Example col={1}>
      <Breadcrumbs
        items={pages}
        size="xs"
        onlyIconRoot
        onItemClick={onItemClick}
      />
      <Breadcrumbs
        items={pages}
        size="s"
        onlyIconRoot
        onItemClick={onItemClick}
      />
      <Breadcrumbs
        items={pages}
        size="m"
        onlyIconRoot
        onItemClick={onItemClick}
      />
      <Breadcrumbs
        items={pages}
        size="l"
        onlyIconRoot
        onItemClick={onItemClick}
      />
    </Example>
  );
};
