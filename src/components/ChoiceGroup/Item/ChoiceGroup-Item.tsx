import React, { useState } from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cnChoiceGroup } from '../ChoiceGroup';

type Props = {
  icon?: React.FC<IconProps>;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  multiple: boolean;
};

export const ChoiceGroupItem: React.FC<Props> = (props) => {
  const { label, onChange, checked, multiple, icon: Icon, onlyIcon, name, iconSize } = props;
  const [focus, setFocus] = useState<boolean>(false);

  const handleBlur = () => setFocus(false);
  const handleFocus = () => setFocus(true);

  return (
    <label
      className={cnChoiceGroup('Label', { focus, checked }, [cnMixFocus()])}
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
      />
      {Icon && <Icon className={cnChoiceGroup('Icon')} size={iconSize} />}
      {!onlyIcon && <span className={cnChoiceGroup('Text')}>{label}</span>}
    </label>
  );
};
