import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconBag } from '../../../icons/IconBag/IconBag';
import { IconBook } from '../../../icons/IconBook/IconBook';
import { IconDocFilled } from '../../../icons/IconDocFilled/IconDocFilled';
import { IconHome } from '../../../icons/IconHome/IconHome';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  breadcrumbPropFitMode,
  breadcrumbPropFitModeDefault,
  breadcrumbPropSize,
  breadcrumbPropSizeDefault,
  Breadcrumbs,
} from '../BreadcrumbsCanary';

import mdx from './Breadcrumbs.docs.mdx';

type Page = {
  icon?: IconComponent;
  href: string;
  label: string;
  subMenu?: Page[];
};

const pages: Page[] = [
  {
    icon: IconHome,
    label: 'Главная',
    href: 'https://url.com/page-1',
    subMenu: [
      { icon: IconBag, label: 'Раздел 1', href: 'https://url.com/page-2-1' },
      {
        icon: IconBook,
        label: 'Раздел',
        href: 'https://url.com/page-2',
      },
    ],
  },
  {
    label: 'Раздел',
    href: 'https://url.com/page-2',
    subMenu: [
      { icon: IconBag, label: 'Раздел 1', href: 'https://url.com/page-2-1' },
      {
        icon: IconBook,
        label: 'Раздел',
        href: 'https://url.com/page-2',
      },
    ],
  },
  {
    label: 'Подраздел',
    href: 'https://url.com/page-3',
  },
  {
    label: 'Элемент подраздела',
    href: 'https://url.com/page-4',
  },
  {
    label: 'Дополнительные свойства элемента подраздела',
    href: 'https://url.com/page-5',
    subMenu: [
      { icon: IconBag, label: 'Раздел 1', href: 'https://url.com/page-2-1' },
      {
        icon: IconBook,
        label: 'Раздел',
        href: 'https://url.com/page-2',
      },
    ],
  },
  {
    label: 'Детальное описание свойства элемента подраздела',
    href: 'https://url.com/page-6',
  },
];

const defaultKnobs = () => ({
  size: select('size', breadcrumbPropSize, breadcrumbPropSizeDefault),
  fitMode: select('fitMode', breadcrumbPropFitMode, breadcrumbPropFitModeDefault),
  withIcon: boolean('withIcon', false),
  withSubMenu: boolean('withSubMenu', false),
  onlyIconRoot: boolean('onlyIconRoot', false),
  lastItemIsLink: boolean('lastItemIsLink', false),
});

const cnBreadcrumbsStories = cn('BreadcrumbsStories');

export function Playground() {
  const { withSubMenu, size, onlyIconRoot, fitMode, withIcon, lastItemIsLink } = defaultKnobs();

  return (
    <div className={cnBreadcrumbsStories()}>
      <Breadcrumbs
        items={pages}
        size={size}
        onlyIconRoot={onlyIconRoot}
        fitMode={fitMode}
        onItemClick={(props) => {
          props.e.preventDefault();
        }}
        getItemSubMenu={(item) => (withSubMenu ? item.subMenu : undefined)}
        lastItemIsLink={lastItemIsLink}
        getItemIcon={(item) => (withIcon ? item.icon || IconDocFilled : undefined)}
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
