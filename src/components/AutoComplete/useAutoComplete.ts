import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { scrollToIndex } from '##/components/SelectComponents/useSelect/helpers';
import { useClickOutside } from '##/hooks/useClickOutside';
import { useFlag } from '##/hooks/useFlag';
import { KeyHandler, useKeys } from '##/hooks/useKeysDeprecated';
import { useRefs } from '##/hooks/useRefs';
import { getGroups } from '##/utils/getGroups';

type IndexForHighlight = number | ((oldIndex: number) => number);

type GetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetGroupKey<GROUP> = (item: GROUP) => string | number | undefined;

type OnChangeProp<ITEM> = (props: {
  value: ITEM | null;
  e: React.SyntheticEvent;
}) => void;

type UseAutoCompleteProps<ITEM, GROUP> = {
  getItemGroupKey?: GetItemGroupKey<ITEM> | undefined;
  getGroupKey?: GetGroupKey<GROUP>;
  groups?: GROUP[];
  items: ITEM[];
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
  getItemLabel: (item: ITEM) => string;
  getItemKey: (item: ITEM) => string | number;
  searchFunction?: (item: ITEM, searchValue: string) => boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  searchValue?: string;
  onChange: OnChangeProp<ITEM>;
  isLoading?: boolean;
  dropdownOpen?: boolean;
  onDropdownOpen?: (isOpen: boolean) => void;
  ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
};

type OptionProps<ITEM> = {
  index: number;
  item: ITEM;
  keyPrefix: number;
};

type GetOptionPropsResult = {
  onClick: (e: React.SyntheticEvent) => void;
  onMouseEnter: (e: React.SyntheticEvent) => void;
  active: boolean;
  hovered: boolean;
  key: string | number;
};

export function useAutoComplete<ITEM, GROUP>(
  params: UseAutoCompleteProps<ITEM, GROUP>,
) {
  const {
    items,
    dropdownRef,
    controlRef,
    disabled = false,
    getItemLabel,
    getItemKey,
    searchFunction,
    getItemGroupKey,
    groups,
    getGroupKey,
    onFocus,
    onBlur,
    searchValue,
    isLoading,
    dropdownOpen,
    onDropdownOpen,
    ignoreOutsideClicksRefs,
  } = params;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useFlag();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const searchFunctionDefault = (item: ITEM, searchValue: string) => {
    if (!searchValue) {
      return false;
    }
    return (
      getItemLabel(item)
        .toLocaleLowerCase()
        .indexOf(searchValue.toLocaleLowerCase()) !== -1
    );
  };

  const filteredOptions = useMemo(
    () =>
      items.filter((item) =>
        searchFunction
          ? searchFunction(item, searchValue || '')
          : searchFunctionDefault(item, searchValue || ''),
      ),
    [searchValue, items],
  );

  const visibleItems = useMemo(() => {
    const resultGroups = getGroups(
      filteredOptions,
      groups?.length ? getItemGroupKey : undefined,
      groups,
      getGroupKey,
      undefined,
    );

    return resultGroups;
  }, [filteredOptions, groups, getItemGroupKey, getGroupKey]);

  const hasItems = useMemo(() => {
    return !!visibleItems.find((group) => group.items.length > 0);
  }, [visibleItems]);

  const highlightIndex = useCallback(
    (indexForHighlight: IndexForHighlight) => {
      setHighlightedIndex(
        Math.min(
          Math.max(
            0,
            typeof indexForHighlight === 'function'
              ? indexForHighlight(highlightedIndex)
              : indexForHighlight,
          ),
          filteredOptions.length - 1,
        ),
      );
    },
    [filteredOptions, highlightedIndex],
  );

  const onChange = (e: React.SyntheticEvent, item: ITEM) => {
    if (!disabled) {
      params.onChange({ value: item, e });
    }
  };

  // Prop Getters

  const ArrowUp: KeyHandler = (_, e): void => {
    if (!disabled) {
      e.preventDefault();
      setIsOpen.on();
      highlightIndex((old) => old - 1);
    }
  };

  const ArrowDown: KeyHandler = (_, e): void => {
    if (!disabled) {
      e.preventDefault();
      setIsOpen.on();
      highlightIndex((old) => old + 1);
    }
  };

  const Enter: KeyHandler = (_, e): void => {
    if (isOpen) {
      if (searchValue || filteredOptions[highlightedIndex]) {
        e.preventDefault();
      }

      const getItem = (index: number) => {
        let counter = 0;
        for (const group of visibleItems) {
          if (group.items.length + counter > index) {
            return group.items[index - counter];
          }
          counter += group.items.length;
        }
        return undefined;
      };

      const item = getItem(highlightedIndex);

      if (item) {
        onChange(e, item);
      }
    } else {
      setIsOpen.on();
    }
  };

  const Escape: KeyHandler = (): void => {
    setIsOpen.off();
  };

  const Tab: KeyHandler = (_, e): void => {
    setIsOpen.off();
    if (isOpen && hasItems) {
      e.preventDefault();
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
  });

  const getOptionProps = ({
    index,
    item,
  }: OptionProps<ITEM>): GetOptionPropsResult => {
    const key = getItemKey(item);
    return {
      onClick: (e: React.SyntheticEvent) => {
        onChange(e, item);
      },
      onMouseEnter: () => {
        highlightIndex(index);
      },
      active: false,
      hovered: index === highlightedIndex,
      key,
    };
  };

  const optionsRefs = useRefs<HTMLDivElement>(filteredOptions.length, [isOpen]);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!disabled) {
      setIsOpen.toggle();

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

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  useClickOutside({
    isActive: isOpen,
    ignoreClicksInsideRefs: [
      dropdownRef,
      controlRef,
      ...(ignoreOutsideClicksRefs || []),
    ],
    handler: setIsOpen.off,
  });

  useEffect(() => {
    if (disabled) {
      setIsOpen.off();
      inputRef.current?.blur();
    }
  }, [disabled]);

  useEffect(() => {
    if (filteredOptions.length > 0) {
      scrollToIndex(highlightedIndex, dropdownRef, optionsRefs, () =>
        highlightIndex(0),
      );
    }
    setIsOpen.on();
  }, [highlightedIndex]);

  useEffect(() => {
    onDropdownOpen?.(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen.set(dropdownOpen || false);
  }, [dropdownOpen]);

  return {
    isOpen: Boolean(isOpen && (isLoading ? true : hasItems)),
    visibleItems,
    getOptionProps,
    handleInputFocus,
    handleInputBlur,
    inputRef,
    getKeyProps,
    hasItems,
    optionsRefs,
  };
}
