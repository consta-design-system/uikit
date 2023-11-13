import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button/Button';
import { Text } from '##/components/Text/Text';
import { cnMixSpace } from '##/mixs/MixSpace';

export const MixSpaceExampleButtonWithoutSpaces = () => {
  return (
    <Example>
      <>
        <Text view="primary" size="m" lineHeight="m">
          Это текст, он нужен, чтобы показать отступы от кнопки сверху
        </Text>
        <Button label="Это кнопка без отступов" />
        <Text view="primary" size="m" lineHeight="m">
          Это текст, он нужен, чтобы показать отступы от кнопки снизу
        </Text>
      </>
    </Example>
  );
};

export const MixSpaceExampleButtonWithSpaces = () => {
  return (
    <Example>
      <>
        <Text view="primary" size="m" lineHeight="m">
          Это текст, он нужен, чтобы показать отступы от кнопки сверху
        </Text>
        <Button
          label="Это кнопка с отступами снаружи"
          className={cnMixSpace({
            m: 'm',
            mT: '3xs',
          })}
        />
        <Text view="primary" size="m" lineHeight="m">
          Это текст, он нужен, чтобы показать отступы от кнопки снизу
        </Text>
      </>
    </Example>
  );
};
