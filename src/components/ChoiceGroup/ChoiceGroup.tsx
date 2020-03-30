import './ChoiceGroup.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { BaseCheckGroupField, Props } from '../BaseCheckGroupField/BaseCheckGroupField';
import { ChoiceGroupItem } from './Item/ChoiceGroup__item';

export type ChoiceGroupProps<T> = Omit<Props<T>, 'componentItem'>;

export const cnChoiceGroup = cn('choice-group');

export function ChoiceGroup<T>(props: ChoiceGroupProps<T>): React.ReactElement {
  const { className, ...otherProps } = props;
  return (
    <BaseCheckGroupField<T>
      className={cnChoiceGroup(null, [className])}
      componentItem={ChoiceGroupItem}
      {...otherProps}
    />
  );
}
