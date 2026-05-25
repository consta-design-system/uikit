import {
  action,
  atom,
  AtomLike,
  Computed,
  computed,
  effect,
  peek,
  reatomBoolean,
  wrap,
} from '@reatom/core';
import React from 'react';

import { forkRef } from '##/hooks/useForkRef';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import { scrollIntoView } from '##/utils/scrollIntoView';
import {
  clickOutsideEffect,
  computedSet,
  keysEffect,
  rangeAtom,
} from '##/utils/state';
import { isNotNil } from '##/utils/type-guards';

import { SelectGroupDefault, SelectItemDefault, SelectPropOnChange } from '..';
import { PropsWithDefault } from '../defaultProps';
import { CountedGroup, Group, SelectAllItem } from '../types';

type IndexForHighlight = number | ((oldIndex: number) => number);

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
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

export const model = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  propsAtom: AtomLike<PropsWithDefault<ITEM, GROUP, MULTIPLE>>,
) => {
  const openAtom = reatomBoolean(false, 'openAtom');

  const inputElAtom = atom<HTMLInputElement | null>(null, 'inputElAtom');
  const dropdownElAtom = atom<HTMLDivElement | null>(null, 'dropdownElAtom');
  const controlElAtom = atom<HTMLDivElement | null>(null, 'controlElAtom');

  const controlRef = action((el: HTMLDivElement) => {
    forkRef([controlElAtom.set, propsAtom().ref])(el);
  });

  const dropdownRef = wrap(
    action(
      forkRef([dropdownElAtom.set, propsAtom().dropdownRef]),
      'dropdownRef',
    ),
  );
  const inputRef = action(
    forkRef([inputElAtom.set, propsAtom().inputRef]),
    'inputRef',
  );

  const itemsAtom = computed(() => propsAtom().items);
  const selectAllAtom = computed(() => propsAtom().selectAll);
  const valuePropAtom = computed(() => propsAtom().value);
  const disabledAtom = computed(() => propsAtom().disabled);
  const inputValuePropAtom = computed(() => propsAtom().inputValue);
  const inputDefaultValuePropAtom = computed(
    () => propsAtom().inputDefaultValue,
  );
  const dropdownOpenPropAtom = computed(() => propsAtom().dropdownOpen);
  const inputValueAtom = computedSet<string>(
    () => inputValuePropAtom() || peek(inputDefaultValuePropAtom) || '',
  );

  const dropdownZIndexAtom = computed(() => {
    const zIndex = propsAtom().style?.zIndex;
    return typeof zIndex === 'number' ? zIndex + 1 : undefined;
  });

  const getItemKeyAtom = computed(() => propsAtom().getItemKey);
  const groupsAtom = computed(() => propsAtom().groups);
  const getItemGroupKeyAtom = computed(() => propsAtom().getItemGroupKey);

  const getGroupKeyAtom = computed(() => propsAtom().getGroupKey);
  const getItemDisabledAtom = computed(() => propsAtom().getItemDisabled);
  const withOnCreateAtom = computed(() => !!propsAtom().onCreate);

  const ignoreOutsideClicksElsAtom = computed(
    () => propsAtom().ignoreOutsideClicksRefs?.map((ref) => ref.current) || [],
  );
  const valueAtom = computed(() => {
    const value = valuePropAtom();

    return (
      (value && (Array.isArray(value) ? value.filter(isNotNil) : [value])) || []
    );
  }) as Computed<ITEM[]>;

  const focusAtom = atom(false, 'focusAtom');

  const highlightedIndexAtom = atom(0, 'highlightedIndexAtom');

  const clearButtonAtom = computed(() => {
    const { clearButton } = propsAtom();
    const inputValue = inputValueAtom();
    const value = valueAtom();
    return !!(clearButton && (value?.length || inputValue));
  }, 'clearButtonAtom');

  const onInput = action((value: string | undefined = '') => {
    propsAtom().onInput?.(value);
    inputValueAtom.set(value);
    const inputEl = inputElAtom();

    if (inputEl) {
      inputEl.value = value;
    }
  }, 'onInput');

  const optionForCreateAtom = computed<OptionForCreate | undefined>(() => {
    const withOnCreate = withOnCreateAtom();
    if (!withOnCreate) {
      return undefined;
    }
    const inputValue = inputValueAtom();
    const optionForCreate: OptionForCreate = {
      label: inputValue,
      __optionForCreate: true,
    };
    return optionForCreate;
  }, ';optionForCreateAtom');

  const visibleItemsAtom = computed(() => {
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
  }, 'visibleItemsAtom');

  const groupsCounterAtom = computed(() => {
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

  const maxHighlightIndexAtom = computed(() => {
    const items = itemsAtom();
    const withOnCreate = withOnCreateAtom();
    const selectAll = selectAllAtom();
    const visibleItems = visibleItemsAtom();

    return (
      items.length +
      // кнопка для создания
      (withOnCreate ? 1 : 0) +
      // кнопки выбрать все
      (selectAll ? visibleItems.length : 0)
    );
  });

  const hasItemsAtom = computed(() => {
    const items = itemsAtom();
    const withOnCreate = withOnCreateAtom();

    if (withOnCreate) {
      return true;
    }

    return !!items.length;
  });

  const optionsElsAtom = rangeAtom<HTMLDivElement | null>(
    maxHighlightIndexAtom,
    null,
  );

  const getOptionRef = action((index: number) =>
    wrap(optionsElsAtom()[index]?.set),
  );

  const scrollToHighlightedIndex = action(() => {
    scrollIntoView(optionsElsAtom()[highlightedIndexAtom()]()!);
  });

  const highlightIndex = action((indexForHighlight: IndexForHighlight) => {
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

  const removeValue = action((e: React.SyntheticEvent, valueItem: ITEM) => {
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

  const onChange = action((e: React.SyntheticEvent, item: ITEM) => {
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
      onInput('');
      openAtom.setFalse();
    }
  });

  const onChangeAll = action((e: React.SyntheticEvent, items: ITEM[]) => {
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

  const onCreate = action((e: React.SyntheticEvent) => {
    propsAtom().onCreate?.(inputValueAtom(), { e });
    openAtom.setFalse();
    onInput('');
  });

  // Handlers

  const handleInputChange = action(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!disabledAtom() && propsAtom().input) {
        onInput?.(e.target.value);
        openAtom.setTrue();
      }
    },
  );

  const handleInputClick = action(() => {
    if (!disabledAtom()) {
      openAtom.toggle();
    }

    inputElAtom()?.focus();
    // inputElementFocus();
  });

  const clearValue = action((e: React.SyntheticEvent) => {
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

  const getHandleRemoveValue = action(
    (item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      openAtom.setTrue();
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      openAtom.setTrue();
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = action((e: React.SyntheticEvent) => {
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
  }) as unknown as (e: KeyboardEvent) => void;

  const Escape = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom.setFalse();
  });

  const Tab = action((e: KeyboardEvent) => {
    if (openAtom()) {
      e.preventDefault();
      e.stopPropagation();
      openAtom.setFalse();
    }
  });

  const Backspace = action((e: React.SyntheticEvent) => {
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
  }) as unknown as (e: KeyboardEvent) => void;

  const getOptionActions = action(
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

  const handleInputFocus = action(
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

  const handleInputBlur = wrap(
    action((e: React.FocusEvent<HTMLInputElement>): void => {
      const { onBlur } = propsAtom();

      if (focusAtom()) {
        focusAtom.set(false);
      }

      onBlur?.(e);
    }),
  );

  const handleToggleDropdown = action(() => {
    const disabled = disabledAtom();
    if (openAtom()) {
      openAtom.setFalse();
      focusAtom.set(false);
    } else if (!disabled) {
      openAtom.setTrue();
      focusAtom.set(true);
      inputElAtom()?.focus();
    }
  });

  keysEffect({
    keysAtom: atom({
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
    }),
    elAtom: inputElAtom,
    isActiveAtom: computed(() => !disabledAtom()),
  });

  clickOutsideEffect({
    isActiveAtom: openAtom,
    ignoreClicksElementsAtom: computed(() => [
      dropdownElAtom(),
      controlElAtom(),
      ...ignoreOutsideClicksElsAtom(),
    ]),
    handler: () => {
      openAtom.setFalse();
      focusAtom.set(false);
    },
  });

  effect(() => {
    if (disabledAtom()) {
      openAtom.setFalse();
    }
  });

  effect(() => {
    const open = openAtom();
    peek(() => propsAtom().onDropdownOpen)?.(open);
    highlightIndex(0);
  });

  effect(() => {
    openAtom.set(!!dropdownOpenPropAtom());
  });

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
    getOptionRef,
    highlightedIndexAtom,
    valueAtom,
    getItemKeyAtom,
    onChangeAll,
    onCreate,
    onChange,
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
    controlElAtom,
  };
};
