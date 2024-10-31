import { Example } from '@consta/stand';
import React from 'react';

import { Informer } from '../../../Informer';

export const InformerExampleStatus = () => (
  <Example col={{ 1: 0, 2: 720 }}>
    <Informer
      status="success"
      view="filled"
      label="Файл Отпуск_2025 успешно загружен"
    />
    <Informer
      status="warning"
      view="filled"
      title="Заполните все поля"
      label="Поле Конец отпуска не заполнено"
    />
    <Informer
      status="alert"
      view="filled"
      title="Не удалось загрузить файл"
      label="Максимальный размер файла 20 Гб"
    />
    <Informer
      status="system"
      view="filled"
      title="Файл сохранен"
      label="Файл Отпуск_2025 сохранен на Рабочий стол"
    />
  </Example>
);
