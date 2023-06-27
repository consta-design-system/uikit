import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button/Button';

import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltip = withTooltip({ content: 'Тултип сверху' })(Button);

export const WithTooltipExampleProps = () => {
  return (
    <Example>
      <ButtonWithTooltip label="Кнопка без свойств" />
      <ButtonWithTooltip
        label="Свойство описано в кнопке"
        tooltipProps={{ content: 'Тултип снизу', direction: 'downCenter' }}
      />
    </Example>
  );
};
