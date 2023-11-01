import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImage503 } from '##/responsesImages/ResponsesImage503/ResponsesImage503';

export const Responses503 = createResponses({
  name: 'Responses503',
  image: ResponsesImage503,
  title: 'Технические работы',
  description: 'Скорее всего, мы уже решаем проблему. Попробуйте зайти позже.',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
