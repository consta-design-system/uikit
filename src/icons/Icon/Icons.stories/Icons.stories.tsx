import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconAdd } from '../../IconAdd/IconAdd';
import { IconAlignJustify } from '../../IconAlignJustify/IconAlignJustify';
import { IconAlignLeft } from '../../IconAlignLeft/IconAlignLeft';
import { IconAlignRight } from '../../IconAlignRight/IconAlignRight';
import { IconArrowDown } from '../../IconArrowDown/IconArrowDown';
import { IconAlignCenter } from '../../IconAlignCenter/IconAlignCenter';
import { IconArrowLeft } from '../../IconArrowLeft/IconArrowLeft';
import { IconAlert } from '../../IconAlert/IconAlert';
import { IconArrowRight } from '../../IconArrowRight/IconArrowRight';
import { IconArrowUp } from '../../IconArrowUp/IconArrowUp';
import { IconAttach } from '../../IconAttach/IconAttach';
import { IconBackward } from '../../IconBackward/IconBackward';
import { IconBarrier } from '../../IconBarrier/IconBarrier';
import { IconBento } from '../../IconBento/IconBento';
import { IconBold } from '../../IconBold/IconBold';
import { IconCalendar } from '../../IconCalendar/IconCalendar';
import { IconCamera } from '../../IconCamera/IconCamera';
import { IconCancel } from '../../IconCancel/IconCancel';
import { IconChat } from '../../IconChat/IconChat';
import { IconCheck } from '../../IconCheck/IconCheck';

import { IconsItem } from './Item/Icons-Item';

const defaultKnobs = () => ({
  size: select('size', ['xs', 's', 'm'], 'm'),
  view: select(
    'view',
    ['alert', 'brand', 'ghost', 'link', 'primary', 'secondary', 'success', 'warning'],
    'primary'
  ),
});

storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('IconsNew', () => (
    <div className={'tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full'}>
      <IconsItem name="IconAdd" icon={IconAdd} {...defaultKnobs()} />
      <IconsItem name="IconAlignJustify" icon={IconAlignJustify} {...defaultKnobs()} />
      <IconsItem name="IconAlignLeft" icon={IconAlignLeft} {...defaultKnobs()} />
      <IconsItem name="IconAlignRight" icon={IconAlignRight} {...defaultKnobs()} />
      <IconsItem name="IconArrowDown" icon={IconArrowDown} {...defaultKnobs()} />
      <IconsItem name="IconAlignCenter" icon={IconAlignCenter} {...defaultKnobs()} />
      <IconsItem name="IconArrowLeft" icon={IconArrowLeft} {...defaultKnobs()} />
      <IconsItem name="IconAlert" icon={IconAlert} {...defaultKnobs()} />
      <IconsItem name="IconArrowRight" icon={IconArrowRight} {...defaultKnobs()} />
      <IconsItem name="IconArrowUp" icon={IconArrowUp} {...defaultKnobs()} />
      <IconsItem name="IconAttach" icon={IconAttach} {...defaultKnobs()} />
      <IconsItem name="IconBackward" icon={IconBackward} {...defaultKnobs()} />
      <IconsItem name="IconBarrier" icon={IconBarrier} {...defaultKnobs()} />
      <IconsItem name="IconBento" icon={IconBento} {...defaultKnobs()} />
      <IconsItem name="IconBold" icon={IconBold} {...defaultKnobs()} />
      <IconsItem name="IconCalendar" icon={IconCalendar} {...defaultKnobs()} />
      <IconsItem name="IconCamera" icon={IconCamera} {...defaultKnobs()} />
      <IconsItem name="IconCancel" icon={IconCancel} {...defaultKnobs()} />
      <IconsItem name="IconChat" icon={IconChat} {...defaultKnobs()} />
      <IconsItem name="IconCheck" icon={IconCheck} {...defaultKnobs()} />
    </div>
  ));
