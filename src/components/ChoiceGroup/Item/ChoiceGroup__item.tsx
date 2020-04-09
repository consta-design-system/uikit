import React, { Fragment, useState } from 'react';
import { cnChoiceGroup, ChoiceGroupPropSize } from '../ChoiceGroup';
import { ItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { IconPropSize, IIcon } from '../../Icon';

export type ChoiceGroupItemProps = {
  icon?: React.FC<IIcon>;
  size?: ChoiceGroupPropSize;
  onlyIcon?: boolean;
  title?: string;
};

export type IChoiceGroupItem<T> = ItemProps<T> & ChoiceGroupItemProps;

export function ChoiceGroupItem<T>(props: IChoiceGroupItem<T>): React.ReactElement {
  const {
    className,
    label,
    onChange,
    checked,
    id,
    multiply,
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
  const handleChange = (e) => onChange({ e, value, id, checked: !checked });

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
    <Fragment>
      <label
        className={cnChoiceGroup('Label', { size, multiply, focus, checked }, [className])}
        title={title}
      >
        <input
          type={multiply ? 'checkbox' : 'radio'}
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
    </Fragment>
  );
}
