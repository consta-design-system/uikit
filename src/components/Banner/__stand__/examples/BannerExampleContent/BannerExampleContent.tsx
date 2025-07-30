import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';

import { Banner } from '../../..';

export const BannerExampleContent = () => {
  return (
    <Example col={1}>
      <Banner
        leftSide={['Заголовок', 'описание']}
        rightSide={[<Button label="Кнопка" />]}
      />
    </Example>
  );
};
