import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImageSuccess } from '##/responsesImages/ResponsesImageSuccess/ResponsesImageSuccess';

export const ResponsesSuccess = createResponses({
  name: 'ResponsesSuccess',
  image: ResponsesImageSuccess,
  title: 'Письмо отправлено',
  actions: <Button label="Хорошо" view="ghost" />,
});
