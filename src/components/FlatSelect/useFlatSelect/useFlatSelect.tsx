import { action, Computed, peek, sleep, withAbort, wrap } from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import React, { useEffect, useRef } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import {
  useClickOutsideAtom,
  useCreateAtom,
  useElementAtomEventListener,
  useKeysAtom,
  usePropAtom,
  useRefAtom,
  useSendRefToAtom,
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
import { scrollToIndex } from './helpers';

type IndexForHighlight = number | ((oldIndex: number) => number);

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
};

export type UseFlatSelectProps<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = {
  propsAtom: Computed<PropsWithDefault<ITEM, GROUP, MULTIPLE>>;
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

export const useFlatSelect = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectItemDefault,
  MULTIPLE extends boolean = false,
>({
  propsAtom,
}: UseFlatSelectProps<ITEM, GROUP, MULTIPLE>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const anchorRefAtom = usePropAtom(propsAtom, 'anchorRef');
  const anchorRef = useAtom(anchorRefAtom)[0];

  const anchorElementAtom = useSendRefToAtom(anchorRef);

  const [rootElementAtom, rootRef] = useRefAtom<HTMLDivElement>();

  const rootFocusAtom = useCreateAtom(false);
  const rootMouseDownAtom = useCreateAtom(false);

  const itemsAtom = usePropAtom(propsAtom, 'items');
  const selectAllAtom = usePropAtom(propsAtom, 'selectAll');
  const valuePropAtom = usePropAtom(propsAtom, 'value');
  const disabledPropAtom = usePropAtom(propsAtom, 'disabled');
  const disabledAtom = useCreateAtom(() => !!disabledPropAtom());
  const inputValuePropAtom = usePropAtom(propsAtom, 'inputValue');

  const openPropAtom = usePropAtom(propsAtom, 'isOpen');
  const withOnCreateAtom = useCreateAtom(() => !!propsAtom().onCreate);
  const groupsAtom = usePropAtom(propsAtom, 'groups');
  const getItemGroupKeyAtom = usePropAtom(propsAtom, 'getItemGroupKey');
  const getGroupKeyAtom = usePropAtom(propsAtom, 'getGroupKey');
  const getItemKeyAtom = usePropAtom(propsAtom, 'getItemKey');

  const dropdownZIndexAtom = useCreateAtom(() => {
    const zIndex = propsAtom().style?.zIndex;
    return typeof zIndex === 'number' ? zIndex + 1 : undefined;
  });
  const ignoreOutsideClicksRefsAtom = usePropAtom(
    propsAtom,
    'ignoreOutsideClicksRefs',
  );

  const valueAtom = useCreateAtom(() => {
    const value = valuePropAtom();
    return (value && (Array.isArray(value) ? value : [value])) || [];
  }) as Computed<ITEM[]>;
  const inputFocusAtom = useCreateAtom(false);
  const openAtom = useCreateAtom(false);
  const highlightedIndexAtom = useCreateAtom(-1);
  const inputValueAtom = useCreateAtom('');

  const clearButtonAtom = useAtom(
    () => {
      const { clearButton } = propsAtom();
      const inputValue = inputValueAtom();
      const value = valueAtom();

      return !!(clearButton && (value?.length || inputValue));
    },
    [],
    { subscribe: false },
  )[2];

  const setRootFocus = useAction(
    action(async (value: boolean) => {
      await wrap(sleep(5));
      rootFocusAtom.set(value);
    }).extend(withAbort()),
  );
  const handleRootMouseDown = useAction(() => rootMouseDownAtom.set(true));
  const handleRootMouseUp = useAction(() => rootMouseDownAtom.set(false));
  const handleRootFocus = useAction(() => setRootFocus(true));
  const handleRootBlur = useAction(() => setRootFocus(false));
  const setInputValue = useAction((value: string | undefined = '') => {
    inputValueAtom.set(value);

    if (inputRef.current) {
      inputRef.current.value = value;
    }
  });

  const onInput = useAction((value: string | undefined = '') => {
    propsAtom().onInput?.(value);
    setInputValue(value);
  });

  const optionForCreateAtom = useCreateAtom<OptionForCreate | undefined>(() => {
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
      !!selectAll && items.length ? selectAll : false,
    );

    return optionForCreate ? [optionForCreate, ...resultGroups] : resultGroups;
  });

  const groupsCounterAtom = useCreateAtom(() => {
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

  // eslint-disable-next-line no-unused-vars
  const [maxHighlightIndex, _, maxHighlightIndexAtom] = useAtom(() => {
    const items = itemsAtom();
    const optionForCreate = withOnCreateAtom();
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
    const items = itemsAtom();
    const highlightedIndex = peek(highlightedIndexAtom);
    const listElement = listRef.current;

    if (items.length > 0 && listElement) {
      scrollToIndex(highlightedIndex, listElement, optionsRefs);
    }
  });

  const highlightIndex = useAction((indexForHighlight: IndexForHighlight) => {
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
      const val = newValue.length ? newValue : null;
      (onChange as FlatSelectPropOnChange<ITEM, true>)(val, { e });
    } else {
      (onChange as FlatSelectPropOnChange<ITEM, false>)(item, { e });
    }
  });

  const onChangeAll = useAction((e: React.SyntheticEvent, items: ITEM[]) => {
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

  const onCreate = useAction((e: React.SyntheticEvent) => {
    propsAtom().onCreate?.(inputValueAtom(), { e });
  });

  // Handlers

  const handleInputChange = useAction(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!disabledAtom() && propsAtom().input) {
        onInput?.(e.target.value);
      }
    },
  );

  const clearValue = useAction(() => onInput(''));

  const getHandleRemoveValue = useAction(
    (_, item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledAtom()) {
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = useAction((e: React.SyntheticEvent) => {
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

  const Escape = useAction((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom.set(false);

    anchorRefAtom()?.current?.focus();
  });

  const Tab = useAction((e: KeyboardEvent) => {
    if (propsAtom().input && !inputFocusAtom()) {
      return;
    }
    if (openAtom()) {
      e.preventDefault();
      e.stopPropagation();
      openAtom.set(false);
    }

    anchorRefAtom()?.current?.focus();
  });

  const keysAtom = useCreateAtom({
    ArrowUp,
    ArrowDown,
    PageUp: ArrowUp,
    PageDown: ArrowDown,
    Home: ArrowUp,
    End: ArrowDown,
    Enter,
    Escape,
    Tab,
  });

  const getOptionActions = useAction(
    ({ index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
      if (isOptionForCreate(item)) {
        return {
          onClick: (e) => {
            onCreate(e);
            highlightIndex(index);
          },
          onMouseEnter: () => rootFocusAtom() && highlightIndex(index),
        };
      }
      if (isOptionForSelectAll(item)) {
        const getItems = (): ITEM[] => {
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
        };
        return {
          onClick: (e: React.SyntheticEvent) => {
            onChangeAll(e, getItems());
            highlightIndex(index);
          },
          onMouseEnter: () => rootFocusAtom() && highlightIndex(index),
        };
      }

      return {
        onClick: (e: React.SyntheticEvent) => {
          highlightIndex(index);
          onChange(e, item);
        },
        onMouseEnter: () => rootFocusAtom() && highlightIndex(index),
      };
    },
  );

  const handleInputFocus = useAction(
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

  const handleInputBlur = useAction(
    (e: React.FocusEvent<HTMLInputElement>): void => {
      if (inputFocusAtom()) {
        inputFocusAtom.set(false);
      }

      propsAtom().onInputBlur?.(e);
    },
  );

  useClickOutsideAtom({
    isActiveAtom: openAtom,
    ignoreClicksElementsAtom: useCreateAtom(() => {
      const rootElement = rootElementAtom();
      const anchorElement = anchorElementAtom();
      const ignoreOutsideClicksElements = ignoreOutsideClicksRefsAtom()?.map(
        (ref) => ref.current,
      );

      return [
        rootElement,
        anchorElement,
        ...(ignoreOutsideClicksElements || []),
      ];
    }),
    handler: useAction(() => {
      openAtom.set(false);
    }),
  });

  useClickOutsideAtom({
    isActiveAtom: rootFocusAtom,
    ignoreClicksElementsAtom: useCreateAtom(() => [rootElementAtom()]),
    handler: handleRootBlur,
  });

  useEffect(() => {
    const unsubscribe = rootFocusAtom.subscribe((focus) => {
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

    return unsubscribe;
  }, []);

  const handleAnchorClick = useAction(() => {
    openAtom.set(!openAtom());
  });

  useElementAtomEventListener(anchorElementAtom, 'click', handleAnchorClick);
  useElementAtomEventListener(rootElementAtom, 'focus', handleRootFocus);
  useElementAtomEventListener(rootElementAtom, 'click', handleRootFocus);
  useElementAtomEventListener(rootElementAtom, 'blur', handleRootBlur);
  useElementAtomEventListener(
    rootElementAtom,
    'mousedown',
    handleRootMouseDown,
  );
  useElementAtomEventListener(rootElementAtom, 'mouseup', handleRootMouseUp);

  useKeysAtom({
    keysAtom,
    elAtom: rootElementAtom,
    isActiveAtom: useCreateAtom(() => {
      const disabled = disabledAtom();
      if (anchorRefAtom()?.current && openAtom()) {
        return true;
      }
      return !disabled;
    }),
  });

  useEffect(() => {
    const unsubscribe = inputValuePropAtom.subscribe((inputValueProp = '') => {
      const inputValue = peek(inputValueAtom);

      if (inputValueProp !== inputValue) {
        setInputValue(inputValueProp);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const { inputDefaultValue, inputValue } = propsAtom();

    setInputValue(inputValue || inputDefaultValue);
  }, []);

  useEffect(() => {
    const unsubscribe = inputValueAtom.subscribe(console.log);

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = openPropAtom.subscribe((openProp = false) =>
      openAtom.set(openProp),
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = visibleItemsAtom.subscribe(() =>
      highlightedIndexAtom.set(-1),
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = disabledAtom.subscribe((disabled) => {
      disabled && highlightedIndexAtom.set(-1);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = openAtom.subscribe(async (open) => {
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

    return unsubscribe;
  }, []);

  return {
    openAtom,
    inputFocusAtom,
    inputValueAtom,
    clearButtonAtom,
    onInput,
    getOptionActions,
    handleInputBlur,
    getHandleRemoveValue,
    inputRef,
    listRef,
    handleInputChange,
    handleInputFocus,
    visibleItemsAtom,
    clearValue,
    optionsRefs,
    highlightedIndexAtom,
    valueAtom,
    getItemKeyAtom,
    onChangeAll,
    onCreate,
    onChange,
    hasItemsAtom,
    groupsCounterAtom,
    dropdownZIndexAtom,
    rootRef,
    disabledAtom,
  };
};
