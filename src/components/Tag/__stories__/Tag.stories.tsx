import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconAttach } from '../../../icons/IconAttach/IconAttach';
import { createMetadata } from '../../../utils/storybook';
import {
  tagBasePropGroupNumberValue,
  tagBasePropSize,
  tagBasePropSizeDefault,
} from '../../TagBase/TagBase';
import { Tag, tagPropMode, tagPropModeDefault } from '../Tag';

import mdx from './Tag.docs.mdx';

const defaultKnobs = () => ({
  label: text('label', 'Label'),
  size: select('size', tagBasePropSize, tagBasePropSizeDefault),
  mode: select('mode', tagPropMode, tagPropModeDefault),
  group: select('group', ['', ...tagBasePropGroupNumberValue], ''),
  icon: boolean('icon', false),
});

export function Playground() {
  const { label, size, mode, group: groupProp, icon } = defaultKnobs();
  const [checked, setChecked] = useState<boolean>(false);
  const group = typeof groupProp === 'number' ? groupProp : undefined;
  const Icon = icon ? IconAttach : undefined;

  function getTag() {
    switch (mode) {
      case 'check':
        return (
          <Tag
            mode={mode}
            label={label}
            size={size}
            checked={checked}
            onChange={({ checked }) => setChecked(checked)}
            group={group}
            icon={Icon}
          />
        );
      case 'cancel':
        return (
          <Tag
            mode={mode}
            label={label}
            size={size}
            onCancel={action('onCancel')}
            group={group}
            icon={Icon}
          />
        );
      case 'button':
        return (
          <Tag
            mode={mode}
            label={label}
            size={size}
            onClick={action('onClick')}
            group={group}
            icon={Icon}
          />
        );
      case 'link':
        return <Tag mode={mode} href="#" label={label} size={size} group={group} icon={Icon} />;
      case 'info':
        return <Tag mode={mode} label={label} size={size} group={group} icon={Icon} />;
    }
  }

  return <div>{getTag()}</div>;
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Tag',
  id: 'components/Tag',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=11148%3A145952',
    },
  },
});
