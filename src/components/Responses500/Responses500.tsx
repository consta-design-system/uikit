import { ResponsesImage500 } from '../../responsesImages/ResponsesImage500/ResponsesImage500';
import { createResponses } from '../Responses/createResponses';

export const Responses500 = createResponses({
  name: 'Responses500',
  image: ResponsesImage500,
  title: 'Что-то сломалось',
  description: 'Попробуйте обновить страницу или зайдите позже',
});
