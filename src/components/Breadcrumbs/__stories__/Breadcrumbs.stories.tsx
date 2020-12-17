import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { breadcrumbPropSize, breadcrumbPropSizeDefault, Breadcrumbs } from '../Breadcrumbs';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Breadcrumbs.mdx';

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
    link: 'https://url.com/page-3',
  },
  {
    label: 'Page5',
    link: 'https://url.com/page-4',
  },
  {
    label: 'Page6',
    link: 'https://url.com/page-5',
  },
  {
    label: 'Page7',
    link: 'https://url.com/page-6',
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
  title: 'Компоненты|/Breadcrumbs',
  id: 'components/Breadcrumbs',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
