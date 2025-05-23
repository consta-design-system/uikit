import { AtomMut } from '@reatom/framework';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { useClickOutside } from '##/hooks/useClickOutside';
import { useDebounce } from '##/hooks/useDebounce';
import { KeyHandlers, useKeysRef } from '##/hooks/useKeysRef';
import { useRefs } from '##/hooks/useRefs';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { usePickAtom, usePropAtom } from '##/utils/state/usePickAtom';

import { PropsWithDefault } from '../../SelectCanary/defaultProps';
import { SelectGroupDefault, SelectItemDefault, SelectPropOnChange } from '..';
import { CountedGroup, Group, SelectAllItem } from '../types';
import { scrollToIndex } from './helpers';

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
  propsAtom: AtomMut<PropsWithDefault<ITEM, GROUP, MULTIPLE>>;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const itemsAtom = usePropAtom(propsAtom, 'items');
  const selectAllAtom = usePropAtom(propsAtom, 'selectAll');
  const valuePropAtom = usePropAtom(propsAtom, 'value');
  const disabledAtom = usePropAtom(propsAtom, 'disabled');
  const inputValuePropAtom = usePropAtom(propsAtom, 'inputValue');
  const dropdownOpenPropAtom = usePropAtom(propsAtom, 'dropdownOpen');
  const dropdownZIndexAtom = useCreateAtom((ctx) => {
    const zIndex = ctx.spy(propsAtom).style?.zIndex;
    return typeof zIndex === 'number' ? zIndex + 1 : undefined;
  });
  const ignoreOutsideClicksRefsAtom = usePropAtom(
    propsAtom,
    'ignoreOutsideClicksRefs',
  );
  const onCreateAtom = usePropAtom(propsAtom, 'onCreate');
  const getItemKeyAtom = usePropAtom(propsAtom, 'getItemKey');
  const [ignoreOutsideClicksRefs] = useAtom(ignoreOutsideClicksRefsAtom);

  const valueAtom = useCreateAtom((ctx) => {
    const value = ctx.spy(valuePropAtom);
    return (value && (Array.isArray(value) ? value : [value])) || [];
  }) as unknown as AtomMut<ITEM[]>;
  const focusAtom = useCreateAtom(false);
  const openAtom = useCreateAtom(false);
  const highlightedIndexAtom = useCreateAtom(0);
  const inputValueAtom = useCreateAtom('');

  const clearButtonAtom = useCreateAtom((ctx) => {
    const { clearButton } = ctx.spy(propsAtom);
    const inputValue = ctx.spy(inputValueAtom);
    const value = ctx.spy(valueAtom);
    return !!(clearButton && (value?.length || inputValue));
  });

  const onInput = useAction((ctx, value: string | undefined = '') => {
    ctx.get(propsAtom).onInput?.(value);
    inputValueAtom(ctx, value);

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

  const optionForCreateAtom = useCreateAtom<OptionForCreate | undefined>(
    (ctx) => {
      const onCreate = ctx.spy(onCreateAtom);
      if (!onCreate) {
        return undefined;
      }
      const inputValue = ctx.spy(inputValueAtom);
      const optionForCreate: OptionForCreate = {
        label: inputValue,
        __optionForCreate: true,
      };
      return optionForCreate;
    },
  );

  const propsForVisibleItemsAtom = usePickAtom(
    propsAtom as AtomMut<PropsWithDefault<ITEM, GROUP, boolean>>,
    [
      'selectAll',
      'groups',
      'getItemGroupKey',
      'getGroupKey',
      'getItemDisabled',
      'getItemKey',
      'items',
    ],
  );

  const visibleItemsAtom = useCreateAtom((ctx) => {
    const { selectAll, groups, getItemGroupKey, getGroupKey, items } = ctx.spy(
      propsForVisibleItemsAtom,
    );

    const optionForCreate = ctx.spy(optionForCreateAtom);

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

  const groupsCounterAtom = useCreateAtom((ctx) => {
    const visibleItems = ctx.spy(visibleItemsAtom);
    const selectAll = ctx.spy(selectAllAtom);
    const value = ctx.spy(valueAtom);
    const { getItemDisabled } = ctx.get(propsForVisibleItemsAtom);

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
  const [maxHighlightIndex, _, maxHighlightIndexAtom] = useAtom((ctx) => {
    const items = ctx.spy(itemsAtom);
    const optionForCreate = ctx.spy(optionForCreateAtom);
    const selectAll = ctx.spy(selectAllAtom);
    const visibleItems = ctx.spy(visibleItemsAtom);

    return (
      items.length +
      // кнопка для создания
      (optionForCreate ? 1 : 0) +
      // кнопки выбрать все
      (selectAll ? visibleItems.length : 0)
    );
  });

  const hasItemsAtom = useCreateAtom((ctx) => {
    const items = ctx.spy(itemsAtom);
    const optionForCreate = ctx.spy(optionForCreateAtom);

    if (optionForCreate) {
      return true;
    }

    return !!items.length;
  });

  const optionsRefs = useRefs<HTMLDivElement>(maxHighlightIndex, undefined);

  const scrollToHighlightedIndex = useAction((ctx) => {
    const items = ctx.get(itemsAtom);
    const highlightedIndex = ctx.get(highlightedIndexAtom);
    const dropdownElement = dropdownRef.current;

    if (items.length > 0 && dropdownElement) {
      scrollToIndex(highlightedIndex, dropdownElement, optionsRefs);
    }
  });

  const highlightIndex = useAction(
    (ctx, indexForHighlight: IndexForHighlight) => {
      const maxHighlightIndex = ctx.get(maxHighlightIndexAtom);

      highlightedIndexAtom(ctx, (state) => {
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
    },
  );

  const removeValue = useAction(
    (ctx, e: React.SyntheticEvent, valueItem: ITEM) => {
      e.stopPropagation();
      const props = ctx.get(propsAtom);

      if (isMultipleParams(props)) {
        const { getItemDisabled, getItemKey, onChange } = props;

        const newValue = ctx.get(valueAtom).filter((item) => {
          return getItemDisabled?.(item)
            ? true
            : getItemKey(item) !== getItemKey(valueItem);
        });

        onChange(newValue?.length ? newValue : null, {
          e,
        });
      }
    },
  );

  const onChange = useAction((ctx, e: React.SyntheticEvent, item: ITEM) => {
    const { getItemDisabled, getItemKey, onChange, multiple, disabled } =
      ctx.get(propsAtom);

    if (disabled || (getItemDisabled && getItemDisabled(item))) {
      return;
    }

    if (multiple) {
      const value = ctx.get(valueAtom);
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
      openAtom(ctx, false);
    }
  });

  const onChangeAll = useAction(
    (ctx, e: React.SyntheticEvent, items: ITEM[]) => {
      const props = ctx.get(propsAtom);
      const value = ctx.get(valueAtom);
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
    },
  );

  const onCreate = useAction((ctx, e: React.SyntheticEvent) => {
    const { onCreate } = ctx.get(propsAtom);
    onCreate?.(ctx.get(inputValueAtom), { e });
    openAtom(ctx, false);
    onInput('');
  });

  // Handlers

  const handleInputChange = useAction(
    (ctx, e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!ctx.get(disabledAtom) && ctx.get(propsAtom).input) {
        onInput?.(e.target.value);
        openAtom(ctx, true);
      }
    },
  );

  const handleInputClick = useAction((ctx) => {
    !ctx.get(disabledAtom) && openAtom(ctx, (value) => !value);

    inputElementFocus();
  });

  const clearValue = useAction((ctx, e: React.SyntheticEvent) => {
    const { getItemDisabled, multiple, onChange, disabled } =
      ctx.get(propsAtom);

    if (disabled) {
      return;
    }

    const value = ctx.get(valueAtom);
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
    (_, item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ctx.get(disabledAtom)) {
      openAtom(ctx, true);
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ctx.get(disabledAtom)) {
      openAtom(ctx, true);
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = useAction((ctx, e: React.SyntheticEvent) => {
    const { items } = ctx.get(propsAtom);
    const highlightedIndex = ctx.get(highlightedIndexAtom);
    const inputValue = ctx.get(inputValueAtom);
    const visibleItems = ctx.get(visibleItemsAtom);
    const open = ctx.get(openAtom);

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
      openAtom(ctx, true);
    }
  });

  const Escape = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom(ctx, false);
  });

  const Tab = useAction((ctx, e: KeyboardEvent) => {
    if (ctx.get(openAtom)) {
      e.preventDefault();
      e.stopPropagation();
      openAtom(ctx, false);
    }
  });

  const Backspace = useAction((ctx, e: React.SyntheticEvent) => {
    const inputValue = ctx.get(inputValueAtom);
    const { multiple, clearButton } = ctx.get(propsAtom);
    const value = ctx.get(valueAtom);

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
    (ctx, { index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
      const visibleItems = ctx.get(visibleItemsAtom);

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
    (ctx, e: React.FocusEvent<HTMLInputElement>): void => {
      const { disabled, onFocus } = ctx.get(propsAtom);
      const focused = ctx.get(focusAtom);

      if (!disabled) {
        if (!focused) {
          focusAtom(ctx, true);
        }
        if (typeof onFocus === 'function') {
          onFocus(e);
        }
      }
    },
  );

  const handleInputBlur = useAction(
    (ctx, e: React.FocusEvent<HTMLInputElement>): void => {
      const { onBlur } = ctx.get(propsAtom);
      if (ctx.get(openAtom)) {
        inputElementFocus();
        return;
      }

      if (ctx.get(focusAtom)) {
        focusAtom(ctx, false);
      }

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    },
  );

  const handleToggleDropdown = useAction((ctx) => {
    const disabled = ctx.get(disabledAtom);
    if (ctx.get(openAtom)) {
      openAtom(ctx, false);
      focusAtom(ctx, false);
    } else if (!disabled) {
      openAtom(ctx, true);
      focusAtom(ctx, true);
      inputRef.current?.focus();
    }
  });

  useKeysRef({
    keys: keys as unknown as KeyHandlers,
    ref: inputRef,
    isActive: useAction((ctx) => !ctx.get(disabledAtom)),
  });

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [
      dropdownRef,
      controlRef,
      ...(ignoreOutsideClicksRefs || []),
    ],
    handler: useAction((ctx) => {
      openAtom(ctx, false);
      focusAtom(ctx, false);
    }),
  });

  useUpdate((ctx, disable) => disable && openAtom(ctx, false), [disabledAtom]);

  useUpdate(
    (ctx, open = false) => {
      ctx.get(propsAtom).onDropdownOpen?.(open);
      highlightIndex(0);
    },
    [openAtom],
  );

  useUpdate(
    (ctx, inputValueProp = '') => {
      const inputValue = ctx.get(inputValueAtom);

      if (inputValueProp !== inputValue) {
        onInput(inputValueProp);
      }
    },
    [inputValuePropAtom],
  );

  useUpdate(
    (ctx, dropdownOpenProp = false) => openAtom(ctx, dropdownOpenProp),
    [dropdownOpenPropAtom],
  );

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
