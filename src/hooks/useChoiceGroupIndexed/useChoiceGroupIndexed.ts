import React from 'react';

type ValueMultiple = number[] | null;
type ValueNotMultiple<IS_NULLABLE_VALUE> = IS_NULLABLE_VALUE extends true
  ? number | null
  : number;

type UseChoiceGroupIndexedParams<
  MULTIPLE extends boolean = false,
  IS_NULLABLE_VALUE extends boolean = false,
  EVENT = React.MouseEvent<HTMLDivElement, MouseEvent>,
> = {
  value:
    | (MULTIPLE extends true
        ? ValueMultiple
        : ValueNotMultiple<IS_NULLABLE_VALUE>)
    | undefined;
  multiple: MULTIPLE;
  callBack: (props: {
    e: EVENT;
    value: MULTIPLE extends true
      ? ValueMultiple
      : ValueNotMultiple<IS_NULLABLE_VALUE>;
  }) => void;
  isNullableValue?: IS_NULLABLE_VALUE;
};

function isMultiple<EVENT>(
  params: UseChoiceGroupIndexedParams<boolean, boolean, EVENT>,
): params is UseChoiceGroupIndexedParams<true, boolean, EVENT> {
  return !!params.multiple;
}

function isNotMultiple<EVENT>(
  params: UseChoiceGroupIndexedParams<boolean, boolean, EVENT>,
): params is UseChoiceGroupIndexedParams<false, boolean, EVENT> {
  return !params.multiple;
}

function formatValue(value: number[] | number | null | undefined) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'number') {
    return [value];
  }
  return [];
}

export function useChoiceGroupIndexed<
  MULTIPLE extends boolean,
  IS_NULLABLE_VALUE extends boolean,
  EVENT,
>(props: UseChoiceGroupIndexedParams<MULTIPLE, IS_NULLABLE_VALUE, EVENT>) {
  const value = formatValue(props.value);

  const getChecked = (index: number) => value.includes(index);

  const getOnChange = (index: number) => (e: EVENT) => {
    if (isMultiple(props)) {
      let newValue: number[] | null;
      if (getChecked(index)) {
        newValue = value.filter((item) => item !== index);

        if (newValue.length === 0) {
          newValue = null;
        }
      } else {
        newValue = [...value];
        newValue.push(index);
      }
      props.callBack({ e, value: newValue });
      return;
    }

    if (isNotMultiple(props)) {
      if (props.isNullableValue && getChecked(index)) {
        props.callBack({ e, value: null });
      } else {
        props.callBack({ e, value: index });
      }
    }
  };

  return { getOnChange, getChecked };
}
