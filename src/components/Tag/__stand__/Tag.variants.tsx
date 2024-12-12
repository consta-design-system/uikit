import { IconAttach } from '@consta/icons/IconAttach';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import {
  tagBasePropGroupNumberValue,
  tagBasePropSize,
  tagBasePropSizeDefault,
} from '../../TagBase/TagBase';
import { Tag, tagPropMode, tagPropModeDefault } from '../Tag';

const Variants = () => {
  const label = useText('label', 'Label');
  const size = useSelect('size', tagBasePropSize, tagBasePropSizeDefault);
  const mode = useSelect('mode', tagPropMode, tagPropModeDefault);
  const group = useSelect('group', tagBasePropGroupNumberValue);
  const icon = useBoolean('icon', false);
  const disabled = useBoolean('disabled', false);

  const [checked, setChecked] = useState<boolean>(false);
  const Icon = icon ? IconAttach : undefined;

  function getTag() {
    switch (mode) {
      case 'check':
        return (
          <Tag
            mode={mode}
            label={label || ''}
            size={size}
            checked={checked}
            onChange={setChecked}
            group={group}
            icon={Icon}
            disabled={disabled}
          />
        );
      case 'cancel':
        return (
          <Tag
            mode={mode}
            label={label || ''}
            size={size}
            onCancel={() => console.log('onCancel')}
            group={group}
            icon={Icon}
            disabled={disabled}
          />
        );
      case 'button':
        return (
          <Tag
            mode={mode}
            label={label || ''}
            size={size}
            onClick={() => console.log('onClick')}
            group={group}
            icon={Icon}
            disabled={disabled}
          />
        );
      case 'link':
        return (
          <Tag
            mode={mode}
            href="#"
            label={label || ''}
            size={size}
            group={group}
            icon={Icon}
            disabled={disabled}
          />
        );
      case 'info':
        return (
          <Tag
            mode={mode}
            label={label || ''}
            size={size}
            group={group}
            icon={Icon}
            disabled={disabled}
          />
        );
    }
  }

  return <div>{getTag()}</div>;
};

export default Variants;
