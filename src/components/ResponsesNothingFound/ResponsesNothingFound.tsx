import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageNothingFound } from '##/responsesImages/ResponsesImageNothingFound/ResponsesImageNothingFound';

export const ResponsesNothingFound = createResponses({
  name: 'ResponsesNothingFound',
  image: ResponsesImageNothingFound,
  title: 'Ничего не найдено',
  description: 'Попробуйте сформулировать запрос по-другому',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
