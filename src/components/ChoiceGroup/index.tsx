import React, { ChangeEvent, FocusEventHandler } from 'react';
import bem from '../../utils/bem';

import './styles.css';
import { Button } from '../Button/Button';

const b = bem('choice-group');

export type ChoiceT<T> = {
  value: T;
  label: string;
};

type SingleValueSpecificProps<T> = {
  isMultiple: false;
  value?: T | null;
  onChange?: (value: T | null) => void;
};
type MultiValueSpecificProps<T> = {
  isMultiple: true;
  value: T[];
  onChange?: (value: T[]) => void;
};
export type ChoiceGroupProps<T> = {
  items: ChoiceT<T>[];
  wpSize: 'xs' | 's' | 'm' | 'l';
  form?: 'default' | 'brick' | 'round';
  className?: string;
  disabled?: boolean;
  onBlur?: FocusEventHandler<HTMLElement>;
} & (SingleValueSpecificProps<T> | MultiValueSpecificProps<T>);

function ChoiceGroup<T>(props: ChoiceGroupProps<T>) {
  const { items, wpSize, form, isMultiple, disabled, className, onBlur } = props;

  const handleChange = (itemValue: T) => (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (props.isMultiple) {
      if (checked && !props.value.includes(itemValue)) {
        props.onChange && props.onChange([...props.value, itemValue]);
      }
      if (!checked && props.value.includes(itemValue)) {
        props.onChange && props.onChange(props.value.filter((v) => v !== itemValue));
      }
      return;
    }
    if (props.onChange) {
      checked ? props.onChange(itemValue) : props.onChange(null);
    }
  };

  const selectedValues = props.isMultiple ? props.value : [props.value];

  return (
    <div className={b({ multiple: isMultiple, disabled, form }, className || '')}>
      {items.map((item, index) => {
        const checked = selectedValues.includes(item.value);
        return (
          <label tabIndex={-1} className={b('item')} key={`choice-${index}`}>
            <input
              type="checkbox"
              className={b('input')}
              checked={checked}
              onChange={handleChange(item.value)}
              onBlur={onBlur}
              disabled={disabled}
            />
            <Button
              as="div"
              type="button"
              tabIndex={-1}
              className={b('button', { checked })}
              view="primary"
              size={wpSize}
              form={form}
              onBlur={onBlur}
              label={item.label}
            />
          </label>
        );
      })}
    </div>
  );
}

export default ChoiceGroup;
