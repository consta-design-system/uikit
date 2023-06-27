import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button/Button';

import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltipModeMouseover = withTooltip(Button, {
  content: 'Тултип по наведению',
  mode: 'mouseover',
});

const ButtonWithTooltipModeClick = withTooltip(Button, {
  content: 'Тултип по клику',
  mode: 'click',
});

export const WithTooltipExampleMode = () => {
  return (
    <Example>
      <ButtonWithTooltipModeMouseover label="Наведите на меня мышку" />
      <ButtonWithTooltipModeClick label="Нажмите меня" />
    </Example>
  );
};
