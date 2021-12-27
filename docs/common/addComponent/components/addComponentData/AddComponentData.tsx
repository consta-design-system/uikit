import './AddComponentData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Card } from '../../../../../src/components/Card/Card';
import { Text } from '../../../../../src/components/Text/Text';
import { cn } from '../../../../../src/utils/bem';

const cnAddComponentData = cn('AddComponentData');

export function AddComponentDataStage1() {
  return (
    <Card className={cnAddComponentData()} view="bordered" verticalSpace="l" horizontalSpace="l">
      <div>
        <Badge label="Этап 1" />
        <Text weight="bold" className="AddComponentDataText">
          Принимаем решение
        </Text>
      </div>
      <ol>
        <li>Оцениваем популярность компонента: смотрим, есть ли еще запросы на его разработку.</li>
        <li>
          Составляем описание API и описываем, как компонент будет использоваться — на примерах,
          чтобы лучше понимать, как всё работает и зачем это нужно.
        </li>
        <li>
          Смотрим, что уже готово: если вы прислали PR, проверяем его, смотрим, есть ли в нём
          примеры использования и тесты.
        </li>
      </ol>
      <Text size="s">
        После этого этапа становится понятно, что это за компонент и нужно ли его добавлять в
        дизайн-систему.
      </Text>
      <Text size="s">Договариваемся, кто его разрабатывает — вы или команда Consta.</Text>
    </Card>
  );
}

export function AddComponentDataStage2() {
  return (
    <Card className={cnAddComponentData()} view="bordered" verticalSpace="l" horizontalSpace="l">
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
    </Card>
  );
}

export function AddComponentDataStage3() {
  return (
    <Card className={cnAddComponentData()} view="bordered" verticalSpace="l" horizontalSpace="l">
      <div>
        <Badge label="Этап 3" />
        <Text weight="bold" className="AddComponentDataText">
          Проверяем готовый компонент и проводим ревью
        </Text>
      </div>
      <ol>
        <li>Проводим ревью кода и устраняем все замечания.</li>
        <li>
          Команда дизайн-системы подтверждает, что компонент можно включить в состав основной
          библиотеки.
        </li>
      </ol>
    </Card>
  );
}

export function AddComponentDataStage4() {
  return (
    <Card className={cnAddComponentData()} view="bordered" verticalSpace="l" horizontalSpace="l">
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
    </Card>
  );
}
