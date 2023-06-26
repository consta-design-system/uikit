import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../../components/Button/Button';
import { withTooltip } from '../../../withTooltip';

const ButtonWithTooltipS = withTooltip(Button, {
  content:
    'Это тултип, размер S. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 's',
});

const ButtonWithTooltipM = withTooltip(Button, {
  content:
    'Тултип, размер M. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 'm',
});

const ButtonWithTooltipL = withTooltip(Button, {
  content:
    'Тултип, размер L. А это очень длинный текст, который нужен, чтобы показать, какой ширины получится тултип',
  size: 'l',
});

export const WithTooltipExampleSize = () => {
  return (
    <Example>
      <ButtonWithTooltipS label="S" />
      <ButtonWithTooltipM label="M" />
      <ButtonWithTooltipL label="L" />
    </Example>
  );
};
