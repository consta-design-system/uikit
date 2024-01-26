import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../TextDeprecated';

export const TextExampleCombinedWeightAndStyle = () => {
  return (
    <Example>
      <Text
        as="div"
        align="left"
        font="primary"
        lineHeight="l"
        size="m"
        view="primary"
      >
        <Text as="span" fontStyle="italic">
          Примечание.&nbsp;
        </Text>
        База скважин сформирована на основе отчетов сотрудников. Любые&nbsp;
        <Text weight="black" as="span">
          срочные изменения&nbsp;
        </Text>
        должны вноситься по регламенту в сроки, указанные Центром Разработок.
      </Text>
    </Example>
  );
};
