import { useClickOutside } from '@consta/uikit/useClickOutside';
import { action, AtomMut, sleep, withConcurrency } from '@reatom/framework';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { useEffect, useRef } from 'react';

import { KeyHandlers } from '##/hooks/useKeysRef';
import { useRefs } from '##/hooks/useRefs';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import { getGroups, GetGroupsResult } from '##/utils/getGroups';
import { setRef } from '##/utils/setRef';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { usePickAtom, usePropAtom } from '##/utils/state/usePickAtom';

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
  propsAtom: AtomMut<PropsWithDefault<ITEM, GROUP, MULTIPLE>>;
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

const useEventListener = <TYPE extends keyof DocumentEventMap>(
  type: TYPE,
  ref: React.RefObject<HTMLElement>,
  callback: (event: Event) => void,
) => {
  useEffect(() => {
    ref.current?.addEventListener(type, callback);
    return () => {
      ref.current?.removeEventListener(type, callback);
    };
  }, [ref, callback, type]);
};

export const useFlatSelect = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectItemDefault,
  MULTIPLE extends boolean = false,
>({
  propsAtom,
}: UseFlatSelectProps<ITEM, GROUP, MULTIPLE>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const anchorRefAtom = usePropAtom(propsAtom, 'anchorRef');

  const rootFocusAtom = useCreateAtom(false);

  const rootMouseDownAtom = useCreateAtom(false);

  const itemsAtom = usePropAtom(propsAtom, 'items');
  const selectAllAtom = usePropAtom(propsAtom, 'selectAll');
  const valuePropAtom = usePropAtom(propsAtom, 'value');
  const disabledAtom = usePropAtom(propsAtom, 'disabled');
  const inputValuePropAtom = usePropAtom(propsAtom, 'inputValue');
  const openPropAtom = usePropAtom(propsAtom, 'open');

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
  const inputFocusAtom = useCreateAtom(false);
  const openAtom = useCreateAtom(false);
  const highlightedIndexAtom = useCreateAtom(-1);
  const inputValueAtom = useCreateAtom('');

  const clearButtonAtom = useCreateAtom((ctx) => {
    const { clearButton } = ctx.spy(propsAtom);
    const inputValue = ctx.spy(inputValueAtom);
    const value = ctx.spy(valueAtom);
    return !!(clearButton && (value?.length || inputValue));
  });

  const setRootFocus = useAction(
    action(async (ctx, value: boolean) => {
      await ctx.schedule(() => sleep(5));
      rootFocusAtom(ctx, value);
    }).pipe(withConcurrency()),
  );
  const handleRootMouseDown = useAction(
    (ctx, e: React.MouseEvent<HTMLDivElement>) => {
      ctx.get(propsAtom).onMouseDown?.(e);
      rootMouseDownAtom(ctx, true);
    },
  );
  const handleRootMouseUp = useAction(
    (ctx, e: React.MouseEvent<HTMLDivElement>) => {
      ctx.get(propsAtom).onMouseUp?.(e);
      rootMouseDownAtom(ctx, false);
    },
  );
  const handleRootFocus = useAction(
    (ctx, e: React.FocusEvent<HTMLDivElement>) => {
      console.log('handleRootFocus', e);
      ctx.get(propsAtom).onFocus?.(e);
      setRootFocus(true);
    },
  );
  const handleRootBlur = useAction(
    (ctx, e: React.FocusEvent<HTMLDivElement>) => {
      ctx.get(propsAtom).onBlur?.(e);
      setRootFocus(false);
    },
  );
  const onInput = useAction((ctx, value: string | undefined = '') => {
    ctx.get(propsAtom).onInput?.(value);
    inputValueAtom(ctx, value);

    if (inputRef.current) {
      inputRef.current.value = value;
    }
  });

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
    const { getItemDisabled } = ctx.get(propsAtom);

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
    const listElement = listRef.current;

    if (items.length > 0 && listElement) {
      scrollToIndex(highlightedIndex, listElement, optionsRefs);
    }
  });

  const highlightIndex = useAction(
    (ctx, indexForHighlight: IndexForHighlight) => {
      if (ctx.get(disabledAtom)) {
        return;
      }

      highlightedIndexAtom(ctx, (state) => {
        const newIndex = Math.min(
          Math.max(
            0,
            typeof indexForHighlight === 'function'
              ? indexForHighlight(state)
              : indexForHighlight,
          ),
          ctx.get(maxHighlightIndexAtom) - 1,
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
      (onChange as FlatSelectPropOnChange<ITEM, true>)(val, { e });
    } else {
      (onChange as FlatSelectPropOnChange<ITEM, false>)(item, { e });
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
          (onChange as FlatSelectPropOnChange<ITEM, true>)(withoutGroupValues, {
            e,
          });
        } else {
          const val = [...withoutGroupValues, ...nonDisabledItems];
          (onChange as FlatSelectPropOnChange<ITEM, true>)(val, {
            e,
          });
        }
      }
    },
  );

  const onCreate = useAction((ctx, e: React.SyntheticEvent) => {
    const { onCreate } = ctx.get(propsAtom);
    onCreate?.(ctx.get(inputValueAtom), { e });
    onInput('');
  });

  const createButtonOnMouseEnter = useAction((ctx) =>
    highlightedIndexAtom(ctx, 0),
  );
  // Handlers

  const handleInputChange = useAction(
    (ctx, e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!ctx.get(disabledAtom) && ctx.get(propsAtom).input) {
        onInput?.(e.target.value);
      }
    },
  );

  const clearValue = useAction(() => onInput(''));

  const getHandleRemoveValue = useAction(
    (_, item: ITEM) => (e: React.SyntheticEvent) => removeValue(e, item),
  );

  // Prop Getters

  const ArrowUp = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ctx.get(disabledAtom)) {
      highlightIndex((old) => old - 1);
      scrollToHighlightedIndex();
    }
  });

  const ArrowDown = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ctx.get(disabledAtom)) {
      highlightIndex((old) => old + 1);
      scrollToHighlightedIndex();
    }
  });

  const Enter = useAction((ctx, e: React.SyntheticEvent) => {
    const { items } = ctx.get(propsAtom);
    const highlightedIndex = ctx.get(highlightedIndexAtom);
    const inputValue = ctx.get(inputValueAtom);
    const visibleItems = ctx.get(visibleItemsAtom);
    // const open = ctx.get(openAtom);

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
  });

  const Escape = useAction((ctx, e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAtom(ctx, false);

    anchorRef.current?.focus();
  });

  const Tab = useAction((ctx, e: KeyboardEvent) => {
    if (ctx.get(propsAtom).input && !ctx.get(inputFocusAtom)) {
      return;
    }
    if (ctx.get(openAtom)) {
      e.preventDefault();
      e.stopPropagation();
      openAtom(ctx, false);
    }

    anchorRef.current?.focus();
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
    (ctx, { index, item }: OptionProps<ITEM>): GetOptionPropsResult => {
      if (isOptionForCreate(item)) {
        return {
          onClick: (e) => {
            onCreate(e);
            highlightIndex(index);
          },
          onMouseEnter: () => ctx.get(rootFocusAtom) && highlightIndex(index),
        };
      }
      if (isOptionForSelectAll(item)) {
        const getItems = (): ITEM[] => {
          const visibleItems = ctx.get(visibleItemsAtom);
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
          onMouseEnter: () => ctx.get(rootFocusAtom) && highlightIndex(index),
        };
      }

      return {
        onClick: (e: React.SyntheticEvent) => {
          highlightIndex(index);
          onChange(e, item);
        },
        onMouseEnter: () => ctx.get(rootFocusAtom) && highlightIndex(index),
      };
    },
  );

  const handleInputFocus = useAction(
    (ctx, e: React.FocusEvent<HTMLInputElement>): void => {
      const { disabled, onInputFocus } = ctx.get(propsAtom);
      const focused = ctx.get(inputFocusAtom);

      if (!disabled) {
        if (!focused) {
          inputFocusAtom(ctx, true);
        }
        onInputFocus?.(e);
      }
    },
  );

  const handleInputBlur = useAction(
    (ctx, e: React.FocusEvent<HTMLInputElement>): void => {
      if (ctx.get(inputFocusAtom)) {
        inputFocusAtom(ctx, false);
      }

      ctx.get(propsAtom).onInputBlur?.(e);
    },
  );

  const useKeysRefPropsAtom = useCreateAtom((ctx) => {
    const keys = ctx.spy(keysAtom);

    return {
      keys: keys as unknown as KeyHandlers,
      ref: rootRef,
      isActive: () => {
        if (ctx.get(propsAtom).anchorRef?.current && ctx.get(openAtom)) {
          return true;
        }
        return !ctx.get(disabledAtom);
      },
    };
  });

  useClickOutside({
    isActive: useAction((ctx) => ctx.get(openAtom)),
    ignoreClicksInsideRefs: [
      rootRef,
      anchorRef,
      ...(ignoreOutsideClicksRefs || []),
    ],
    handler: useAction((ctx) => {
      openAtom(ctx, false);
    }),
  });

  useUpdate(
    (ctx, focus) => {
      if (
        focus &&
        !ctx.get(rootMouseDownAtom) &&
        ctx.get(highlightedIndexAtom) === -1
      ) {
        highlightedIndexAtom(ctx, 0);
      }
      if (!focus) {
        highlightedIndexAtom(ctx, -1);
      }
    },
    [rootFocusAtom],
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

  useUpdate((ctx, openProp = false) => openAtom(ctx, openProp), [openPropAtom]);

  useUpdate((ctx) => highlightedIndexAtom(ctx, -1), [visibleItemsAtom]);

  useUpdate(
    (ctx, disabledAtom) => disabledAtom && highlightedIndexAtom(ctx, -1),
    [disabledAtom],
  );

  useUpdate((ctx, ref) => setRef(anchorRef, ref?.current), [anchorRefAtom]);

  const handleAnchorClick = useAction((ctx) =>
    openAtom(ctx, !ctx.get(openAtom)),
  );

  useEventListener('click', anchorRef, handleAnchorClick);

  useUpdate(
    async (ctx, value) => {
      await sleep(animateTimeout);
      if (!value) {
        onInput('');
        inputFocusAtom(ctx, false);
        rootFocusAtom(ctx, false);
        return;
      }
      if (value) {
        rootRef.current?.focus();
      }
    },
    [openAtom],
  );

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
    createButtonOnMouseEnter,
    handleRootFocus,
    handleRootBlur,
    handleRootMouseDown,
    handleRootMouseUp,
    useKeysRefPropsAtom,
  };
};
