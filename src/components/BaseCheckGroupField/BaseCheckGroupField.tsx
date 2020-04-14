import React from 'react';

export type BaseCheckGroupFieldItemPropOnChange<T> = (
  args: BaseCheckGroupFieldItemOnChangeFunctionArguments<T>
) => void;
export type BaseCheckGroupFieldItemOnChangeFunctionArguments<T> = {
  e: React.MouseEvent | React.ChangeEvent;
  id: BaseCheckGroupFieldItemPropItemKey;
  value: T;
  checked: boolean;
};
export type BaseCheckGroupFieldItemPropItemKey = string | number;
export type BaseCheckGroupFieldItemPropItemLabel = string;
export type BaseCheckGroupFieldPropGetItemKey<T> = (item: T) => BaseCheckGroupFieldItemPropItemKey;
export type BaseCheckGroupFieldPropGetItemLabel<T> = (
  item: T
) => BaseCheckGroupFieldItemPropItemLabel;
export type BaseCheckGroupFieldPropGetAdditionalPropsForItem<T, T2 = {}> = (
  item: T,
  props: IBaseCheckGroupField<T, T2>
) => {};

export type ItemProps<T> = {
  multiply?: boolean;
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
  args: BaseCheckGroupFieldOnChangeArguments<T>
) => void;

export type BaseCheckGroupFieldOnChangeArguments<T> = {
  e: React.MouseEvent;
  id?: BaseCheckGroupFieldPropId;
  name?: BaseCheckGroupFieldPropName;
  value: BaseCheckGroupFieldPropValue<T>;
};

export type IBaseCheckGroupFieldProps<T> = {
  multiply?: boolean;
  className?: string;
  items?: T[];
  value?: BaseCheckGroupFieldPropValue<T>;
  id?: BaseCheckGroupFieldPropId;
  name?: BaseCheckGroupFieldPropName;
  onChange?: BaseCheckGroupFieldPropOnChange<T>;
  getItemKey?: BaseCheckGroupFieldPropGetItemKey<T>;
  getItemLabel?: BaseCheckGroupFieldPropGetItemLabel<T>;
  componentItem: React.FC<ItemProps<T>>;
};

export type IBaseCheckGroupField<T, T2 = {}> = IBaseCheckGroupFieldProps<T> & {
  getAdditionalPropsForItem?: BaseCheckGroupFieldPropGetAdditionalPropsForItem<T, T2>;
} & Omit<T2, keyof IBaseCheckGroupFieldProps<T>>;

export function BaseCheckGroupField<T, T2 = {}>(props: IBaseCheckGroupField<T, T2>) {
  const {
    className,
    items,
    componentItem,
    getItemKey = (item: T | any) => item.id,
    getItemLabel = (item: T | any) => item.label,
    getAdditionalPropsForItem,
    multiply,
    value = null,
    onChange,
    id,
    name,
  } = props;
  const ComponentItem = componentItem;

  let valueByKey = {};
  if (value && value.length > 0) {
    for (const item of value) {
      valueByKey[getItemKey(item)] = value;
    }
  }

  const handleItemChange = ({ e, id: itemId, value: itemValue, checked: itemChecked }) => {
    if (multiply) {
      const newValue = value ? value.filter((item) => getItemKey(item) !== itemId) : [];
      if (itemChecked) {
        newValue.push(itemValue);
      }
      onChange && onChange({ e, name, id, value: newValue.length > 0 ? newValue : null });
    } else {
      onChange && onChange({ e, name, id, value: [itemValue] });
    }
  };

  const getChecked = (item) => !!valueByKey[getItemKey(item)];

  return (
    <div className={className}>
      {items
        ? items.map((item) => (
            <ComponentItem
              {...(getAdditionalPropsForItem ? getAdditionalPropsForItem(item, props) : {})}
              onChange={handleItemChange}
              key={getItemKey(item)}
              label={getItemLabel(item)}
              value={item}
              id={getItemKey(item)}
              checked={getChecked(item)}
              multiply={multiply}
              name={name}
            />
          ))
        : null}
    </div>
  );
}
