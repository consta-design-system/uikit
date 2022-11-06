import React from 'react';

import { SnackBar } from '##/components/SnackBar/SnackBar';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

type Item = {
  key: string;
  message: string;
  buttons?: string[];
};

const items: Item[] = [
  {
    key: '1',
    message: 'С этим сообщением нельзя не согласиться',
    buttons: ['Согласен', 'Не согласен'],
  },
];

export const SnackBarExampleForm = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SnackBar items={items} form="default" />
      <SnackBar items={items} form="round" />
      <SnackBar items={items} form="brick" />
    </StoryBookExample>
  );
};
