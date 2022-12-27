import { Example } from '@consta/stand';
import React from 'react';

import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../../../icons/IconSun/IconSun';
import { Tag } from '../../../Tag';

export const TagExampleIcon = () => (
  <Example>
    <Tag onClick={() => {}} icon={IconMoon} label="Луна" />
    <Tag onClick={() => {}} icon={IconSun} label="Солнце" />
  </Example>
);
