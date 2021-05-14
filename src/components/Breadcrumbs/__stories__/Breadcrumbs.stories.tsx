import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { breadcrumbPropSize, breadcrumbPropSizeDefault, Breadcrumbs } from '../Breadcrumbs';

import mdx from './Breadcrumbs.docs.mdx';

const defaultKnobs = () => ({
  size: select('Size', breadcrumbPropSize, breadcrumbPropSizeDefault),
  onlyIconRoot: boolean('Only Icon Root', false),
});

type Page = {
  icon?: React.FC<IconProps>;
  link: string;
  label: string;
  isActive?: boolean;
};

const pages: Page[] = [
  {
    icon: IconSettings,
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
  },
  {
    label: 'Page4',
    link: 'https://url.com/page-4',
  },
  {
    label: 'Page5',
    link: 'https://url.com/page-5',
  },
  {
    label: 'Page6',
    link: 'https://url.com/page-6',
  },
  {
    label: 'Page7',
    link: 'https://url.com/page-7',
    isActive: true,
  },
];

const cnBreadcrumbsStories = cn('BreadcrumbsStories');

export function Playground() {
  const { size, onlyIconRoot } = defaultKnobs();

  return (
    <div className={cnBreadcrumbsStories()}>
      <Breadcrumbs
        pages={pages}
        size={size}
        onlyIconRoot={onlyIconRoot}
        getLabel={(page) => page.label}
        getIsActive={(page) => !!page.isActive}
        getLink={(page) => page.label}
        getIcon={(page) => page.icon}
        onClick={(page, e) => {
          e.preventDefault();
          console.log(page.link, e);
        }}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Навигация/Breadcrumbs',
  id: 'components/Breadcrumbs',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=7752%3A136131',
    },
  },
});
