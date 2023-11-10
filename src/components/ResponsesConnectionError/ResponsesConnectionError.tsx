import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { cnMixSpace } from '##/mixs/MixSpace';
import { ResponsesImageConnectionError } from '##/responsesImages/ResponsesImageConnectionError/ResponsesImageConnectionError';

export const ResponsesConnectionError = createResponses({
  name: 'ResponsesConnectionError',
  image: ResponsesImageConnectionError,
  title: 'Проблемы с загрузкой',
  description: 'Какие-то проблемы со связью. Обновите страницу',
  actions: (
    <>
      <Button
        type="button"
        label="Перезагрузить"
        className={cnMixSpace({ mR: 's' })}
      />
      <Button type="button" label="Вернуться назад" view="ghost" />
    </>
  ),
});
