import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImage500 } from '##/responsesImages/ResponsesImage500/ResponsesImage500';

export const Responses500 = createResponses({
  name: 'Responses500',
  image: ResponsesImage500,
  title: 'Что-то сломалось',
  description: 'Попробуйте обновить страницу или зайдите позже',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
