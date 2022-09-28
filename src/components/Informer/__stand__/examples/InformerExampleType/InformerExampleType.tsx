import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Informer } from '../../../Informer';

export const InformerExampleType = () => (
  <div>
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Informer
        status="success"
        view="filled"
        title="Всё хорошо — это 'success'"
        label="Подходит, чтобы рассказать об успешном результате процесса, в котором сейчас находится пользователь"
      />
      <Informer
        status="warning"
        view="filled"
        title="Внимание — это 'alert'"
        label="Здесь можно написать важную информацию, которая может понадобиться прямо сейчас. Например, о каких-то ограничениях"
      />
      <Informer
        status="alert"
        view="filled"
        title="Не получилось — это 'warning'"
        label="Подходит, чтобы рассказать об ошибке в процессе"
      />
      <Informer
        status="system"
        view="filled"
        title="Важно, но не критично — это 'system'"
        label="Это просто информация, которую стоит выделить"
      />
    </StoryBookExample>
  </div>
);
