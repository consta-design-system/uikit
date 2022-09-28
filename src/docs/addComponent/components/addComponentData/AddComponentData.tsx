import './AddComponentData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Text } from '../../../../../src/components/Text/Text';
import { cn } from '../../../../../src/utils/bem';

const cnAddComponentData = cn('AddComponentData');

export const AddComponentDataStage1 = () => {
  return (
    <div className={cnAddComponentData()}>
      <div>
        <Badge label="Этап 1" />
        <Text weight="bold" className="AddComponentDataText">
          Принимаем решение
        </Text>
      </div>
      <ol>
        <li>
          Оцениваем популярность компонента: смотрим, есть ли еще запросы на его
          разработку.
        </li>
        <li>
          Составляем описание API и описываем, как компонент будет
          использоваться — на примерах, чтобы лучше понимать, как всё работает и
          зачем это нужно.
        </li>
        <li>
          Смотрим, что уже готово: если вы прислали PR, проверяем его, смотрим,
          есть ли в нём примеры использования и тесты.
        </li>
      </ol>
      <Text size="s">
        После этого этапа становится понятно, что это за компонент и нужно ли
        его добавлять в дизайн-систему.
      </Text>
      <Text size="s">
        Договариваемся, кто его разрабатывает — вы или команда Consta.
      </Text>
    </div>
  );
};

export const AddComponentDataStage2 = () => {
  return (
    <div className={cnAddComponentData()}>
      <div>
        <Badge label="Этап 2" />
        <Text weight="bold" className="AddComponentDataText">
          Разрабатываем и обсуждаем новый компонент
        </Text>
      </div>
      <ol>
        <li>Разрабатываем компонент в дизайне и в коде.</li>
        <li>Приглашаем сообщество к обсуждению.</li>
      </ol>
    </div>
  );
};

export const AddComponentDataStage3 = () => {
  return (
    <div className={cnAddComponentData()}>
      <div>
        <Badge label="Этап 3" />
        <Text weight="bold" className="AddComponentDataText">
          Проверяем готовый компонент и проводим ревью
        </Text>
      </div>
      <ol>
        <li>Проводим ревью кода и устраняем все замечания.</li>
        <li>
          Команда дизайн-системы подтверждает, что компонент можно включить в
          состав основной библиотеки.
        </li>
      </ol>
    </div>
  );
};

export const AddComponentDataStage4 = () => {
  return (
    <div className={cnAddComponentData()}>
      <div>
        <Badge label="Этап 4" />
        <Text weight="bold" className="AddComponentDataText">
          Публикуем релиз
        </Text>
      </div>
      <ol>
        <li>Собираем релизный пакет для выкладки.</li>
        <li>Публикуем информацию о релизе.</li>
      </ol>
    </div>
  );
};
