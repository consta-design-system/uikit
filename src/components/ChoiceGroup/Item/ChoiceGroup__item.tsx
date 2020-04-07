import React, { Fragment } from 'react';
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
  const stringId = id ? id.toString() : undefined;
  const stringValue = `${id}${name ? `-${name}` : ''}`;
  const title = titleProp || (onlyIcon ? label : undefined);

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
        className={cnChoiceGroup('label', { size, checkbox: multiply }, [className])}
        title={title}
      >
        <input
          type={multiply ? 'checkbox' : 'radio'}
          className={cnChoiceGroup('input')}
          id={stringId}
          checked={checked}
          name={name}
          value={stringValue}
          onChange={(e) => onChange({ e, value, id, checked: !checked })}
        />
        {Icon && <Icon className={cnChoiceGroup('icon')} size={getIconSizeChoiceGroupSize(size)} />}
        {!onlyIcon && label}
      </label>
    </Fragment>
  );
}
