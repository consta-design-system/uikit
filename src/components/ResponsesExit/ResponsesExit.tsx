import React from 'react';

import { ResponsesImageExit } from '../../responsesImages/ResponsesImageExit/ResponsesImageExit';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesExit = createResponses({
  name: 'ResponsesExit',
  image: ResponsesImageExit,
  title: 'Вы вышли из системы ',
  description: 'Хотите вернуться?',
  actions: <Button type="button" label="Войти снова" />,
});
