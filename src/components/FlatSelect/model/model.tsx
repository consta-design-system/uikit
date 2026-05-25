import {
  action,
  atom,
  Computed,
  computed,
  effect,
  peek,
  sleep,
  withAbort,
  wrap,
} from '@reatom/core';
import React from 'react';

import { forkRef } from '##/hooks/useForkRef';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import { scrollIntoView } from '##/utils/scrollIntoView';
import {
  clickOutsideEffect,
  computedSet,
  keysEffect,
  onEventEffect,
  rangeAtom,
} from '##/utils/state';

import { PropsWithDefault } from '../defaultProps';
import {
  CountedGroup,
  FlatSelectAllItem,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropOnChange,
  Group,
} from '../types';

type IndexForHighlight = number | ((oldIndex: number) => number);

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
};

export type OptionProps<ITEM> = {
  index: number;
  item: ITEM | OptionForCreate | FlatSelectAllItem;
};

export type GetOptionPropsResult = {
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
};

const isMultipleParams = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
>(
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

export const isOptionForSelectAll = <ITEM,>(
  params: FlatSelectAllItem | ITEM,
): params is FlatSelectAllItem => {
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
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectItemDefault,
  MULTIPLE extends boolean = false,
>(
  propsAtom: Computed<PropsWithDefault<ITEM, GROUP, MULTIPLE>>,
) => {
  const inputElAtom = atom<HTMLInputElement | null>(null);
  const listElAtom = atom<HTMLDivElement | null>(null);
  const listRef = wrap(action(forkRef([listElAtom.set, propsAtom().listRef])));

  const rootFocusAtom = atom(false);
  const rootMouseDownAtom = atom(false);
  const rootElementAtom = atom<HTMLDivElement | null>(null);
  const anchorElementAtom = computedSet<HTMLElement | null>(
    () => propsAtom().anchorRef?.current || null,
  );
  const setAnchorElementAtom = action(async () => {
    await wrap(sleep());
    anchorElementAtom.set(propsAtom().anchorRef?.current || null);
  }).extend(withAbort());

  const itemsAtom = computed(() => propsAtom().items);
  const selectAllAtom = computed(() => propsAtom().selectAll);
  const valuePropAtom = computed(() => propsAtom().value);
  const disabledAtom = computed(() => !!propsAtom().disabled);
  const inputValueProp = computed(() => propsAtom().inputValue);
  const inputDefaultValueProp = computed(() => propsAtom().inputDefaultValue);

  const inputValueAtom = computedSet<string>(
    () => inputValueProp() || peek(inputDefaultValueProp) || '',
  );

  const openPropAtom = computed(() => propsAtom().isOpen);
  const withOnCreateAtom = computed(() => !!propsAtom().onCreate);
  const groupsAtom = computed(() => propsAtom().groups);
  const getItemKeyAtom = computed(() => propsAtom().getItemKey);

  const ignoreOutsideClicksElsAtom = computed(
    () => propsAtom().ignoreOutsideClicksRefs?.map((ref) => ref.current) || [],
  );

  const valueAtom = computed(() => {
    const value = valuePropAtom();
    return (value && (Array.isArray(value) ? value : [value])) || [];
  }) as Computed<ITEM[]>;
  const inputFocusAtom = atom(false);
  const openAtom = atom(false);
  const highlightedIndexAtom = atom(-1);

  const clearButtonAtom = computed(() => {
    const { clearButton } = propsAtom();
    const inputValue = inputValueAtom();

    return !!(clearButton && inputValue);
  });

  const setRootFocus = action(async (value: boolean) => {
    await wrap(sleep(5));
    rootFocusAtom.set(value);
  }).extend(withAbort());

  const handleRootMouseDown = action(() => rootMouseDownAtom.set(true));
  const handleRootMouseUp = action(() => rootMouseDownAtom.set(false));
  const handleRootFocus = wrap(action(() => setRootFocus(true)));
  const handleRootBlur = wrap(action(() => setRootFocus(false)));
  const setInputValue = action((value: string | undefined = '') => {
    inputValueAtom.set(value);

    const inputEl = inputElAtom();

    if (inputEl) {
      inputEl.value = value;
    }
  });

  const onInput = action((value: string | undefined = '') => {
    propsAtom().onInput?.(value);
    setInputValue(value);
  });

  const optionForCreateAtom = computed<OptionForCreate | undefined>(() => {
    const withOnCreate = withOnCreateAtom();
    const inputValue = inputValueAtom();
    if (!withOnCreate) {
      return undefined;
    }

    const optionForCreate: OptionForCreate = {
      label: inputValue,
      __optionForCreate: true,
    };
    return optionForCreate;
  });

  const visibleItemsAtom = computed(() => {
    const selectAll = selectAllAtom();
    const groups = groupsAtom();
    const { getItemGroupKey, getGroupKey } = peek(propsAtom);
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
      !!selectAll && items.length ? selectAll : false,
    );

    return optionForCreate ? [optionForCreate, ...resultGroups] : resultGroups;
  });

  const groupsCounterAtom = computed(() => {
    const visibleItems = visibleItemsAtom();
    const selectAll = selectAllAtom();
    const value = valueAtom();
    const { getItemDisabled } = peek(propsAtom);

    const groupCounter: Record<string, [number, number]> = {};

    const getFlatSelectedCounter = () => {
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
      getFlatSelectedCounter();
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

  const getOptionRef = wrap(
    action((index: number) => wrap(optionsElsAtom()[index]?.set)),
  );

  const scrollToHighlightedIndex = action(() => {
    scrollIntoView(optionsElsAtom()[highlightedIndexAtom()]()!);
  });

  const highlightIndex = action((indexForHighlight: IndexForHighlight) => {
    if (disabledAtom()) {
      return;
    }

    highlightedIndexAtom.set((state) => {
      const newIndex = Math.min(
        Math.max(
          0,
          typeof indexForHighlight === 'function'
            ? indexForHighlight(state)
            : indexForHighlight,
        ),
        maxHighlightIndexAtom() - 1,
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
      const val = newValue.length ? newValue : null;
      (onChange as FlatSelectPropOnChange<ITEM, true>)(val, { e });
    } else {
      (onChange as FlatSelectPropOnChange<ITEM, false>)(item, { e });
    }
  });

  const onChangeAll = action((e: React.SyntheticEvent, items: ITEM[]) => {
    const value = valueAtom();
    const { getItemDisabled, getItemKey, multiple, onChange } = propsAtom();

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
        (onChange as FlatSelectPropOnChange<ITEM, true>)(
          withoutGroupValues.length ? withoutGroupValues : null,
          { e },
        );
      } else {
        const val = [...withoutGroupValues, ...nonDisabledItems];
        (onChange as FlatSelectPropOnChange<ITEM, true>)(
          val.length ? val : null,
          { e },
        );
      }
    }
  });

  const onCreate = action((e: React.SyntheticEvent) => {
    propsAtom().onCreate?.(inputValueAtom(), { e });
  });

  // Handlers

  const handleInputChange = action(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!disabledAtom() && propsAtom().input) {
        onInput?.(e.target.value);
      }
    },
  );

  const clearValue = action(() => onInput(''));

  const getHandleRemoveValue = action(
    (_, item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = action((e: React.SyntheticEvent) => {
    const { items } = propsAtom();
    const highlightedIndex = highlightedIndexAtom();
    const inputValue = inputValueAtom();
    const visibleItems = visibleItemsAtom();

    if (inputValue || items[highlightedIndex]) {
      e.preventDefault();
      e.stopPropagation();
    }

    const getData = (
      index: number,
    ): [
      CountedGroup<ITEM, GROUP> | undefined,
      FlatSelectAllItem | OptionForCreate | ITEM | undefined,
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
  }) as unknown as (e: KeyboardEvent) => void;

  const Escape = action((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom.set(false);

    anchorElementAtom()?.focus();
  });

  const Tab = action((e: KeyboardEvent) => {
    if (propsAtom().input && !inputFocusAtom()) {
      return;
    }
    if (openAtom()) {
      e.preventDefault();
      e.stopPropagation();
      openAtom.set(false);
    }

    anchorElementAtom()?.focus();
  });

  const getOptionActions = wrap(
    action(({ index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
      if (isOptionForCreate(item)) {
        return {
          onClick: action((e) => {
            onCreate(e);
            highlightIndex(index);
          }),
          onMouseEnter: action(() => rootFocusAtom() && highlightIndex(index)),
        };
      }
      if (isOptionForSelectAll(item)) {
        const getItems = action((): ITEM[] => {
          const visibleItems = visibleItemsAtom();
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
        });
        return {
          onClick: action((e: React.SyntheticEvent) => {
            onChangeAll(e, getItems());
            highlightIndex(index);
          }),
          onMouseEnter: action(() => rootFocusAtom() && highlightIndex(index)),
        };
      }

      return {
        onClick: action((e: React.SyntheticEvent) => {
          highlightIndex(index);
          onChange(e, item);
        }),
        onMouseEnter: action(() => rootFocusAtom() && highlightIndex(index)),
      };
    }),
  );

  const handleInputFocus = action(
    (e: React.FocusEvent<HTMLInputElement>): void => {
      const { disabled, onInputFocus } = propsAtom();
      const focused = inputFocusAtom();

      if (!disabled) {
        if (!focused) {
          inputFocusAtom.set(true);
        }
        onInputFocus?.(e);
      }
    },
  );

  const handleInputBlur = action(
    (e: React.FocusEvent<HTMLInputElement>): void => {
      if (inputFocusAtom()) {
        inputFocusAtom.set(false);
      }

      propsAtom().onInputBlur?.(e);
    },
  );

  clickOutsideEffect({
    isActiveAtom: openAtom,
    ignoreClicksElementsAtom: computed(() => [
      rootElementAtom(),
      anchorElementAtom(),
      ...ignoreOutsideClicksElsAtom(),
    ]),
    handler: action(() => {
      openAtom.set(false);
    }),
  });

  clickOutsideEffect({
    isActiveAtom: rootFocusAtom,
    ignoreClicksElementsAtom: computed(() => [rootElementAtom()]),
    handler: handleRootBlur,
  });

  effect(() => {
    const focus = rootFocusAtom();

    if (
      focus &&
      !peek(rootMouseDownAtom) &&
      peek(highlightedIndexAtom) === -1 &&
      !peek(disabledAtom)
    ) {
      highlightedIndexAtom.set(0);
    }
    if (!focus) {
      highlightedIndexAtom.set(-1);
    }
  });

  const handleAnchorClick = action(() => {
    openAtom.set(!openAtom());
  });

  onEventEffect(anchorElementAtom, 'click', handleAnchorClick);
  onEventEffect(rootElementAtom, 'focus', handleRootFocus);
  onEventEffect(rootElementAtom, 'click', handleRootFocus);
  onEventEffect(rootElementAtom, 'blur', handleRootBlur);
  onEventEffect(rootElementAtom, 'mousedown', handleRootMouseDown);
  onEventEffect(rootElementAtom, 'mouseup', handleRootMouseUp);

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
    }),
    elAtom: rootElementAtom,
    isActiveAtom: computed(() => {
      const disabled = disabledAtom();
      if (anchorElementAtom() && openAtom()) {
        return true;
      }
      return !disabled;
    }),
  });

  effect(() => {
    openAtom.set(openPropAtom() || false);
  });

  effect(async () => {
    await setAnchorElementAtom();
  });

  effect(() => {
    visibleItemsAtom();
    highlightedIndexAtom.set(-1);
  });

  effect(() => {
    disabledAtom() && highlightedIndexAtom.set(-1);
  });

  effect(async () => {
    const open = openAtom();
    peek(propsAtom).onOpen?.(open);
    const anchorElement = peek(anchorElementAtom);
    if (anchorElement && open) {
      setInputValue(peek(() => propsAtom().inputDefaultValue));
    }
    await wrap(sleep(animateTimeout));

    if (open) {
      peek(rootElementAtom)?.focus();
    } else {
      inputFocusAtom.set(false);
      rootFocusAtom.set(false);
    }
  });

  return {
    openAtom,
    inputFocusAtom,
    inputValueAtom,
    clearButtonAtom,
    onInput,
    getOptionActions,
    handleInputBlur,
    getHandleRemoveValue,
    inputRef: wrap(inputElAtom.set),
    listRef,
    handleInputChange,
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
    rootRef: wrap(rootElementAtom.set),
    disabledAtom,
  };
};
