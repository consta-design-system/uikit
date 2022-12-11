import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React, { useState } from 'react';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cnChoiceGroup } from '../ChoiceGroupDeprecated';

type Props = {
  icon?: IconComponent;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  multiple: boolean;
  disabled?: boolean;
};

export const ChoiceGroupItem: React.FC<Props> = (props) => {
  const {
    label,
    onChange,
    checked,
    multiple,
    icon: Icon,
    onlyIcon,
    name,
    iconSize,
    disabled = false,
  } = props;
  const [focus, setFocus] = useState<boolean>(false);

  const handleBlur = () => setFocus(false);
  const handleFocus = () => setFocus(true);

  return (
    <label
      className={cnChoiceGroup('Label', { focus, checked, disabled }, [
        cnMixFocus(),
      ])}
      title={onlyIcon ? label : undefined}
    >
      <input
        type={multiple ? 'checkbox' : 'radio'}
        className={cnChoiceGroup('Input')}
        checked={checked}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={`${name}-${label}`}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      {Icon && <Icon className={cnChoiceGroup('Icon')} size={iconSize} />}
      {!onlyIcon && <span className={cnChoiceGroup('Text')}>{label}</span>}
    </label>
  );
};
