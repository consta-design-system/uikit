import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageEmptyPockets } from '##/responsesImages/ResponsesImageEmptyPockets/ResponsesImageEmptyPockets';

export const ResponsesEmptyPockets = createResponses({
  name: 'ResponsesEmptyPockets',
  image: ResponsesImageEmptyPockets,
  title: 'Здесь пока ничего нет',
  description: 'Будьте первым, добавьте что-нибудь красивое',
  actions: <Button type="button" label="Добавить что-нибудь" />,
});
