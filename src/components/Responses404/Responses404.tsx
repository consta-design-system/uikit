import React from 'react';

import { Button } from '##/components/Button';
import { createResponses } from '##/components/Responses/createResponses';
import { ResponsesImage404 } from '##/responsesImages/ResponsesImage404/ResponsesImage404';

export const Responses404 = createResponses({
  name: 'Responses404',
  image: ResponsesImage404,
  title: 'Такой страницы нет',
  description: 'Возможно, эту страницу уже удалили, или в вашей ссылке ошибка',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
