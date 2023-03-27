import React from 'react';

import { ResponsesImage403 } from '../../responsesImages/ResponsesImage403/ResponsesImage403';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const Responses403 = createResponses({
  name: 'Responses403',
  image: ResponsesImage403,
  title: 'Нет доступа',
  description:
    'Если вы уверены, что вам нужна эта страница, запросите доступ у администратора',
  actions: <Button type="button" label="Запросить доступ" view="ghost" />,
});
