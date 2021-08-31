import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getGroups } from '../../utils/getGroups';
import { useClickOutside } from '../useClickOutside/useClickOutside';
import { useDebounce } from '../useDebounce/useDebounce';
import { KeyHandler, useKeys } from '../useKeys/useKeys';
import { usePrevious } from '../usePrevious/usePrevious';

import { scrollToIndex, useHoistedState } from './helpers';

type IndexForHighlight = number | ((oldIndex: number) => number);

type Group<ITEM, GROUP> = { items: ITEM[]; key: string | number; group?: GROUP };
type GetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetGroupKey<GROUP> = (item: GROUP) => string | number | undefined;
type SortGroups<ITEM, GROUP> = (a: Group<ITEM, GROUP>, b: Group<ITEM, GROUP>) => number;

type OnChangeProp<ITEM, MULTIPLE extends boolean> = (props: {
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null;
  e: React.SyntheticEvent;
}) => void;

type ValueProp<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
};

export type SelectProps<ITEM, GROUP, MULTIPLE extends boolean> = {
  getItemGroupKey?: GetItemGroupKey<ITEM> | undefined;
  getGroupKey?: GetGroupKey<GROUP>;
  sortGroups?: SortGroups<ITEM, GROUP>;
  groups?: GROUP[];
  items: ITEM[];
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
  getItemLabel: (item: ITEM) => string;
  getItemKey: (item: ITEM) => string | number;
  getItemDisabled?: (item: ITEM) => boolean | undefined;
  searchFunction?: (item: ITEM, searchValue: string) => boolean;
  onCreate?: (props: { e: React.SyntheticEvent; label: string }) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  multiple: boolean;
  onChange: OnChangeProp<ITEM, MULTIPLE>;
  value: ValueProp<ITEM, MULTIPLE>;
};

export type OptionProps<ITEM> = {
  index: number;
  item: ITEM | OptionForCreate;
};

export type GetOptionPropsResult = {
  onClick: (e: React.SyntheticEvent) => void;
  onMouseEnter: (e: React.SyntheticEvent) => void;
  active: boolean;
  hovered: boolean;
  key: string | number;
};

const isMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, true> => {
  return params.multiple;
};

const isNotMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

const actions = {
  setOpen: 'setOpen',
  setSearch: 'setSearch',
  highlightIndex: 'highlightIndex',
};

const initialState = {
  searchValue: '',
  resolvedSearchValue: '',
  isOpen: false,
  highlightedIndex: 0,
  scrollToHighlighted: false,
};

export const isOptionForCreate = <ITEM, GROUP>(
  params: OptionForCreate | Group<ITEM, GROUP> | ITEM,
): params is OptionForCreate => {
  return Object.prototype.hasOwnProperty.call(params, '__optionForCreate');
};

