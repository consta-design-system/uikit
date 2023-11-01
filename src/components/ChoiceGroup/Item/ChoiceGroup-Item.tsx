import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cnChoiceGroup } from '../ChoiceGroup';

type Props = PropsWithHTMLAttributes<
  {
    icon?: IconComponent;
    onlyIcon?: boolean;
    iconSize?: IconPropSize;
    label: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    multiple: boolean;
    disabled?: boolean;
  },
  HTMLLabelElement
>;

export const ChoiceGroupItem = forwardRef<HTMLLabelElement, Props>(
  (props, ref) => {
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
      className,
      ...otherProps
    } = props;
    const [focus, setFocus] = useFlag();

    return (
      <label
        className={cnChoiceGroup('Label', { focus, checked, disabled }, [
          cnMixFocus(),
          className,
        ])}
        title={onlyIcon ? label : undefined}
        ref={ref}
        {...otherProps}
      >
        <input
          type={multiple ? 'checkbox' : 'radio'}
          className={cnChoiceGroup('Input')}
          checked={checked}
          onFocus={setFocus.on}
          onBlur={setFocus.off}
          value={`${name}-${label}`}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
        {Icon && <Icon className={cnChoiceGroup('Icon')} size={iconSize} />}
        {!onlyIcon && <span className={cnChoiceGroup('Text')}>{label}</span>}
      </label>
    );
  },
);
