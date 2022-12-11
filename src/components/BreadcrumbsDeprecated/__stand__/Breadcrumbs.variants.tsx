import { IconComponent } from '@consta/icons/Icon';
import { IconSettings } from '@consta/icons/IconSettings';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import {
  breadcrumbPropSize,
  breadcrumbPropSizeDefault,
  Breadcrumbs,
} from '../BreadcrumbsDeprecated';

type Page = {
  icon?: IconComponent;
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

const Variants = () => {
  const size = useSelect('size', breadcrumbPropSize, breadcrumbPropSizeDefault);
  const onlyIconRoot = useBoolean('onlyIconRoot', false);

  return (
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
  );
};

export default Variants;
