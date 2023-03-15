import React from 'react';

import { ResponsesImageNothingFound } from '../../responsesImages/ResponsesImageNothingFound/ResponsesImageNothingFound';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesNothingFound = createResponses({
  name: 'ResponsesNothingFound',
  image: ResponsesImageNothingFound,
  title: 'Ничего не найдено',
  description: 'Попробуйте сформулировать запрос по-другому',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
