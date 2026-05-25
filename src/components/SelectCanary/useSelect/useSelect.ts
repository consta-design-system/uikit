import { AtomLike, Computed, peek, reatomBoolean } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import React, { useEffect, useMemo, useRef } from 'react';

import { useClickOutside } from '##/hooks/useClickOutside';
import { useDebounce } from '##/hooks/useDebounce';
import { KeyHandlers, useKeysRef } from '##/hooks/useKeysRef';
import { useRefs } from '##/hooks/useRefs';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import { scrollIntoView } from '##/utils/scrollIntoView';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { usePropAtom } from '##/utils/state/usePickAtom';

import { PropsWithDefault } from '../../SelectCanary/defaultProps';
import { SelectGroupDefault, SelectItemDefault, SelectPropOnChange } from '..';
import { CountedGroup, Group, SelectAllItem } from '../types';

type IndexForHighlight = number | ((oldIndex: number) => number);

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
};

export type UseSelectProps<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
> = {
  propsAtom: AtomLike<PropsWithDefault<ITEM, GROUP, MULTIPLE>>;
};

export type OptionProps<ITEM> = {
  index: number;
  item: ITEM | OptionForCreate | SelectAllItem;
};

export type GetOptionPropsResult = {
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
};

const isMultipleParams = <ITEM = SelectItemDefault, GROUP = SelectGroupDefault>(
  params: PropsWithDefault<ITEM, GROUP, boolean>,
): params is PropsWithDefault<ITEM, GROUP, true> => {
  return !!params.multiple;
};

export const isOptionForCreate = <ITEM, GROUP>(
  params: OptionForCreate | Group<ITEM, GROUP> | ITEM,
): params is OptionForCreate => {
  return (
    params && Object.prototype.hasOwnProperty.call(params, '__optionForCreate')
  );
};

export const isNotOptionForCreate = <ITEM, GROUP>(
  params: OptionForCreate | Group<ITEM, GROUP>,
): params is Group<ITEM, GROUP> => {
  return (
    params && !Object.prototype.hasOwnProperty.call(params, '__optionForCreate')
  );
};

export const isOptionForSelectAll = <ITEM>(
  params: SelectAllItem | ITEM,
): params is SelectAllItem => {
  return (
    params && Object.prototype.hasOwnProperty.call(params, '__optionSelectAll')
  );
};

export function getCountedGroups<ITEM, GROUP>(
  groups: GetGroupsResult<ITEM, GROUP>,
  selectAll: boolean,
): CountedGroup<ITEM, GROUP>[] {
  const copyGroups: CountedGroup<ITEM, GROUP>[] = [...groups];

  if (selectAll) {
    groups.forEach((group, index) => {
      copyGroups[index].items = [
        {
          __optionSelectAll: true,
          groupKey: group.key,
        },
        ...copyGroups[index].items,
      ];
    });
  }
  return copyGroups;
}

export const useSelect = <
  ITEM = SelectItemDefault,
  GROUP = SelectItemDefault,
  MULTIPLE extends boolean = false,
