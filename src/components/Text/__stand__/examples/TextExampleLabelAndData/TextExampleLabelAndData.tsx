import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../Text';

export const TextExampleLabelAndData = () => {
  return (
    <Example>
      <>
        <Text
          as="div"
          align="left"
          font="primary"
          lineHeight="l"
          size="s"
          view="secondary"
          type="p"
        >
          ФИО
        </Text>
        <Text
          as="div"
          align="left"
          font="mono"
          lineHeight="l"
          size="l"
          view="primary"
        >
          Иванов Дмитрий Петрович
        </Text>
      </>
      <>
        <Text
          as="div"
          align="left"
          font="primary"
          lineHeight="l"
          size="s"
          view="secondary"
          type="p"
        >
          Должность
        </Text>
        <Text
          as="div"
          align="left"
          font="mono"
          lineHeight="l"
          size="l"
          view="primary"
        >
          Главный по тарелочкам
        </Text>
      </>
      <>
        <Text
          as="div"
          align="left"
          font="primary"
          lineHeight="l"
          size="s"
          view="secondary"
          type="p"
        >
          Подразделение
        </Text>
        <Text
          as="div"
          align="left"
          font="mono"
          lineHeight="l"
          size="l"
          view="primary"
        >
          Группа столовой посуды и хрусталя
        </Text>
      </>
    </Example>
  );
};
