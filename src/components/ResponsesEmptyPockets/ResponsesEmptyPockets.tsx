import React from 'react';

import { ResponsesImageEmptyPockets } from '../../responsesImages/ResponsesImageEmptyPockets/ResponsesImageEmptyPockets';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesEmptyPockets = createResponses({
  name: 'ResponsesEmptyPockets',
  image: ResponsesImageEmptyPockets,
  title: 'Здесь пока ничего нет',
  description: 'Будьте первым, добавьте скважину',
  actions: <Button label="Добавить скважину" />,
});
