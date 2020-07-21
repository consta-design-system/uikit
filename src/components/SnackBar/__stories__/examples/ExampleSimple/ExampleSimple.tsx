import './ExampleSimple.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { SnackBar } from '../../../SnackBar';
import { cn } from '../../cn';

const cnExampleSimple = cn('ExampleSimple');

export const ExampleSimple = () => {
  const items = [
    {
      key: 1,
      message: 'Сообщение',
    },
  ];
  return (
    <div className={cnExampleSimple('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnExampleSimple('SnackBar')} items={items} />
    </div>
  );
};
