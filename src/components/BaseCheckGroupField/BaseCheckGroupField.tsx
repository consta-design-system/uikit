import React from 'react';

import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type BaseCheckGroupFieldItemPropOnChange<T> = (
  args: BaseCheckGroupFieldItemOnChangeFunctionArguments<T>,
) => void;
export type BaseCheckGroupFieldItemOnChangeFunctionArguments<T> = {
  e: Event | React.ChangeEvent | React.MouseEvent;
  id: BaseCheckGroupFieldItemPropItemKey;
  value: T;
  checked: boolean;
};
export type BaseCheckGroupFieldItemPropItemKey = string | number;
export type BaseCheckGroupFieldItemPropItemLabel = string;
export type BaseCheckGroupFieldPropGetItemKey<T> = (item: T) => BaseCheckGroupFieldItemPropItemKey;
export type BaseCheckGroupFieldPropGetItemLabel<T> = (
  item: T,
) => BaseCheckGroupFieldItemPropItemLabel;
export type BaseCheckGroupFieldPropGetAdditionalPropsForItem<T> = (
  item: T,
  index: number,
  props: BaseCheckGroupFieldProps<T>,
) => {};

export type BaseCheckGroupItemProps<T> = {
  multiple?: boolean;
  className?: string;
  onChange: BaseCheckGroupFieldItemPropOnChange<T>;
  value: T;
  checked: boolean;
  key: BaseCheckGroupFieldItemPropItemKey;
  id: BaseCheckGroupFieldItemPropItemKey;
  label?: BaseCheckGroupFieldItemPropItemLabel;
  name?: BaseCheckGroupFieldPropName;
};

export type BaseCheckGroupFieldPropName = string;
export type BaseCheckGroupFieldPropId = string | number;
export type BaseCheckGroupFieldPropValue<T> = T[] | null;
export type BaseCheckGroupFieldPropOnChange<T> = (
  args: BaseCheckGroupFieldOnChangeArguments<T>,
) => void;

export type BaseCheckGroupFieldOnChangeArguments<T> = {
  e: Event | React.ChangeEvent | React.MouseEvent;
  id?: BaseCheckGroupFieldPropId;
  name?: BaseCheckGroupFieldPropName;
  value: BaseCheckGroupFieldPropValue<T>;
};

type Props<T> = {
  multiple?: boolean;
  items?: T[];
  value?: BaseCheckGroupFieldPropValue<T>;
  id?: BaseCheckGroupFieldPropId;
  name?: BaseCheckGroupFieldPropName;
  onChange?: BaseCheckGroupFieldPropOnChange<T>;
  getItemKey: BaseCheckGroupFieldPropGetItemKey<T>;
  getItemLabel?: BaseCheckGroupFieldPropGetItemLabel<T>;
  componentItem: React.FC<BaseCheckGroupItemProps<T>>;
  innerRef?: React.Ref<HTMLDivElement>;
  getAdditionalPropsForItem?: BaseCheckGroupFieldPropGetAdditionalPropsForItem<T>;
};

export type BaseCheckGroupFieldProps<T> = PropsWithHTMLAttributes<Props<T>, HTMLDivElement>;

export function BaseCheckGroupField<T>(
  props: BaseCheckGroupFieldProps<T>,
): React.ReactElement | null {
  const {
    items,
    componentItem: ComponentItem,
    getItemKey,
    getItemLabel,
    getAdditionalPropsForItem,
    multiple,
    value = null,
    onChange,
    id,
    name,
    innerRef,
    ...otherProps
  } = props;

  const valueByKey: { [value: string]: T } = {};
  if (value && value.length > 0) {
    for (const item of value) {
      valueByKey[getItemKey(item)] = item;
    }
  }

  const handleItemChange: BaseCheckGroupFieldItemPropOnChange<T> = ({
    e,
    id: itemId,
    value: itemValue,
    checked: itemChecked,
  }) => {
    if (multiple) {
      const newValue = value ? value.filter((item) => getItemKey(item) !== itemId) : [];
      if (itemChecked) {
        newValue.push(itemValue);
      }
      onChange && onChange({ e, name, id, value: newValue.length > 0 ? newValue : null });
    } else {
      onChange && onChange({ e, name, id, value: [itemValue] });
    }
  };

  const getChecked = (item: T) =>
    Object.prototype.hasOwnProperty.call(valueByKey, getItemKey(item));

  return (
    <div ref={innerRef} {...otherProps}>
      {items
        ? items.map((item, index) => (
            <ComponentItem
              {...(getAdditionalPropsForItem ? getAdditionalPropsForItem(item, index, props) : {})}
              onChange={handleItemChange}
              key={getItemKey(item)}
              label={getItemLabel && getItemLabel(item)}
              value={item}
              id={getItemKey(item)}
              checked={getChecked(item)}
              multiple={multiple}
              name={name}
            />
          ))
        : null}
    </div>
  );
}
