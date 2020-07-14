import './ChoiceGroup.css';

import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import {
  BaseCheckGroupField,
  BaseCheckGroupFieldPropGetItemLabel,
  BaseCheckGroupFieldProps,
} from '../BaseCheckGroupField/BaseCheckGroupField';

import { ChoiceGroupItem } from './Item/ChoiceGroup__item';

export type ChoiceGroupPropSize = 'xs' | 's' | 'm' | 'l';
export type ChoiceGroupPropForm = 'default' | 'brick' | 'round';
export type ChoiceGroupPropView = 'primary' | 'ghost' | 'secondary';

type Props<T> = {
  size?: ChoiceGroupPropSize;
  form?: ChoiceGroupPropForm;
  view?: ChoiceGroupPropView;
  onlyIcon?: boolean;
  getItemIcon?: (item: T) => React.FC<IconProps> | undefined;
  getItemTitle?: BaseCheckGroupFieldPropGetItemLabel<T>;
  children?: never;
};

export type ChoiceGroupProps<T> = Props<T> &
  Omit<BaseCheckGroupFieldProps<T>, 'componentItem' | 'getAdditionalPropsForItem' | 'innerRef'>;

export const cnChoiceGroup = cn('ChoiceGroup');

export const ChoiceGroup: <T>(
  props: ChoiceGroupProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null = React.forwardRef((props, ref) => {
  const {
    size,
    form = 'default',
    className,
    view = 'primary',
    getItemTitle,
    onlyIcon,
    getItemIcon,
    ...otherProps
  } = props;

  return (
    <BaseCheckGroupField
      {...otherProps}
      className={cnChoiceGroup({ size, form, view, onlyIcon }, [className])}
      componentItem={ChoiceGroupItem}
      getAdditionalPropsForItem={(item) => ({
        ...(getItemIcon ? { icon: getItemIcon(item) } : {}),
        ...(getItemTitle ? { title: getItemTitle(item) } : {}),
        size,
        onlyIcon,
      })}
      innerRef={ref}
    />
  );
});
