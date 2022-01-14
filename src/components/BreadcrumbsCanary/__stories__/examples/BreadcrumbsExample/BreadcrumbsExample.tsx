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
    label: 'Home',
    href: 'https://url.com',
  },
  {
    icon: IconLeaf,
    label: 'Page1',
    href: 'https://url.com/page-1',
  },
  {
    icon: IconCards,
    label: 'Page2',
    href: 'https://url.com/page-2',
  },
  {
    icon: IconDrag,
    label: 'Page3',
    href: 'https://url.com/page-3',
  },
];

const pagesNoIcon = [
  {
    label: 'Home',
    href: 'https://url.com',
  },
  {
    label: 'Page1',
    href: 'https://url.com/page-1',
  },
  {
    label: 'Page2',
    href: 'https://url.com/page-2',
  },
  {
    label: 'Page3',
    href: 'https://url.com/page-3',
    active: true,
  },
];

const onItemClick = (props: { item: DefaultItem; e: React.MouseEvent }) => {
  props.e.preventDefault();
  console.log(props.item.href, props.e);
};

export const BreadcrumbsExample = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" maxCount={8} onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleActive = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" maxCount={8} onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleMax = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pagesNoIcon} size="m" maxCount={3} onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIcons = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pages} size="m" maxCount={8} onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIconRoot = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Breadcrumbs items={pages} size="m" onlyIconRoot maxCount={8} onItemClick={onItemClick} />
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleSize = () => {
  return (
    <StoryBookExample>
      <Breadcrumbs items={pages} size="xs" maxCount={8} onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="s" maxCount={8} onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="m" maxCount={8} onlyIconRoot onItemClick={onItemClick} />
      <Breadcrumbs items={pages} size="l" maxCount={8} onlyIconRoot onItemClick={onItemClick} />
    </StoryBookExample>
  );
};
