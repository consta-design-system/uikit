import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageDeleted } from '##/responsesImages/ResponsesImageDeleted/ResponsesImageDeleted';

export const ResponsesDeleted = createResponses({
  name: 'ResponsesDeleted',
  image: ResponsesImageDeleted,
  title: '*Что-то* удалено',
  description: '*Что-то* успешно удалено',
  actions: (
    <>
      <Button type="button" label="Вернуть на место" />
      <Button type="button" label="Отлично!" view="ghost" />
    </>
  ),
});
