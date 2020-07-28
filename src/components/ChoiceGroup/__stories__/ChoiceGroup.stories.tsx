import React, { useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconCopy } from '../../../icons/IconCopy/IconCopy';
import { IconFavorite } from '../../../icons/IconFavorite/IconFavorite';
import { cn } from '../../../utils/bem';
import { ChoiceGroup } from '../ChoiceGroup';

import mdx from './ChoiceGroup.mdx';

declare type Item = {
  name: string;
  icon?: React.FC<IconProps>;
};

const items = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
  {
    name: 'три',
    icon: IconFavorite,
  },
  {
    name: 'четыре',
  },
];

const onlyIconItems = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
    icon: IconCopy,
  },
  {
    name: 'четыре',
    icon: IconFavorite,
  },
];

const defaultKnobs = () => ({
  multiple: boolean('multiple', false),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['primary', 'ghost', 'secondary'], 'primary'),
  form: select('form', ['default', 'round', 'brick'], 'default'),
});

const cnChoiceGroupStories = cn('ChoiceGroupStories');

export function Playground() {
  const [value, setValue] = useState<Item[] | null>(null);
  const [onlyIconValue, setOnlyIconValue] = useState<Item[] | null>(null);

  return (
    <div className={cnChoiceGroupStories()}>
      <form className="decorator decorator_indent-b_m">
        <ChoiceGroup
          {...defaultKnobs()}
          items={items}
          value={value}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          onChange={({ value }) => setValue(value)}
          getItemIcon={(item) => item.icon}
          name="ChoiceGroup"
        />
      </form>
      <form className="decorator decorator_indent-b_m">
        <ChoiceGroup
          {...defaultKnobs()}
          onlyIcon
          items={onlyIconItems}
          value={onlyIconValue}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          onChange={({ value }) => setOnlyIconValue(value)}
          getItemIcon={(item) => item.icon}
          name="ChoiceGroup2"
        />
      </form>
    </div>
  );
}

export default {
  title: 'Components|/ChoiceGroup',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
