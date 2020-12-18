import { ResponsesImage503 } from '../../responsesImages/ResponsesImage503/ResponsesImage503';
import { createResponses } from '../Responses/createResponses';

export const Responses500 = createResponses({
  name: 'Responses503',
  image: ResponsesImage503,
  title: 'Что-то сломалось',
  description: 'Попробуйте обновить страницу или зайдите позже',
});
