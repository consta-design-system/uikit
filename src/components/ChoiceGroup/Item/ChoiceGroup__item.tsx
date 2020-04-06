import React from 'react';
import { cnChoiceGroup } from '../ChoiceGroup';
import { ItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { IIcon } from '../../Icon';

export type ChoiceGroupItemProps = {
  icon?: React.FC<IIcon>;
};

export type IChoiceGroupItem<T> = ItemProps<T> & ChoiceGroupItemProps;

export function ChoiceGroupItem<T>(props: IChoiceGroupItem<T>): React.ReactElement {
  const { className, label, onChange, checked, id, multiply, value, icon } = props;
  const stringId = id.toString();
  const Icon = icon;
  return (
    <React.Fragment>
      <input
        type={multiply ? 'checkbox' : 'radio'}
        className={cnChoiceGroup('input')}
        id={stringId}
        checked={checked}
      />
      <label
        className={cnChoiceGroup('label', { size: 'm', checkbox: multiply }, [className])}
        onClick={(e) => {
          onChange({ e, value, id, checked: !checked });
        }}
        htmlFor={stringId}
      >
        {Icon && <Icon size="s" />}
        {label}
      </label>
    </React.Fragment>
  );
}
