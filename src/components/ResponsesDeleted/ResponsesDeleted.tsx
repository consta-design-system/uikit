import React from 'react';

import { ResponsesImageDeleted } from '../../responsesImages/ResponsesImageDeleted/ResponsesImageDeleted';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesDeleted = createResponses({
  name: 'ResponsesDeleted',
  image: ResponsesImageDeleted,
  title: '*Что-то* удалено',
  description: '*Что-то* успешно удалено',
  actions: (
    <>
      <Button label="Вернуть на место" view="ghost" style={{ marginRight: 'var(--space-m)' }} />
      <Button label="Отлично!" view="ghost" />
    </>
  ),
});
