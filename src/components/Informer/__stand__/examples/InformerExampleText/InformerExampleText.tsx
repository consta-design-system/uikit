import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Informer } from '../../../Informer';

export const InformerExampleSuccess = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Informer
      status="success"
      view="filled"
      title="Заявка отправлена"
      label="Подождите до завтра: мы всё посчитаем и вам позвоним"
    />
  </StoryBookExample>
);

export const InformerExampleAlert = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Informer
      status="alert"
      view="filled"
      title="Ничего не вышло"
      label="Попробуйте выйти и зайти снова. Если не получается, нажмите красную кнопку три раза"
    />
  </StoryBookExample>
);
