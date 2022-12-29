import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../Button';

export const ButtonExampleSizeBasic = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button label="Размер XS" size="xs" />
      <Button label="Размер S" size="s" />
      <Button label="Размер M" size="m" />
      <Button label="Размер L" size="l" />
    </Example>
  );
};

export const ButtonExampleSizeFull = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button width="full" label="Отправить" />
    </Example>
  );
};
