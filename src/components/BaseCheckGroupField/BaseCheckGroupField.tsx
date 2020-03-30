import React from 'react';

export type PropName = string;
export type PropId = string | number;
export type PropValue<T> = T[] | null;
export type PropOnChange<T> = (args: PropOnChangeFunctionArgs<T>) => void;

export type PropOnChangeFunctionArgs<T> = {
  e: React.MouseEvent;
  id?: PropId;
  name?: PropName;
  value: PropValue<T>;
};
export type Props<T> = {
  multiply?: boolean;
  className?: string;
  items?: T[];
  value?: PropValue<T>;
  id?: PropId;
  name?: PropName;
  onChange?: PropOnChange<T>;
  getItemKey?: PropGetItemKey<T>;
  getItemLabel?: PropGetItemLabel<T>;
  componentItem: React.FC<ItemProps<T>>;
};

export type ItemPropOnChange<T> = (args: ItemPropOnChangeFunctionArgs<T>) => void;
export type ItemPropOnChangeFunctionArgs<T> = {
  e: React.MouseEvent;
  id: ItemPropItemKey;
  value: T;
  checked: boolean;
};
export type ItemPropItemKey = string | number;
export type ItemPropItemLabel = string | number;
export type PropGetItemKey<T> = (item: T) => ItemPropItemKey;
export type PropGetItemLabel<T> = (item: T) => ItemPropItemLabel;

export type ItemProps<T> = {
  multiply?: boolean;
  className?: string;
  onChange: ItemPropOnChange<T>;
  value: T;
  checked: boolean;
  key: ItemPropItemKey;
  id: ItemPropItemKey;
  label?: ItemPropItemLabel;
};

export function BaseCheckGroupField<T>(props: Props<T>) {
  const {
    className,
    items,
    componentItem,
    getItemKey = (item: T | any) => item.id,
    getItemLabel = (item: T | any) => item.label,
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
              onChange={handleItemChange}
              key={getItemKey(item)}
              label={getItemLabel(item)}
              value={item}
              id={getItemKey(item)}
              checked={getChecked(item)}
              multiply={multiply}
            />
          ))
        : null}
    </div>
  );
}
