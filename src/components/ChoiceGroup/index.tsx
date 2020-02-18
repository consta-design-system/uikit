import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('choice-group');

type CommonProps = {
  items: ItemProps[];
  wpSize: 'xs' | 's' | 'm' | 'l';
  form?: 'default' | 'brick' | 'round';
  groupName: string;
  isMultiple?: boolean;
  disabled?: boolean;
  className?: string | '';
};

export type ItemProps = {
  value: string | number;
  label: string;
};

const ChoiceGroup: React.FC<CommonProps> = props => {
  const { items, wpSize, form, isMultiple, disabled, groupName, className } = props;

  if (isMultiple)
    return (
      <div className={b({ disabled, form, size: wpSize }, className)}>
        {items.map((item, index) => {
          return (
            <input
              type="checkbox"
              className={b('input')}
              disabled={disabled}
              key={`choice-${index}`}
              value={item.value}
              attr-label={item.label}
              name={groupName}
            />
          );
        })}
      </div>
    );

  return (
    <React.Fragment>
      <div className={b({ disabled, form, size: wpSize }, className)}>
        {items.map((item, index) => {
          return (
            <input
              type="radio"
              className={b('input')}
              disabled={disabled}
              key={`choice-${index}`}
              value={item.value}
              attr-label={item.label}
              name={groupName}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ChoiceGroup;
