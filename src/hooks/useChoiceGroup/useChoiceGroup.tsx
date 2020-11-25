type GetKey<ITEM> = (item: ITEM) => string | number;

type GetOnChange<ITEM, EVENT> = (item: ITEM) => (e: EVENT) => void;

type GetChecked<ITEM> = (item: ITEM) => boolean;

type Values<ITEM, EVENT> = {
  getOnChange: GetOnChange<ITEM, EVENT>;
  getChecked: GetChecked<ITEM>;
};

type CallbackWithMultiple<ITEM, EVENT> = (props: { e: EVENT; value: ITEM[] | null }) => void;

type CallbackWithoutMultiple<ITEM, EVENT> = (props: { e: EVENT; value: ITEM }) => void;

type PropsWithMultiple<ITEM, EVENT> = {
  multiple: true;
  value: ITEM[] | null;
  callBack: CallbackWithMultiple<ITEM, EVENT>;
};

type PropsWithoutMultiple<ITEM, EVENT> = {
  multiple: false;
  value: ITEM | null;
  callBack: CallbackWithoutMultiple<ITEM, EVENT>;
};

type CommonProps<ITEM> = {
  getKey: GetKey<ITEM>;
};

type Props<ITEM, EVENT> = CommonProps<ITEM> &
  (PropsWithMultiple<ITEM, EVENT> | PropsWithoutMultiple<ITEM, EVENT>);

type FormatedItems<ITEM> = { [value: string]: ITEM };

function formatValue<ITEM>(
  valueProp: ITEM | ITEM[] | null,
  getKey: GetKey<ITEM>,
  multiple?: boolean,
) {
  const valueByKey: FormatedItems<ITEM> = {};
  if (!valueProp) {
    return valueByKey;
  }
  const value = multiple ? (valueProp as ITEM[]) : [valueProp as ITEM];
  if (value && value.length > 0) {
    for (const item of value) {
      valueByKey[getKey(item)] = item;
    }
  }
  return valueByKey;
}

export function useChoiceGroup<ITEM, EVENT>({
  value: valueProp,
  getKey,
  callBack: callBackProp,
  multiple,
}: Props<ITEM, EVENT>): Values<ITEM, EVENT> {
  const formatedValue = formatValue(valueProp, getKey, multiple);

  const getChecked: GetChecked<ITEM> = (item) =>
    Object.prototype.hasOwnProperty.call(formatedValue, getKey(item));

  const getOnChange: GetOnChange<ITEM, EVENT> = (item) => (e) => {
    const checked = getChecked(item);
    const key = getKey(item);

    if (multiple) {
      let newValue: ITEM[] | null;
      if (checked) {
        const value = valueProp ? (valueProp as ITEM[]) : [];
        newValue = value.filter((item) => getKey(item) !== key);
        if (newValue.length === 0) {
          newValue = null;
        }
      } else {
        newValue = valueProp ? [...(valueProp as ITEM[])] : [];
        newValue.push(item);
      }
      const callBack = callBackProp as CallbackWithMultiple<ITEM, EVENT>;
      callBack({ e, value: newValue });
    } else {
      const callBack = callBackProp as CallbackWithoutMultiple<ITEM, EVENT>;
      callBack({ e, value: item });
    }
  };

  return {
    getOnChange,
    getChecked,
  };
}
