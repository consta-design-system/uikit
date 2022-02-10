import React from 'react';

import { IconCards } from '../../../../../icons/IconCards/IconCards';
import { IconDrag } from '../../../../../icons/IconDrag/IconDrag';
import { IconHand } from '../../../../../icons/IconHand/IconHand';
import { IconLeaf } from '../../../../../icons/IconLeaf/IconLeaf';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Breadcrumbs, DefaultItem } from '../../../BreadcrumbsCanary';

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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesSimple} getItemLabel={(item) => item} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExample = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleActive = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleFitMode = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesLongLabels} onItemClick={onItemClick} fitMode="dropdown" />
      <Breadcrumbs items={pagesLongLabels} onItemClick={onItemClick} fitMode="scroll" />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIcons = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pages} size="m" onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIconRoot = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" onlyIconRoot onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExamplelastItemIsLink = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" lastItemIsLink onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleSize = () => {
  return (
    <StoryBookExample>
      <Breadcrumbs items={pages} size="xs" onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="s" onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="m" onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="l" onlyIconRoot onItemClick={onItemClick} />
    </StoryBookExample>
  );
};
