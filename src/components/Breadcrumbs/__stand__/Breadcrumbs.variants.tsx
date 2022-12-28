import './Breadcrumbs.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconBag } from '@consta/icons/IconBag';
import { IconBook } from '@consta/icons/IconBook';
import { IconDocFilled } from '@consta/icons/IconDocFilled';
import { IconHome } from '@consta/icons/IconHome';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import {
  breadcrumbPropFitMode,
  breadcrumbPropFitModeDefault,
  breadcrumbPropSize,
  breadcrumbPropSizeDefault,
  Breadcrumbs,
} from '../Breadcrumbs';

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

const cnBreadcrumbsVariants = cn('BreadcrumbsVariants');

const Variants = () => {
  const size = useSelect('size', breadcrumbPropSize, breadcrumbPropSizeDefault);
  const fitMode = useSelect(
    'fitMode',
    breadcrumbPropFitMode,
    breadcrumbPropFitModeDefault,
  );
  const withSubMenu = useBoolean('withSubMenu', false);
  const withIcon = useBoolean('withIcon', false);
  const onlyIconRoot = useBoolean('onlyIconRoot', false, Boolean(withIcon));
  const lastItemIsLink = useBoolean('lastItemIsLink', false);

  return (
    <Breadcrumbs
      className={cnBreadcrumbsVariants()}
      items={pages}
      size={size}
      onlyIconRoot={onlyIconRoot}
      fitMode={fitMode}
      onItemClick={(props) => {
        props.e.preventDefault();
      }}
      getItemSubMenu={(item) => (withSubMenu ? item.subMenu : undefined)}
      lastItemIsLink={lastItemIsLink}
      getItemIcon={(item) =>
        withIcon ? item.icon || IconDocFilled : undefined
      }
    />
  );
};

export default Variants;
