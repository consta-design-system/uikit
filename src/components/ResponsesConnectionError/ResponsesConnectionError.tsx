import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageConnectionError } from '##/responsesImages/ResponsesImageConnectionError/ResponsesImageConnectionError';

export const ResponsesConnectionError = createResponses({
  name: 'ResponsesConnectionError',
  image: ResponsesImageConnectionError,
  title: 'Проблемы с загрузкой',
  description: 'Какие-то проблемы со связью. Обновите страницу.',
  actions: <Button label="Перезагрузить" view="ghost" />,
});
