import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text/Text';

import {
  Card,
  cardPropForm,
  cardPropFormDefault,
  cardPropSpace,
  cardPropStatus,
} from '../Card';

const Variants = () => {
  const verticalSpace = useSelect(
    'verticalSpace',
    cardPropSpace,
    cardPropSpace[0],
  );
  const horizontalSpace = useSelect(
    'horizontalSpace',
    cardPropSpace,
    cardPropSpace[0],
  );
  const shadow = useBoolean('shadow', true);
  const border = useBoolean('border', false);
  const status = useSelect('status', cardPropStatus);
  const form = useSelect('form', cardPropForm, cardPropFormDefault);

  return (
    <Card
      horizontalSpace={horizontalSpace}
      verticalSpace={verticalSpace}
      shadow={shadow}
      border={border}
      status={status}
      form={form}
    >
      <Text>
        Это карточка, в которой ничего нет, кроме текста. Здесь может быть что
        угодно.
      </Text>
    </Card>
  );
};

export default Variants;
