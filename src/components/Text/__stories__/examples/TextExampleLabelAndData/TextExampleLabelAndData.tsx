import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text } from '../../../Text';

export const TextExampleLabelAndData = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div className={wp.decorator({ 'indent-b': 'm' })}>
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
        <Text as="div" align="left" font="mono" lineHeight="l" size="l" view="primary">
          Иванов Дмитрий Петрович
        </Text>
      </div>
      <div className={wp.decorator({ 'indent-b': 'm' })}>
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
        <Text as="div" align="left" font="mono" lineHeight="l" size="l" view="primary">
          Инженер по бурению
        </Text>
      </div>
      <div className={wp.decorator({ 'indent-b': 'm' })}>
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
        <Text as="div" align="left" font="mono" lineHeight="l" size="l" view="primary">
          Группа разведки и бурения
        </Text>
      </div>
    </div>
  );
};
