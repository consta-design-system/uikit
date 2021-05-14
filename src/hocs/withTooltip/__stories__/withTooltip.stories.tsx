import './withTooltip.stories.css';

import React from 'react';
import { object, select, text } from '@storybook/addon-knobs';

import { Button } from '../../../components/Button/Button';
import { directions } from '../../../components/Popover/Popover';
import { tooltipPropSizes, tooltipPropSizesDefault } from '../../../components/Tooltip/Tooltip';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { withTooltip, withTooltipPropMode, withTooltipPropModeDefault } from '../withTooltip';

import mdx from './withTooltip.docs.mdx';

const defaultKnobs = () => ({
  content: text('content', 'Контент тултипа на кнопке'),
  mode: select('mode', withTooltipPropMode, withTooltipPropModeDefault),
  size: select('size', tooltipPropSizes, tooltipPropSizesDefault),
  direction: select('direction', directions, 'upCenter'),
  spareDirection: select('spareDirection', directions, 'downStartLeft'),
  possibleDirections: object('possibleDirections', directions),
});

const ButtonWithTooltip = withTooltip()(Button);

const cnWithTooltipStories = cn('WithTooltipStories');

export function Playground() {
  return (
    <div className={cnWithTooltipStories()}>
      <ButtonWithTooltip label="Кнопка" tooltipProps={defaultKnobs()} />
    </div>
  );
}

export default createMetadata({
  title: 'HOCs|/withTooltip',
  id: 'HOCs|/withTooltip',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
