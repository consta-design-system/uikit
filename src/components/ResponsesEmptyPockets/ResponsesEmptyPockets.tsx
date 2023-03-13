import React from 'react';

import { ResponsesImageEmptyPockets } from '../../responsesImages/ResponsesImageEmptyPockets/ResponsesImageEmptyPockets';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const ResponsesEmptyPockets = createResponses({
  name: 'ResponsesEmptyPockets',
  image: ResponsesImageEmptyPockets,
  title: 'Здесь пока ничего нет',
  description: 'Будьте первым, добавьте что-нибудь красивое',
  actions: <Button type="button" label="Добавить что-нибудь" />,
});
