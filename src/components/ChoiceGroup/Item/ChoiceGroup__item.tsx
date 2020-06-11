import React, { ChangeEvent, useState } from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { BaseCheckGroupItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { ChoiceGroupPropSize, cnChoiceGroup } from '../ChoiceGroup';

type Props = {
  icon?: React.FC<IconProps>;
  size?: ChoiceGroupPropSize;
  onlyIcon?: boolean;
  title?: string;
};

export type ChoiceGroupItemProps<T> = BaseCheckGroupItemProps<T> & Props;

export function ChoiceGroupItem<T>(props: ChoiceGroupItemProps<T>): React.ReactElement {
  const {
    className,
    label,
    onChange,
    checked,
    id,
    multiple,
    value,
    icon: Icon,
    size = 'm',
    onlyIcon,
    title: titleProp,
    name,
  } = props;
  const [focus, setFocus] = useState<boolean>(false);
  const stringValue = `${id}${name ? `-${name}` : ''}`;
  const title = titleProp || (onlyIcon ? label : undefined);

  const handleBlur = () => setFocus(false);
  const handleFocus = () => setFocus(true);
  const handleChange = (e: ChangeEvent) => onChange({ e, value, id, checked: !checked });

  const getIconSizeChoiceGroupSize = (buttonSize: ChoiceGroupPropSize): IconPropSize => {
    const sizeObj: Record<ChoiceGroupPropSize, IconPropSize> = {
      xs: 'xs',
      s: 'xs',
      m: 's',
      l: 'm',
    };

    return sizeObj[buttonSize];
  };

  return (
    <label
      className={cnChoiceGroup('Label', { size, multiple, focus, checked }, [className])}
      title={title}
    >
      <input
        type={multiple ? 'checkbox' : 'radio'}
        className={cnChoiceGroup('Input')}
        checked={checked}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        value={stringValue}
        onChange={handleChange}
      />
      {Icon && <Icon className={cnChoiceGroup('Icon')} size={getIconSizeChoiceGroupSize(size)} />}
      {!onlyIcon && label}
    </label>
  );
}
