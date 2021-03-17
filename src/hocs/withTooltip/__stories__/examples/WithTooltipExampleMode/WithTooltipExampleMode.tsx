import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltipModeMouseover = withTooltip({
  content: 'Тултип по наведению',
  mode: 'mouseover',
})(Button);

const ButtonWithTooltipModeClick = withTooltip({ content: 'Тултип по клику', mode: 'click' })(
  Button,
);

export const WithTooltipExampleMode = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <ButtonWithTooltipModeMouseover label="Наведите на меня мышку" />
      <ButtonWithTooltipModeClick label="Нажмите меня" />
    </div>
  );
};
