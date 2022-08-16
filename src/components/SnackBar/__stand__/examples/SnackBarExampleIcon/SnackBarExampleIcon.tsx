import './SnackBarExampleIcon.css';

import React from 'react';

import { IconDisconnection } from '../../../../../icons/IconDisconnection/IconDisconnection';
import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleIcon = cn('SnackBarExampleIcon');

type Item = {
  key: string;
  message: string;
  status: 'normal' | 'warning';
};

const items: Item[] = [
  {
    key: '1',
    message: 'Тихо, тигры спят!',
    status: 'normal',
  },
  {
    key: '2',
    message: 'Интернет внезапно кончился',
    status: 'warning',
  },
];

const getIcon = (item: Item) => {
  if (item.status === 'normal') {
    return IconMoon;
  }
  return IconDisconnection;
};

export const SnackBarExampleIcon = () => {
  return (
    <div className={cnSnackBarExampleIcon('', [cnDocsDecorator('Section')])}>
      <SnackBar
        className={cnSnackBarExampleIcon('SnackBar')}
        items={items}
        getItemIcon={getIcon}
      />
    </div>
  );
};
