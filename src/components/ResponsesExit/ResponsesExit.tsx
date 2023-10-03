import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageExit } from '##/responsesImages/ResponsesImageExit/ResponsesImageExit';

export const ResponsesExit = createResponses({
  name: 'ResponsesExit',
  image: ResponsesImageExit,
  title: 'Вы вышли из системы ',
  description: 'Хотите вернуться?',
  actions: <Button type="button" label="Войти снова" />,
});
