import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { cnMixSpace } from '##/mixs/MixSpace';
import { ResponsesImage403 } from '##/responsesImages/ResponsesImage403/ResponsesImage403';

export const Responses403 = createResponses({
  name: 'Responses403',
  image: ResponsesImage403,
  title: 'Нет доступа',
  description:
    'Если вы уверены, что вам нужна эта страница, запросите доступ у администратора',
  actions: (
    <>
      <Button
        type="button"
        label="Запросить доступ"
        view="primary"
        className={cnMixSpace({ mL: 's' })}
      />
      <Button type="button" label="Вернуться назад" view="ghost" />
    </>
  ),
});
