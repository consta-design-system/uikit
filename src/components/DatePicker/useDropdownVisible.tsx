import { useReducer } from 'react';

type UseDropdownVisiblePropOnFocus =
  | [
      React.FocusEventHandler<HTMLElement>?,
      React.FocusEventHandler<HTMLElement>?,
    ]
  | React.FocusEventHandler<HTMLElement>;

type FieldType = 'start' | 'end' | undefined;

type FieldResult = {
  flag: boolean;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
};

type UseDropdownVisibleResult = {
  calendarVisible: boolean;
  blocks: {
    start: FieldResult;
    end: FieldResult;
    dropdown: FieldResult;
  };
  close: () => void;
  fieldType: FieldType;
};

type UseDropdownVisible = (
  onFocus: UseDropdownVisiblePropOnFocus | undefined,
  onBlur?: UseDropdownVisiblePropOnFocus,
) => UseDropdownVisibleResult;

type State = {
  fieldFocused: boolean;
  dropdownFocused: boolean;
  fieldType: FieldType;
  calendarVisible: boolean;
};

type Action =
  | {
      type: 'focus';
      field: FieldType | 'dropdown';
    }
  | {
      type: 'blur';
      field: FieldType | 'dropdown';
    }
  | {
      type: 'close';
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'focus': {
      return {
        ...state,
        calendarVisible: true,
        ...(action.field !== 'dropdown'
          ? {
              fieldType: action.field,
              fieldFocused: true,
            }
          : {
              dropdownFocused: true,
            }),
      };
    }
    case 'close': {
      return {
        ...state,
        calendarVisible: false,
        fieldFocused: false,
        fieldType: undefined,
      };
    }
    case 'blur': {
      const setKey =
        action.field === 'dropdown' ? 'dropdownFocused' : 'fieldFocused';
      const anotherKey =
        action.field !== 'dropdown' ? 'dropdownFocused' : 'fieldFocused';
      return {
        ...state,
        calendarVisible: state[anotherKey],
        [setKey]: false,
      };
    }
  }
};

export const useDropdownVisible: UseDropdownVisible = (onFocus, onBlur) => {
  const [
    { fieldFocused, dropdownFocused, calendarVisible, fieldType },
    dispatch,
  ] = useReducer(reducer, {
    fieldFocused: false,
    fieldType: undefined,
    dropdownFocused: false,
    calendarVisible: false,
  });

  const onFieldFocus =
    (field: FieldType) => (e: React.FocusEvent<HTMLElement>) => {
      dispatch({ type: 'focus', field });
      Array.isArray(onFocus)
        ? onFocus[field === 'start' ? 0 : 1]?.(e)
        : onFocus?.(e);
    };

  const onFieldBlur =
    (field: FieldType) => (e: React.FocusEvent<HTMLElement>) => {
      dispatch({ type: 'blur', field });
      Array.isArray(onBlur)
        ? onBlur[field === 'start' ? 0 : 1]?.(e)
        : onBlur?.(e);
    };

  return {
    calendarVisible,
    close: () => dispatch({ type: 'close' }),
    blocks: {
      start: {
        flag: fieldFocused,
        onFocus: onFieldFocus('start'),
        onBlur: onFieldBlur('start'),
      },
      end: {
        flag: fieldFocused,
        onFocus: onFieldFocus('end'),
        onBlur: onFieldBlur('end'),
      },
      dropdown: {
        flag: dropdownFocused,
        onFocus: () => dispatch({ type: 'focus', field: 'dropdown' }),
        onBlur: () => dispatch({ type: 'blur', field: 'dropdown' }),
      },
    },
    fieldType,
  };
};
