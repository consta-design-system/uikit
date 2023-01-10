import { IconMoon } from '@consta/icons/IconMoon';
import { IconSun } from '@consta/icons/IconSun';
import { Example } from '@consta/stand';
import React from 'react';

import { Tag } from '../../../Tag';

export const TagExampleIcon = () => (
  <Example>
    <Tag onClick={() => {}} icon={IconMoon} label="Луна" />
    <Tag onClick={() => {}} icon={IconSun} label="Солнце" />
  </Example>
);
