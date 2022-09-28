import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltipS = withTooltip({
  content:
    'Это тултип, размер S. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 's',
})(Button);

const ButtonWithTooltipM = withTooltip({
  content:
    'Тултип, размер M. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 'm',
})(Button);

const ButtonWithTooltipL = withTooltip({
  content:
    'Тултип, размер L. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 'l',
})(Button);

export const WithTooltipExampleSize = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1-1', 'col-gap': 'full' }),
      ])}
    >
      <ButtonWithTooltipS label="S" className={cnMixSpace({ m: 'm' })} />
      <ButtonWithTooltipM label="M" className={cnMixSpace({ m: 'm' })} />
      <ButtonWithTooltipL label="L" className={cnMixSpace({ m: 'm' })} />
    </div>
  );
};
