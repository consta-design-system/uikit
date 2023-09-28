import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageEmptyBox } from '##/responsesImages/ResponsesImageEmptyBox/ResponsesImageEmptyBox';

export const ResponsesEmptyBox = createResponses({
  name: 'ResponsesEmptyBox',
  image: ResponsesImageEmptyBox,
  title: 'Здесь пока ничего нет',
  description: 'Будьте первым, добавьте что-нибудь полезное',
  actions: <Button type="button" label="Добавить что-нибудь" />,
});
