import './ChoiceGroup.css';

import React from 'react';
import { cn } from '../../utils/bem';
import {
  BaseCheckGroupField,
  IBaseCheckGroupField,
} from '../BaseCheckGroupField/BaseCheckGroupField';
import { ChoiceGroupItem } from './Item/ChoiceGroup__item';

export type ChoiceGroupPropSize = 'xs' | 's' | 'm' | 'l';
export type ChoiceGroupPropForm = 'default' | 'brick' | 'round';

export type ChoiceGroupProps = {
  size?: ChoiceGroupPropSize;
  form?: ChoiceGroupPropForm;
};

export type IChoiceGroupProps<T> = ChoiceGroupProps &
  Omit<IBaseCheckGroupField<T>, 'componentItem'>;

export const cnChoiceGroup = cn('choice-group');

export function ChoiceGroup<T>(props: IChoiceGroupProps<T>): React.ReactElement {
  const { size = 'm', form = 'default', className, ...otherProps } = props;
  return (
    <BaseCheckGroupField<T>
      className={cnChoiceGroup({ size, form }, [className])}
      componentItem={ChoiceGroupItem}
      {...otherProps}
    />
  );
}
