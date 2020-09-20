import './SnackBarExampleIcon.css';

import React from 'react';

import { IconDisconnection } from '../../../../../icons/IconDisconnection/IconDisconnection';
import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleIcon = cn('SnackBarExampleIcon');

export const SnackBarExampleIcon = () => {
  const items = [
    {
      key: 1,
      message: 'Тихо, тигры спят!',
      status: 'alert',
      icon: IconMoon,
    },
    {
      key: 2,
      message: 'Интернет внезапно кончился',
      status: 'warning',
      icon: IconDisconnection,
    },
  ];
  return (
    <div className={cnSnackBarExampleIcon('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleIcon('SnackBar')} items={items} />
    </div>
  );
};
