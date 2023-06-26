import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { TooltipPropsProvider } from '../../../context';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltip = withTooltip(Button);

export const WithTooltipExampleProvider = () => {
  return (
    <Example>
      <TooltipPropsProvider content="Какой-то текст" size="s">
        <ButtonWithTooltip label="Наведите на меня мышку" />
      </TooltipPropsProvider>
    </Example>
  );
};
