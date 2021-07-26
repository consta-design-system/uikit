import React from 'react';

type ChangeEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type CallBack<VALUE> = (props: { e: ChangeEvent; value: VALUE }) => void;

type UseChoiceGroupIndexedParams =
  | {
      multiple: true;
      isNullableValue?: never;
      value: number[] | null;
      callBack: CallBack<number[] | null>;
    }
  | {
      multiple: false;
      isNullableValue: true;
      value: number | null;
      callBack: CallBack<number | null>;
    }
  | {
      multiple: false;
      isNullableValue: false;
      value: number;
      callBack: CallBack<number>;
    };

function formatValue(value: number[] | number | null | undefined) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'number') {
    return [value];
  }
  return [];
}

export function useChoiceGroupIndexed(props: UseChoiceGroupIndexedParams) {
  const value = formatValue(props.value);

  const getChecked = (index: number) => value.includes(index);

  const getOnChange = (index: number) => (e: ChangeEvent) => {
    if (props.multiple) {
      let newValue: number[] | null;
      if (getChecked(index)) {
        newValue = value.filter((item) => item !== index);

        if (newValue.length === 0) {
          newValue = null;
        }
      } else {
        newValue = [...value, index];
      }
      props.callBack({ e, value: newValue });
    } else if (props.isNullableValue && getChecked(index)) {
      props.callBack({ e, value: null });
    } else {
      props.callBack({ e, value: index });
    }
  };

  return { getOnChange, getChecked };
}