export function useSelect<ITEM, GROUP, MULTIPLE extends boolean>(
  params: SelectProps<ITEM, GROUP, MULTIPLE>,
) {
  const {
    items,
    dropdownRef,
    controlRef,
    disabled = false,
    multiple = false,
    getItemLabel,
    getItemKey,
    searchFunction,
    getItemGroupKey,
    groups,
    getGroupKey,
    sortGroups,
    getItemDisabled,
    onFocus,
    onBlur,
  } = params;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const value =
    (params.value && (Array.isArray(params.value) ? params.value : [params.value])) || [];

  const [
    { searchValue, isOpen, highlightedIndex, resolvedSearchValue, scrollToHighlighted },
    setState,
  ] = useHoistedState(initialState);

  const searchFunctionDefault = (item: ITEM, searchValue: string) =>
    getItemLabel(item)
      .toLocaleLowerCase()
      .indexOf(searchValue.toLocaleLowerCase()) !== -1;

  const [filteredOptions, optionForCreate] = React.useMemo(() => {
    if (resolvedSearchValue && resolvedSearchValue !== '') {
      const fiteredOptions = items.filter((item) =>
        searchFunction
          ? searchFunction(item, resolvedSearchValue)
          : searchFunctionDefault(item, resolvedSearchValue),
      );

      const matchWithValueSearch = Boolean(
        items.find(
          (option) =>
            getItemLabel(option)
              .toString()
              .toLowerCase() === resolvedSearchValue.toLocaleLowerCase(),
        ),
      );

      const optionForCreate: OptionForCreate = {
        label: searchValue,
        __optionForCreate: true,
      };

      return [
        fiteredOptions,
        params.onCreate && !matchWithValueSearch ? optionForCreate : undefined,
      ] as const;
    }
    return [items, undefined] as const;
  }, [items, resolvedSearchValue]);

  const visibleItems = useMemo(() => {
    const resultGroups = getGroups(
      filteredOptions,
      groups?.length ? getItemGroupKey : undefined,
      groups,
      getGroupKey,
      sortGroups,
    );

    return optionForCreate ? [optionForCreate, ...resultGroups] : resultGroups;
  }, [filteredOptions, groups, getItemGroupKey, getGroupKey, sortGroups, optionForCreate]);

  const getSelectedOptionIndex = (): number => {
    let index = 0;
    if (value.length > 0) {
      for (const group of visibleItems) {
        if (isOptionForCreate(group)) {
          index++;
          // eslint-disable-next-line no-continue
          continue;
        }
        for (const item of group.items) {
          if (getItemKey(item) === getItemKey(value[0])) {
            return index;
          }
          index++;
        }
      }
    }

    return 0;
  };

  // Actions

  const setOpen = React.useCallback(
    (newIsOpen: boolean) => {
      setState(
        (old) => ({
          ...old,
          isOpen: newIsOpen,
        }),
        actions.setOpen,
      );
    },
    [setState],
  );

  const setResolvedSearch = useDebounce((value: string) => {
    setState(
      (old) => ({
        ...old,
        resolvedSearchValue: value,
      }),
      actions.setSearch,
    );
  }, 300);

  const setSearch = React.useCallback(
    (value: string) => {
      setState(
        (old) => ({
          ...old,
          searchValue: value,
        }),
        actions.setSearch,
      );
      setResolvedSearch(value);
    },
    [setState, setResolvedSearch],
  );

  const prevIsOpen = usePrevious(isOpen);

  React.useLayoutEffect(() => {
    if (value !== null && !prevIsOpen && isOpen) {
      const currentHighlightIndex = getSelectedOptionIndex();
      if (filteredOptions.length > 0) {
        scrollToIndex(currentHighlightIndex, dropdownRef);
      }
    }
  });

  const highlightIndex = React.useCallback(
    (indexForHighlight: IndexForHighlight, scrollToHighlighted) => {
      setState((old) => {
        return {
          ...old,
          highlightedIndex: Math.min(
            Math.max(
              0,
              typeof indexForHighlight === 'function'
                ? indexForHighlight(old.highlightedIndex)
                : indexForHighlight,
            ),
            optionForCreate ? filteredOptions.length : filteredOptions.length - 1,
          ),
          scrollToHighlighted,
        };
      }, actions.highlightIndex);
    },
    [filteredOptions, setState, optionForCreate],
  );

  const removeValue = (e: React.SyntheticEvent, valueItem: ITEM) => {
    e.stopPropagation();
    if (isMultipleParams(params)) {
      const newValue = params.value?.filter((item) => getItemKey(item) !== getItemKey(valueItem));
      params.onChange({
        e,
        value: newValue?.length ? newValue : null,
      });
    }
  };

  const onChange = (e: React.SyntheticEvent, item: ITEM) => {
    if (getItemDisabled && getItemDisabled(item)) {
      return;
    }
    if (isMultipleParams(params)) {
      const newValue = value.some((value) => getItemKey(value) === getItemKey(item))
        ? value.filter((value) => getItemKey(value) !== getItemKey(item))
        : [...value, item];
      params.onChange({ value: newValue.length ? newValue : null, e });
    }
    if (isNotMultipleParams(params)) {
      params.onChange({ value: item, e });
      setOpen(false);
    }
    setResolvedSearch('');
    setSearch('');
  };

  const onCreate = (e: React.SyntheticEvent, label: string) => {
    params.onCreate && params.onCreate({ e, label });
    setOpen(false);
    setResolvedSearch('');
    setSearch('');
  };

  // Handlers

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!disabled && !(!multiple && value.length > 0)) {
      setSearch(e.target.value);
    }
  };

  const handleInputClick = (): void => {
    !disabled && setOpen(!isOpen);

    if (multiple) {
      inputRef.current?.focus();
      setSearch('');
    }
  };

  const clearValue = (e: React.SyntheticEvent) => {
    params.onChange({ value: null, e });
    setResolvedSearch('');
    setSearch('');
  };

  const getHandleRemoveValue = (item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item);

  // Prop Getters

  const ArrowUp: KeyHandler = (_, e): void => {
    e.preventDefault();
    !disabled && setOpen(true);
    highlightIndex((old) => old - 1, true);
  };

  const ArrowDown: KeyHandler = (_, e): void => {
    e.preventDefault();
    !disabled && setOpen(true);
    highlightIndex((old) => old + 1, true);
  };

  const Enter: KeyHandler = (_, e): void => {
    if (isOpen) {
      if (searchValue || filteredOptions[highlightedIndex]) {
        e.preventDefault();
      }

      const getItem = (index: number) => {
        let couter = 0;
        for (const group of visibleItems) {
          if (isOptionForCreate(group)) {
            couter++;
            return group;
          }
          if (group.items.length + couter > index) {
            return group.items[index - couter];
          }
          couter += group.items.length;
        }
        return undefined;
      };

      const item = getItem(highlightedIndex);

      if (isOptionForCreate(item)) {
        onCreate(e, item.label);
        return;
      }

      if (item) {
        onChange(e, item);
      }
    }
  };

  const Escape = (): void => {
    setOpen(false);
  };

  const Tab = (): void => {
    setOpen(false);
  };

  const Backspace: KeyHandler = (_, e): void => {
    if (searchValue) {
      return;
    }
    if (multiple) {
      removeValue(e, value[value.length - 1]);
    } else {
      clearValue(e);
    }
  };

  const getKeyProps = useKeys({
    ArrowUp,
    ArrowDown,
    PageUp: ArrowUp,
    PageDown: ArrowDown,
    Home: ArrowUp,
    End: ArrowDown,
    Enter,
    Escape,
    Tab,
    Backspace,
  });

  const getOptionProps = ({ index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
    if (isOptionForCreate(item)) {
      return {
        onClick: (e: React.SyntheticEvent) => {
          onCreate(e, item.label);
        },
        onMouseEnter: () => {
          highlightIndex(index, false);
        },
        active: false,
        hovered: index === highlightedIndex,
        key: '__optionForCreate',
      };
    }
    const key = getItemKey(item);
    return {
      onClick: (e: React.SyntheticEvent) => {
        onChange(e, item);
      },
      onMouseEnter: () => {
        highlightIndex(index, false);
      },
      active: Boolean(value.find((item) => getItemKey(item) === key)),
      hovered: index === highlightedIndex,
      key,
    };
  };

  useClickOutside({
    isActive: isOpen,
    ignoreClicksInsideRefs: [dropdownRef, controlRef],
    handler: () => {
      setOpen(false);
    },
  });

  React.useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  React.useEffect(() => {
    const currentHighlightIndex = getSelectedOptionIndex();
    highlightIndex(currentHighlightIndex, true);
  }, [highlightIndex]);

  React.useEffect(() => {
    if (filteredOptions.length > 0 && scrollToHighlighted) {
      scrollToIndex(highlightedIndex, dropdownRef);
    }
  }, [highlightedIndex]);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (isOpen) {
      inputRef.current?.focus();
      return;
    }

    if (isFocused) {
      setIsFocused(false);

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    }
  };

  const handleToggleDropdown = (): void => {
    if (isOpen) {
      setOpen(false);
      setIsFocused(false);
    } else {
      setOpen(true);
      setIsFocused(true);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (searchValue) {
      setOpen(true);
    }
  }, [searchValue]);

  return {
    isOpen,
    isFocused,
    highlightedIndex,
    visibleItems,
    highlightIndex,
    getOptionProps,
    handleInputFocus,
    handleInputBlur,
    handleToggleDropdown,
    handleInputClick,
    inputRef,
    getKeyProps,
    handleInputChange,
    searchValue,
    clearValue,
    getHandleRemoveValue,
  };
}
