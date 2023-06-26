import { Example } from '@consta/stand';
import React from 'react';

import { TooltipPropsProvider } from '##/hocs/withTooltipCanary/context';

import { Button } from '../../../../../components/Button/Button';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltip = withTooltip(Button, { content: 'Тултип сверху' });

export const WithTooltipExampleProps = () => {
  return (
    <Example>
      <ButtonWithTooltip label="Кнопка без свойств" />
      <TooltipPropsProvider content="Тултип снизу" direction="downCenter">
        <ButtonWithTooltip label="Свойство описано в кнопке" />
      </TooltipPropsProvider>
    </Example>
  );
};
