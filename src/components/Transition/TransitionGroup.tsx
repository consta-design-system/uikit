import { action, atom, computed, effect, peek } from '@reatom/core';
import React, { memo } from 'react';

import { factoryComponent } from '##/utils/state';

import { Transition, TransitionProps, TransitionStatus } from './Transition';

export type RenderItem<T> = (
  item: T,
  animate: TransitionStatus,
) => React.ReactNode;

export type TransitionGroupProps<T> = {
  children?: never;
  items: T[];
  renderItem: RenderItem<T>;
  getItemKey: (item: T) => React.Key;
  timeout?: TransitionProps['timeout'];
  unmountOnExit?: boolean;
};

type ItemStatus = 'entering' | 'entered' | 'exiting';

type Item<T> = {
  status: ItemStatus;
  item: T;
};

type ItemsMap<T> = Record<string, Item<T>>;

type TransitionGroupItemProps = {
  item: unknown;
  in: boolean;
  renderItem: RenderItem<unknown>;
  handleEntered: (key: React.Key) => void;
  timeout?: TransitionProps['timeout'];
  handleExited: (key: React.Key) => void;
  id: string;
  unmountOnExit?: boolean;
};

const TransitionGroupItem = memo(
  ({
    item,
    in: inProp,
    renderItem,
    handleEntered,
    timeout = 0,
    handleExited,
    id,
    unmountOnExit,
  }: TransitionGroupItemProps) => {
    return (
      <Transition
        in={inProp}
        timeout={timeout}
        unmountOnExit={unmountOnExit}
        onEntered={() => handleEntered(id)}
        onExited={() => handleExited(id)}
        animateOnMount
      >
        {(animate) => renderItem(item, animate)}
      </Transition>
    );
  },
);

const TransitionGroupInner = factoryComponent<
  HTMLElement,
  TransitionGroupProps<unknown>
>((_, propsAtom) => {
  const items = atom<ItemsMap<unknown>>({});
  const itemsKeysHash = computed(() => {
    const props = propsAtom();

    if (!Array.isArray(props.items) || props.items.length === 0) {
      return '__empty-array';
    }

    return props.items?.map((item) => props.getItemKey?.(item)).join('---');
  });

  // отслеживает изменение содержимого items (новую ссылку массива),
  // чтобы обновлять item у существующих ключей без повторной анимации
  const itemsContentHash = computed(() => propsAtom().items);

  const processItems = action(() => {
    const props = peek(propsAtom);
    const currentItems = peek(items);
    const currentKeys = new Set(Object.keys(currentItems));
    const newKeys = new Set<string>();

    // Собираем новые ключи
    props.items?.forEach((item) => {
      newKeys.add(String(props.getItemKey?.(item)));
    });

    const nextItems: ItemsMap<unknown> = {};

    // Обрабатываем текущие элементы
    for (const [key, entry] of Object.entries(currentItems)) {
      if (newKeys.has(key)) {
        // Элемент всё ещё есть — оставляем как есть
        nextItems[key] = entry;
      } else if (entry.status !== 'exiting') {
        // Элемент удалён — начинаем exit
        nextItems[key] = {
          ...entry,
          status: 'exiting',
        };
      }
      // Если уже exiting — оставляем, он удалится после анимации
    }

    // Добавляем новые элементы
    props.items?.forEach((item) => {
      const key = String(props.getItemKey(item));
      if (!currentKeys.has(key)) {
        nextItems[key] = {
          status: 'entering',
          item,
        };
      } else {
        // Обновляем item для существующих
        nextItems[key] = {
          ...nextItems[key],
          item,
        };
      }
    });

    items.set(nextItems);
  });

  // Обработчик завершения enter
  const handleEntered = action((key: React.Key) => {
    const currentItems = peek(items);
    const stringKey = String(key);
    const nextItems = {
      ...currentItems,
      [stringKey]: {
        ...currentItems[stringKey],
        status: 'entered' as const,
      },
    };
    items.set(nextItems);
  });

  // Обработчик завершения exit
  const handleExited = action((key: React.Key) => {
    const currentItems = peek(items);
    const nextItems = { ...currentItems };
    delete nextItems[String(key)];
    items.set(nextItems);
  });

  const renderItem = action<RenderItem<unknown>>((...arg) =>
    propsAtom().renderItem?.(...arg),
  );

  // Следим за изменением items
  effect(() => {
    itemsKeysHash();
    itemsContentHash();
    processItems();
  });

  return ({ timeout, unmountOnExit }) =>
    Object.entries(items()).map(([key, entry]) => {
      return (
        <TransitionGroupItem
          key={key}
          id={key}
          item={entry.item}
          in={entry.status !== 'exiting'}
          timeout={timeout}
          unmountOnExit={unmountOnExit}
          renderItem={renderItem}
          handleEntered={handleEntered}
          handleExited={handleExited}
        />
      );
    });
});

export const TransitionGroup = TransitionGroupInner as <T>(
  props: TransitionGroupProps<T>,
) => React.ReactElement;
