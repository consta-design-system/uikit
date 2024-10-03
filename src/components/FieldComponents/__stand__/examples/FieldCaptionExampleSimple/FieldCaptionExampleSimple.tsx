import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldCaption,
  FieldControlLayout,
} from '##/components/FieldComponents';
import { cnMixSpace } from '##/mixs/MixSpace';

export const FieldCaptionExampleSimple = () => {
  return (
    <Example col={1}>
      <>
        <FieldControlLayout className={cnMixSpace({ mB: 'xs' })} />
        <FieldCaption>Подпись к полю</FieldCaption>
      </>
    </Example>
  );
};
