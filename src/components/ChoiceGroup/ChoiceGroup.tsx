import './ChoiceGroup.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { IIcon } from '../Icon';
import {
  BaseCheckGroupField,
  IBaseCheckGroupField,
  BaseCheckGroupFieldPropGetAdditionalPropsForItem,
  BaseCheckGroupFieldPropGetItemLabel,
} from '../BaseCheckGroupField/BaseCheckGroupField';
import { ChoiceGroupItem } from './Item/ChoiceGroup__item';

export type ChoiceGroupPropSize = 'xs' | 's' | 'm' | 'l';
export type ChoiceGroupPropForm = 'default' | 'brick' | 'round';
export type ChoiceGroupPropView = 'primary';

export type ChoiceGroupProps<T> = {
  size?: ChoiceGroupPropSize;
  form?: ChoiceGroupPropForm;
  view?: ChoiceGroupPropView;
  onlyIcon?: boolean;
  getItemIcon?: (item: T) => React.FC<IIcon> | undefined;
  getItemTitle?: BaseCheckGroupFieldPropGetItemLabel<T>;
};

export type IChoiceGroup<T> = Omit<
  IBaseCheckGroupField<T, ChoiceGroupProps<T>>,
  'componentItem' | 'getAdditionalPropsForItem'
>;

export const cnChoiceGroup = cn('ChoiceGroup');

export function ChoiceGroup<T>(props: IChoiceGroup<T>): React.ReactElement {
  const {
    size = 'm',
    form = 'default',
    className,
    view = 'primary',
    getItemIcon,
    getItemTitle,
    onlyIcon,
    ...otherProps
  } = props;

  const getAdditionalPropsForItem: BaseCheckGroupFieldPropGetAdditionalPropsForItem<
    T,
    ChoiceGroupProps<T>
  > = (item, { size, onlyIcon }) => ({
    ...(getItemIcon ? { icon: getItemIcon(item) } : {}),
    ...(getItemTitle ? { title: getItemTitle(item) } : {}),
    size,
    onlyIcon,
  });

  return (
    <BaseCheckGroupField<T, IChoiceGroup<T>>
      className={cnChoiceGroup({ size, form, view, onlyIcon }, [className])}
      componentItem={ChoiceGroupItem}
      getAdditionalPropsForItem={getAdditionalPropsForItem}
      size={size}
      onlyIcon={onlyIcon}
      {...otherProps}
    />
  );
}
