import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltip = withTooltip({ content: 'Тултип сверху' })(Button);

export const WithTooltipExampleProps = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <ButtonWithTooltip label="Кнопка без свойств" />
      <ButtonWithTooltip
        label="Свойство описано в кнопке"
        tooltipProps={{ content: 'Тултип снизу', direction: 'downCenter' }}
      />
    </div>
  );
};
