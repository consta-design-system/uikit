import React from 'react';

import { ResponsesExit as ResponsesImageExit } from '../../responsesImages/ResponsesExit/ResponsesExit';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesExit = createResponses({
  name: 'ResponsesExit',
  image: ResponsesImageExit,
  title: 'Вы вышли из системы ',
  description: 'Хотите вернутся?',
  actions: <Button label="Войти снова" />,
});
