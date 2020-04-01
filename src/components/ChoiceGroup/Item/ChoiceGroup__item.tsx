import './ChoiceGroup__item.css';

import React from 'react';
import { cnChoiceGroup } from '../ChoiceGroup';
import { ItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';

export function ChoiceGroupItem<T>(props: ItemProps<T>): React.ReactElement {
  const { className, label, onChange, checked, id, multiply, value } = props;

  return (
    <React.Fragment>
      {/* <input type={multiply ? 'checkbox' : 'radio'} className={cnChoiceGroup('input')} id={id} /> */}
      <input type={multiply ? 'checkbox' : 'radio'} className={cnChoiceGroup('input')} />
      <label
        className={cnChoiceGroup('label', { size: 'm', checkbox: multiply }, [className])}
        onClick={(e) => {
          onChange({ e, value, id, checked: !checked });
        }}
        // htmlFor={id}
      >
        {label}
      </label>
    </React.Fragment>
  );
}
