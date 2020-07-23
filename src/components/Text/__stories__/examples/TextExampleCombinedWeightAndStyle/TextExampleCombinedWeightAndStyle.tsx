import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Text } from '../../../Text';

export const TextExampleCombinedWeightAndStyle = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Text as="div" align="left" font="primary" lineHeight="l" size="m" view="primary" type="p">
        <Text as="span" fontStyle="italic">
          Примечание.&nbsp;
        </Text>
        База скважин сформирована на основе отчетов сотрудников. Любые&nbsp;
        <Text weight="black" as="span">
          срочные изменения&nbsp;
        </Text>
        должны вноситься по регламенту в сроки, указанные Центром Разработок.
      </Text>
    </div>
  );
};