>({
  propsAtom,
}: UseSelectProps<ITEM, GROUP, MULTIPLE>) => {
  const openAtom = useAtom(
    useMemo(() => {
      return reatomBoolean(false, 'openAtom');
    }, []),
    [],
    { subscribe: false },
  )[2];

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const itemsAtom = usePropAtom(propsAtom, 'items');
  const selectAllAtom = usePropAtom(propsAtom, 'selectAll');
  const valuePropAtom = usePropAtom(propsAtom, 'value');
  const disabledAtom = usePropAtom(propsAtom, 'disabled');
  const inputValuePropAtom = usePropAtom(propsAtom, 'inputValue');
  const dropdownOpenPropAtom = usePropAtom(propsAtom, 'dropdownOpen');
  const dropdownZIndexAtom = useCreateAtom(() => {
    const zIndex = propsAtom().style?.zIndex;
    return typeof zIndex === 'number' ? zIndex + 1 : undefined;
  });
  const ignoreOutsideClicksRefsAtom = usePropAtom(
    propsAtom,
    'ignoreOutsideClicksRefs',
  );
  const onCreateAtom = usePropAtom(propsAtom, 'onCreate');
  const getItemKeyAtom = usePropAtom(propsAtom, 'getItemKey');
  const groupsAtom = usePropAtom(propsAtom, 'groups');
  const getItemGroupKeyAtom = usePropAtom(propsAtom, 'getItemGroupKey');
  const getGroupKeyAtom = usePropAtom(propsAtom, 'getGroupKey');
  const getItemDisabledAtom = usePropAtom(propsAtom, 'getItemDisabled');

  const [ignoreOutsideClicksRefs] = useAtom(ignoreOutsideClicksRefsAtom);

  const valueAtom = useCreateAtom(() => {
    const value = valuePropAtom();
    return (value && (Array.isArray(value) ? value : [value])) || [];
  }) as Computed<ITEM[]>;

  const focusAtom = useCreateAtom(false);

  const highlightedIndexAtom = useCreateAtom(0);
  const inputValueAtom = useCreateAtom('');

  const clearButtonAtom = useCreateAtom(() => {
    const { clearButton } = propsAtom();
    const inputValue = inputValueAtom();
    const value = valueAtom();
    return !!(clearButton && (value?.length || inputValue));
  });

  const onInput = useAction((value: string | undefined = '') => {
    propsAtom().onInput?.(value);
    inputValueAtom.set(value);

    if (inputRef.current) {
      inputRef.current.value = value;
    }
  });

  const inputElementFocus = useDebounce(
    useAction(() => {
      inputRef.current?.focus();
    }),
    10,
  );

  const optionForCreateAtom = useCreateAtom<OptionForCreate | undefined>(() => {
    const onCreate = onCreateAtom();
    if (!onCreate) {
      return undefined;
    }
    const inputValue = inputValueAtom();
    const optionForCreate: OptionForCreate = {
      label: inputValue,
      __optionForCreate: true,
    };
    return optionForCreate;
  });

  const visibleItemsAtom = useCreateAtom(() => {
    const selectAll = selectAllAtom();
    const groups = groupsAtom();
    const getItemGroupKey = getItemGroupKeyAtom();
    const getGroupKey = getGroupKeyAtom();
    const items = itemsAtom();

    const optionForCreate = optionForCreateAtom();

    const resultGroups = getCountedGroups(
      getGroups(
        items,
        groups?.length ? getItemGroupKey : undefined,
        groups,
        getGroupKey,
        undefined,
      ),
      !!selectAll,
    );

    return optionForCreate ? [optionForCreate, ...resultGroups] : resultGroups;
  });

  const groupsCounterAtom = useCreateAtom(() => {
    const visibleItems = visibleItemsAtom();
    const selectAll = selectAllAtom();
    const value = valueAtom();
    const getItemDisabled = getItemDisabledAtom();

    const groupCounter: Record<string, [number, number]> = {};

    const getSelectedCounter = () => {
      for (const group of visibleItems) {
        if (isOptionForCreate(group)) {
          continue;
        }
        groupCounter[group.key] = [0, group.items.length - 1];
        for (const groupItems of group.items) {
          if (
            !isOptionForSelectAll(groupItems) &&
            !getItemDisabled(groupItems) &&
            value.some((item) => item === groupItems)
          ) {
            groupCounter[group.key][0] = (groupCounter[group.key][0] || 0) + 1;
          }
        }
      }
    };

    if (selectAll) {
      getSelectedCounter();
    }

    return groupCounter;
  });

  // eslint-disable-next-line no-unused-vars
  const [maxHighlightIndex, _, maxHighlightIndexAtom] = useAtom(() => {
    const items = itemsAtom();
    const optionForCreate = optionForCreateAtom();
    const selectAll = selectAllAtom();
    const visibleItems = visibleItemsAtom();

    return (
      items.length +
      // кнопка для создания
      (optionForCreate ? 1 : 0) +
      // кнопки выбрать все
      (selectAll ? visibleItems.length : 0)
    );
  });

  const hasItemsAtom = useCreateAtom(() => {
    const items = itemsAtom();
    const optionForCreate = optionForCreateAtom();

    if (optionForCreate) {
      return true;
    }

    return !!items.length;
  });

  const optionsRefs = useRefs<HTMLDivElement>(maxHighlightIndex, undefined);

  const scrollToHighlightedIndex = useAction(() => {
    scrollIntoView(optionsRefs[highlightedIndexAtom()].current!);
  });

  const highlightIndex = useAction((indexForHighlight: IndexForHighlight) => {
    const maxHighlightIndex = maxHighlightIndexAtom();

    highlightedIndexAtom.set((state) => {
      const newIndex = Math.min(
        Math.max(
          0,
          typeof indexForHighlight === 'function'
            ? indexForHighlight(state)
            : indexForHighlight,
        ),
        maxHighlightIndex - 1,
      );

      return newIndex;
    });
  });

  const removeValue = useAction((e: React.SyntheticEvent, valueItem: ITEM) => {
    e.stopPropagation();
    const props = propsAtom();

    if (isMultipleParams(props)) {
      const { getItemDisabled, getItemKey, onChange } = props;

      const newValue = valueAtom().filter((item) => {
        return getItemDisabled?.(item)
          ? true
          : getItemKey(item) !== getItemKey(valueItem);
      });

      onChange(newValue?.length ? newValue : null, {
        e,
      });
    }
  });

  const onChange = useAction((e: React.SyntheticEvent, item: ITEM) => {
    const { getItemDisabled, getItemKey, onChange, multiple, disabled } =
      propsAtom();

    if (disabled || (getItemDisabled && getItemDisabled(item))) {
      return;
    }

    if (multiple) {
      const value = valueAtom();
      const newValue = value.some(
        (value) => getItemKey(value) === getItemKey(item),
      )
        ? value.filter((value) => getItemKey(value) !== getItemKey(item))
        : [...value, item];
      const val = newValue?.length ? newValue : null;
      (onChange as SelectPropOnChange<ITEM, true>)(val, { e });
    } else {
      (onChange as SelectPropOnChange<ITEM, false>)(item, { e });
      // onInput('');
      openAtom.setFalse();
    }
  });

  const onChangeAll = useAction((e: React.SyntheticEvent, items: ITEM[]) => {
    const props = propsAtom();
    const value = valueAtom();
    const { getItemDisabled, getItemKey, multiple, onChange } = props;

    if (multiple) {
      const nonDisabledItems = getItemDisabled
        ? items.filter((item) => !getItemDisabled(item))
        : items;

      const currentGroupValues: ITEM[] = [];
      const withoutGroupValues: ITEM[] = [];
      value.forEach((el) => {
        if (
          nonDisabledItems.find((item) => getItemKey(el) === getItemKey(item))
        ) {
          currentGroupValues.push(el);
        } else {
          withoutGroupValues.push(el);
        }
      });
      if (currentGroupValues.length === nonDisabledItems.length) {
        (onChange as SelectPropOnChange<ITEM, true>)(withoutGroupValues, {
          e,
        });
      } else {
        const val = [...withoutGroupValues, ...nonDisabledItems];
        (onChange as SelectPropOnChange<ITEM, true>)(val, {
          e,
        });
      }
    }
  });

  const onCreate = useAction((e: React.SyntheticEvent) => {
    const { onCreate } = propsAtom();
    onCreate?.(inputValueAtom(), { e });
    openAtom.setFalse();
    onInput('');
  });

  // Handlers

  const handleInputChange = useAction(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!disabledAtom() && propsAtom().input) {
        onInput?.(e.target.value);
        openAtom.setTrue();
      }
    },
  );

  const handleInputClick = useAction(() => {
    !disabledAtom() && openAtom.toggle();

    inputElementFocus();
  });

  const clearValue = useAction((e: React.SyntheticEvent) => {
    const { getItemDisabled, multiple, onChange, disabled } = propsAtom();

    if (disabled) {
      return;
    }

    const value = valueAtom();
    if (multiple) {
      const results = value?.filter((item) => getItemDisabled?.(item));
      const val = results && results.length > 0 ? results : null;
      (onChange as SelectPropOnChange<ITEM, true>)(val, {
        e,
      });
    } else {
      onChange(null, { e });
    }
    onInput('');
  });

  const getHandleRemoveValue = useAction(
    (item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      openAtom.setTrue();
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      openAtom.setTrue();
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = useAction((e: React.SyntheticEvent) => {
    const { items } = propsAtom();
    const highlightedIndex = highlightedIndexAtom();
    const inputValue = inputValueAtom();
    const visibleItems = visibleItemsAtom();
    const open = openAtom();

    if (open) {
      if (inputValue || items[highlightedIndex]) {
        e.preventDefault();
        e.stopPropagation();
      }

      const getData = (
        index: number,
      ): [
        CountedGroup<ITEM, GROUP> | undefined,
        SelectAllItem | OptionForCreate | ITEM | undefined,
      ] => {
        let counter = 0;

        for (const group of visibleItems) {
          if (isOptionForCreate(group)) {
            if (counter === index) {
              return [undefined, group];
            }
            counter++;
            continue;
          }
          if (group.items.length + counter > index) {
            return [group, group.items[index - counter]];
          }
          counter += group.items.length;
        }
        return [undefined, undefined];
      };

      const [group, item] = getData(highlightedIndex);

      if (isOptionForCreate(item)) {
        onCreate(e);
        return;
      }

      if (isOptionForSelectAll(item)) {
        onChangeAll(
          e,
          (group?.items.filter((el) => !isOptionForSelectAll(el)) as ITEM[]) ??
            [],
        );
        return;
      }

      if (item) {
        onChange(e, item);
      }
    } else {
      openAtom.setTrue();
    }
  });

  const Escape = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom.setFalse();
  });

  const Tab = useAction((e: KeyboardEvent) => {
    if (openAtom()) {
      e.preventDefault();
      e.stopPropagation();
      openAtom.setFalse();
    }
  });

  const Backspace = useAction((e: React.SyntheticEvent) => {
    const inputValue = inputValueAtom();
    const { multiple, clearButton } = propsAtom();
    const value = valueAtom();

    if (inputValue) {
      return;
    }

    if (multiple) {
      removeValue(e, value[value.length - 1]);
    } else {
      clearButton && clearValue?.(e);
    }
  });

  const [keys] = useAtom({
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

  const getOptionActions = useAction(
    ({ index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
      const visibleItems = visibleItemsAtom();

      if (isOptionForCreate(item)) {
        return {
          onClick: onCreate,
          onMouseEnter: () => highlightIndex(index),
        };
      }
      if (isOptionForSelectAll(item)) {
        const getItems = (): ITEM[] => {
          for (const group of visibleItems) {
            if (isOptionForCreate(group)) {
              continue;
            }
            if (group.key === item.groupKey) {
              return (
                (group?.items.filter(
                  (el) => !isOptionForSelectAll(el),
                ) as ITEM[]) ?? []
              );
            }
          }
          return [];
        };
        return {
          onClick: (e: React.SyntheticEvent) => onChangeAll(e, getItems()),
          onMouseEnter: () => highlightIndex(index),
        };
      }

      return {
        onClick: (e: React.SyntheticEvent) => onChange(e, item),
        onMouseEnter: () => highlightIndex(index),
      };
    },
  );

  const handleInputFocus = useAction(
    (e: React.FocusEvent<HTMLInputElement>): void => {
      const { disabled, onFocus } = propsAtom();
      const focused = focusAtom();

      if (!disabled) {
        if (!focused) {
          focusAtom.set(true);
        }
        if (typeof onFocus === 'function') {
          onFocus(e);
        }
      }
    },
  );

  const handleInputBlur = useAction(
    (e: React.FocusEvent<HTMLInputElement>): void => {
      const { onBlur } = propsAtom();
      if (openAtom()) {
        inputElementFocus();
        return;
      }

      if (focusAtom()) {
        focusAtom.set(false);
      }

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    },
  );

  const handleToggleDropdown = useAction(() => {
    const disabled = disabledAtom();
    if (openAtom()) {
      openAtom.setFalse();
      focusAtom.set(false);
    } else if (!disabled) {
      openAtom.setTrue();
      focusAtom.set(true);
      inputRef.current?.focus();
    }
  });

  useKeysRef({
    keys: keys as unknown as KeyHandlers,
    ref: inputRef,
    isActive: useAction(() => !disabledAtom()),
  });

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [
      dropdownRef,
      controlRef,
      ...(ignoreOutsideClicksRefs || []),
    ],
    handler: useAction(() => {
      openAtom.setFalse();
      focusAtom.set(false);
    }),
  });

  // useEffect(() => {
  //   const unsubscribe = disabledAtom.subscribe(
  //     (disable) => disable && openAtom.setFalse(),
  //   );

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = openAtom.subscribe((open) => {
  //     peek(() => propsAtom().onDropdownOpen)?.(open);
  //     highlightIndex(0);
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = inputValuePropAtom.subscribe((inputValueProp) => {
  //     console.log(
  //       'inputValueAtom',
  //       inputValueProp,
  //       inputRef.current,
  //       !!inputRef.current,
  //     );
  //     if (inputValueProp !== peek(inputValueAtom)) {
  //       onInput(inputValueProp);
  //       inputValueAtom.set(inputValueProp || '');
  //     }

  //     if (inputRef.current) {
  //       inputRef.current.value = inputValueProp || '';
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = dropdownOpenPropAtom.subscribe(
  //     (dropdownOpenProp = false) => openAtom.set(dropdownOpenProp),
  //   );
  //   return unsubscribe;
  // }, []);

  return {
    openAtom,
    focusAtom,
    inputValueAtom,
    clearButtonAtom,
    onInput,
    getOptionActions,
    handleInputBlur,
    handleToggleDropdown,
    getHandleRemoveValue,
    inputRef,
    dropdownRef,
    controlRef,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    visibleItemsAtom,
    clearValue,
    optionsRefs,
    highlightedIndexAtom,
    valueAtom,
    getItemKeyAtom,
    onChangeAll,
    highlightIndex,
    onCreate,
    onChange,
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
  };
};
