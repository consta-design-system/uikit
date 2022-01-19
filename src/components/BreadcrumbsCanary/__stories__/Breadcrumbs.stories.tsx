import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { breadcrumbPropSize, breadcrumbPropSizeDefault, Breadcrumbs } from '../BreadcrumbsCanary';

import mdx from './Breadcrumbs.docs.mdx';

const defaultKnobs = () => ({
  size: select('Size', breadcrumbPropSize, breadcrumbPropSizeDefault),
  onlyIconRoot: boolean('Only Icon Root', false),
});

type Page = {
  icon?: IconComponent;
  href: string;
  label: string;
  active?: boolean;
};

const pages: Page[] = [
  {
    icon: IconSettings,
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
  },
  {
    label: 'Page4',
    href: 'https://url.com/page-4',
  },
  {
    label: 'Page5',
    href: 'https://url.com/page-5',
  },
  {
    label: 'Page6',
    href: 'https://url.com/page-6',
  },
  {
    label: 'Page7',
    href: 'https://url.com/page-7',
    active: true,
  },
];

const cnBreadcrumbsStories = cn('BreadcrumbsStories');

export function Playground() {
  const { size, onlyIconRoot } = defaultKnobs();

  return (
    <div className={cnBreadcrumbsStories()}>
      <Breadcrumbs
        items={pages}
        size={size}
        onlyIconRoot={onlyIconRoot}
        onItemClick={({ item, e }) => {
          e.preventDefault();
          console.log(item.href, e);
        }}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Навигация/Breadcrumbs(Canary)',
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
