import './ChoiceGroup__item.css';

import React from 'react';
import { cnChoiceGroup } from '../ChoiceGroup';
import { ItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';

export function ChoiceGroupItem<T>(props: ItemProps<T>): React.ReactElement {
  const { className, label, onChange, checked, id, multiply, value } = props;
  return (
    <div
      className={cnChoiceGroup('item', { checked, checkbox: multiply }, [className])}
      onClick={(e) => {
        onChange({ e, value, id, checked: !checked });
      }}
    >
      {label}
      {checked ? ' - !' : ''}
    </div>
  );
}
