import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconAttach } from '../../../icons/IconAttach/IconAttach';
import { Tag } from '../Tag';

import mdx from './Tag.mdx';

const defaultKnobs = () => ({
  label: text('label', 'Label'),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  mode: select('mode', ['button', 'link', 'check', 'cancel'], 'button'),
  group: select('group', ['', 1, 2, 3, 4, 5, 6, 7, 8, 9], ''),
  icon: boolean('icon', false),
});

export function Playground() {
  const { label, size, mode, group: groupProp, icon } = defaultKnobs();
  const [checked, setChecked] = useState<boolean>(false);
  const group = typeof groupProp === 'number' ? groupProp : undefined;
  const Icon = icon && IconAttach;

  if (mode === 'check') {
    return (
      <Tag
        mode="check"
        label={label}
        size={size}
        checked={checked}
        onChange={({ checked }) => setChecked(checked)}
        group={group}
        icon={Icon}
      />
    );
  }

  if (mode === 'cancel') {
    return (
      <Tag
        mode="cancel"
        label={label}
        size={size}
        onCancel={action('onCancel')}
        group={group}
        icon={Icon}
      />
    );
  }

  if (mode === 'button') {
    return (
      <Tag
        mode="button"
        label={label}
        size={size}
        onClick={action('onClick')}
        group={group}
        icon={Icon}
      />
    );
  }

  if (mode === 'link') {
    return <Tag mode="link" href="#" label={label} size={size} group={group} icon={Icon} />;
  }
}

export default {
  title: 'UI-KIT|/Tag',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
