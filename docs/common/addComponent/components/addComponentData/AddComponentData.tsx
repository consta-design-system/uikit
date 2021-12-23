import './AddComponentData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Card } from '../../../../../src/components/Card/Card';
import { Text } from '../../../../../src/components/Text/Text';
import { cn } from '../../../../../src/utils/bem';

const cnAddComponentData = cn('AddComponentData');

export function AddComponentDataStage1() {
  return (
    <Card
      style={{ marginTop: 'var(--space-xl)' }}
      className={cnAddComponentData()}
      view="bordered"
      verticalSpace="l"
      horizontalSpace="l"
    >
      <Badge label="Этап 1" />
      <Text weight="bold">Принимаем решение</Text>
      <ol style={{ fontSize: 'var(--size-text-s)' }}>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Оцениваем популярность компонента: смотрим, есть ли еще запросы на его разработку.
        </li>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Составляем описание API и описываем, как компонент будет использоваться — на примерах,
          чтобы лучше понимать, как всё работает и зачем это нужно.
        </li>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Смотрим, что уже готово: если вы прислали PR, проверяем его, смотрим, есть ли в нём
          примеры использования и тесты.
        </li>
      </ol>
      <Text size="s">
        После этого этапа становится понятно, что это за компонент и нужно ли его добавлять в
        дизайн-систему.{' '}
      </Text>
      <Text size="s">Договариваемся, кто его разрабатывает — вы или команда Consta.</Text>
    </Card>
  );
}

export function AddComponentDataStage2() {
  return (
    <Card
      style={{ marginTop: 'var(--space-xl)' }}
      view="bordered"
      verticalSpace="l"
      horizontalSpace="l"
    >
      <Badge label="Этап 2" />
      <Text weight="bold">Разрабатываем и обсуждаем новый компонент</Text>
      <ol style={{ fontSize: 'var(--size-text-s)' }}>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Разрабатываем компонент в дизайне и в коде.
        </li>
        <li style={{ marginBottom: 'var(--space-xs)' }}>Приглашаем сообщество к обсуждению.</li>
      </ol>
    </Card>
  );
}

export function AddComponentDataStage3() {
  return (
    <Card
      style={{ marginTop: 'var(--space-xl)' }}
      view="bordered"
      verticalSpace="l"
      horizontalSpace="l"
    >
      <Badge label="Этап 3" />
      <Text weight="bold">Проверяем готовый компонент и проводим ревью</Text>
      <ol style={{ fontSize: 'var(--size-text-s)' }}>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Проводим ревью кода и устраняем все замечания.
        </li>
        <li style={{ marginBottom: 'var(--space-xs)' }}>
          Команда дизайн-системы подтверждает, что компонент можно включить в состав основной
          библиотеки.
        </li>
      </ol>
    </Card>
  );
}

export function AddComponentDataStage4() {
  return (
    <Card
      style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
      view="bordered"
      verticalSpace="l"
      horizontalSpace="l"
    >
      <Badge label="Этап 4" />
      <Text weight="bold">Публикуем релиз</Text>
      <ol style={{ fontSize: 'var(--size-text-s)' }}>
        <li style={{ marginBottom: 'var(--space-xs)' }}>Собираем релизный пакет для выкладки.</li>
        <li style={{ marginBottom: 'var(--space-xs)' }}>Публикуем информацию о релизе.</li>
      </ol>
    </Card>
  );
}
