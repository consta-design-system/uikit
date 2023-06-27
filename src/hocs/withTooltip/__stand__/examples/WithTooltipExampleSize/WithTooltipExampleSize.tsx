import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button/Button';

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
    <Example>
      <ButtonWithTooltipS label="S" />
      <ButtonWithTooltipM label="M" />
      <ButtonWithTooltipL label="L" />
    </Example>
  );
};
