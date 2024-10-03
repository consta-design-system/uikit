import { Example } from '@consta/stand';
import React from 'react';

import {
  FieldControlLayout,
  FieldWrapper,
} from '##/components/FieldComponents';

export const FieldWrapperExampleSimple = () => {
  return (
    <Example col={1}>
      <FieldWrapper
        label="Общая площадь"
        required
        caption="Должно содержать площадь всех объектов"
        side="m²"
      >
        <FieldControlLayout />
      </FieldWrapper>
    </Example>
  );
};
