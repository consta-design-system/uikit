import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button/Button';

import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltipModeMouseover = withTooltip({
  content: 'Тултип по наведению',
  mode: 'mouseover',
})(Button);

const ButtonWithTooltipModeClick = withTooltip({
  content: 'Тултип по клику',
  mode: 'click',
})(Button);

export const WithTooltipExampleMode = () => {
  return (
    <Example>
      <ButtonWithTooltipModeMouseover label="Наведите на меня мышку" />
      <ButtonWithTooltipModeClick label="Нажмите меня" />
    </Example>
  );
};
