import React from 'react';

import { ResponsesImage404 } from '../../responsesImages/ResponsesImage404/ResponsesImage404';
import { Button } from '../Button/Button';
import { createResponses } from '../Responses/createResponses';

export const Responses404 = createResponses({
  name: 'Responses404',
  image: ResponsesImage404,
  title: 'Такой страницы нет',
  description: 'Возможно, эту страницу уже удалили, или в вашей ссылке ошибка',
  actions: <Button type="button" label="Вернуться назад" view="ghost" />,
});
