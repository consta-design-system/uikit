import './ChoiceGroup__item.css';

import React from 'react';
import { cnChoiceGroup } from '../ChoiceGroup';
import { ItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';

export function ChoiceGroupItem<T>(props: ItemProps<T>): React.ReactElement {
  const { className, label, onChange, checked, id, multiply, value } = props;
  let input;
  if (multiply) input = <input type="checkbox" className={cnChoiceGroup('input')} id={id} />;
  else input = <input type="radio" className={cnChoiceGroup('input')} id={id} />;

  return (
    <React.Fragment>
      {input}
      <label
        className={cnChoiceGroup('label', { size: 'm', checkbox: multiply }, [className])}
        onClick={(e) => {
          onChange({ e, value, id, checked: !checked });
        }}
        htmlFor={id}
      >
        {label}
      </label>
    </React.Fragment>
  );
}
