import { IconCards } from '@consta/icons/IconCards';
import { IconDrag } from '@consta/icons/IconDrag';
import { IconHand } from '@consta/icons/IconHand';
import { IconLeaf } from '@consta/icons/IconLeaf';
import { Example } from '@consta/stand';
import React from 'react';

import { Breadcrumbs } from '../../../BreadcrumbsDeprecated';

const pages = [
  {
    icon: IconHand,
    label: 'Главная',
    link: 'https://url.com',
  },
  {
    icon: IconLeaf,
    label: 'Страница 1',
    link: 'https://url.com/page-1',
  },
  {
    icon: IconCards,
    label: 'Страница 2',
    link: 'https://url.com/page-2',
  },
  {
    icon: IconDrag,
    label: 'Страница 3',
    link: 'https://url.com/page-3',
  },
];

const pagesNoIcon = [
  {
    label: 'Главная',
    link: 'https://url.com',
  },
  {
    label: 'Страница 1',
    link: 'https://url.com/page-1',
  },
  {
    label: 'Страница 2',
    link: 'https://url.com/page-2',
  },
  {
    label: 'Страница 3',
    link: 'https://url.com/page-3',
    isActive: true,
  },
];

export const BreadcrumbsExample = () => {
  return (
    <Example>
      <Breadcrumbs
        className="myClassName"
        pages={pagesNoIcon}
        size="m"
        maxCount={8}
        getLabel={(item) => item.label}
        getLink={(item) => item.label}
        onClick={(item, e) => {
          e.preventDefault();
          console.log(item.link, e);
        }}
      />
    </Example>
  );
};

export const BreadcrumbsExampleActive = () => {
  return (
    <Example>
      <Breadcrumbs
        className="myClassName"
        pages={pagesNoIcon}
        size="m"
        maxCount={8}
        getLabel={(item) => item.label}
        getIsActive={(item) => !!item.isActive}
        getLink={(item) => item.label}
        onClick={(item, e) => {
          e.preventDefault();
          console.log(item.link, e);
        }}
      />
    </Example>
  );
};

export const BreadcrumbsExampleMax = () => {
  return (
    <Example>
      <Breadcrumbs
        className="myClassName"
        pages={pagesNoIcon}
        size="m"
        maxCount={3}
        getLabel={(item) => item.label}
        getLink={(item) => item.label}
        onClick={(item, e) => {
          e.preventDefault();
          console.log(item.link, e);
        }}
      />
    </Example>
  );
};

export const BreadcrumbsExampleIcons = () => {
  return (
    <Example>
      <Breadcrumbs
        className="myClassName"
        pages={pages}
        size="m"
        maxCount={8}
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
    </Example>
  );
};

export const BreadcrumbsExampleIconRoot = () => {
  return (
    <Example>
      <Breadcrumbs
        className="myClassName"
        pages={pages}
        size="m"
        onlyIconRoot
        maxCount={8}
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
    </Example>
  );
};

export const BreadcrumbsExampleSize = () => {
  return (
    <Example col={1}>
      <Breadcrumbs
        pages={pages}
        size="xs"
        maxCount={8}
        onlyIconRoot
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
      <Breadcrumbs
        pages={pages}
        size="s"
        maxCount={8}
        onlyIconRoot
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
      <Breadcrumbs
        pages={pages}
        size="m"
        maxCount={8}
        onlyIconRoot
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
      <Breadcrumbs
        className="myClassName"
        pages={pages}
        size="l"
        maxCount={8}
        onlyIconRoot
        getLabel={(page) => page.label}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
    </Example>
  );
};
