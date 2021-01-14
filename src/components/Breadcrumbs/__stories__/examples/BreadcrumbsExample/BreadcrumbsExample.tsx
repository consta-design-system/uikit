import React from 'react';

import { IconCards } from '../../../../../icons/IconCards/IconCards';
import { IconDrag } from '../../../../../icons/IconDrag/IconDrag';
import { IconHand } from '../../../../../icons/IconHand/IconHand';
import { IconLeaf } from '../../../../../icons/IconLeaf/IconLeaf';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Breadcrumbs } from '../../../Breadcrumbs';

const pages = [
  {
    icon: IconHand,
    label: 'Home',
    link: 'https://url.com',
  },
  {
    icon: IconLeaf,
    label: 'Page1',
    link: 'https://url.com/page-1',
  },
  {
    icon: IconCards,
    label: 'Page2',
    link: 'https://url.com/page-2',
  },
  {
    icon: IconDrag,
    label: 'Page3',
    link: 'https://url.com/page-3',
  },
];

const pagesNoIcon = [
  {
    label: 'Home',
    link: 'https://url.com',
  },
  {
    label: 'Page1',
    link: 'https://url.com/page-1',
  },
  {
    label: 'Page2',
    link: 'https://url.com/page-2',
  },
  {
    label: 'Page3',
    link: 'https://url.com/page-3',
    isActive: true,
  },
];

export const BreadcrumbsExample = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleActive = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleMax = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIcons = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleIconRoot = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
};

export const BreadcrumbsExampleSize = () => {
  return (
    <StoryBookExample>
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
    </StoryBookExample>
  );
};
