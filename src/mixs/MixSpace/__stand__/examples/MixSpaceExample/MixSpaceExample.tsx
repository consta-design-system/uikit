import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { Text } from '../../../../../components/Text/Text';
import { cnMixSpace } from '../../../MixSpace';

export const MixSpaceExampleButtonWithoutSpaces = () => {
  return (
    <Example>
      <>
        <Text>
          Это текст, он нужен, чтобы показать отступы от кнопки сверху
        </Text>
        <Button label="Это кнопка без отступов" />
        <Text>Это текст, он нужен, чтобы показать отступы от кнопки снизу</Text>
      </>
    </Example>
  );
};

export const MixSpaceExampleButtonWithSpaces = () => {
  return (
    <Example>
      <>
        <Text>
          Это текст, он нужен, чтобы показать отступы от кнопки сверху
        </Text>
        <Button
          label="Это кнопка с отступами снаружи"
          className={cnMixSpace({
            m: 'm',
            mT: '3xs',
          })}
        />
        <Text>Это текст, он нужен, чтобы показать отступы от кнопки снизу</Text>
      </>
    </Example>
  );
};
