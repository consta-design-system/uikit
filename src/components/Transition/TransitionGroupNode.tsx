import { action, atom, computed, effect, peek } from '@reatom/core';
import React, { memo } from 'react';

import { factoryComponent } from '##/utils/state';

export type TransitionGroupNodeProps = {
  children: React.ReactNode;
};

type ItemStatus = 'entering' | 'entered' | 'exiting';

type Item = {
  status: ItemStatus;
  node: React.ReactNode;
};

type ItemsMap = Record<string, Item>;

type TransitionGroupNodeItemProps = {
  node: React.ReactNode;
  index: number;
  in: boolean;
  handleEntered: (key: React.Key) => void;
  handleExited: (key: React.Key) => void;
  id: string;
};

const TransitionGroupNodeItem = memo(
  ({
    node,
    index,
    in: inProp,
    handleEntered,
    handleExited,
    id,
  }: TransitionGroupNodeItemProps) => {
    if (!React.isValidElement(node)) {
      return node;
    }

    return React.cloneElement(node, {
      ...node.props,
      in: inProp,
      index,
      onEntered: () => handleEntered(id),
      onExited: () => handleExited(id),
      firstStatusAnimate: true,
    });
  },
);

const TransitionGroupNodeInner = factoryComponent<
  HTMLElement,
  TransitionGroupNodeProps
>((_, propsAtom) => {
  const items = atom<ItemsMap>({});
  const itemsKeysHash = computed(() => {
    const props = propsAtom();

    const nodes = React.Children.toArray(props.children);

    if (nodes.length === 0) {
      return 'notArray';
    }

    return nodes
      ?.map((node) => {
        if (React.isValidElement(node)) {
          return node.key ?? String(node.props?.index ?? '');
        }
        return String(node);
      })
      .join('---');
  });

  const processItems = action(() => {
    const props = peek(propsAtom);
    const currentItems = peek(items);
    const currentKeys = new Set(Object.keys(currentItems));
    const newKeys = new Set<string>();

    const nodes = React.Children.toArray(props.children);

    // Собираем новые ключи
    nodes.forEach((node, index) => {
      const key = String(
        React.isValidElement(node)
          ? (node.key ?? node.props?.index ?? index)
          : index,
      );
      newKeys.add(key);
    });

    const nextItems: ItemsMap = {};

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
    nodes.forEach((node, index) => {
      const key = String(
        React.isValidElement(node)
          ? (node.key ?? node.props?.index ?? index)
          : index,
      );
      if (!currentKeys.has(key)) {
        nextItems[key] = {
          status: 'entering',
          node,
        };
      } else {
        // Обновляем node для существующих
        nextItems[key] = {
          ...nextItems[key],
          node,
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

  // Следим за изменением items
  effect(() => {
    itemsKeysHash();
    processItems();
  });

  return () =>
    Object.entries(items()).map(([key, entry], index) => {
      return (
        <TransitionGroupNodeItem
          key={key}
          id={key}
          node={entry.node}
          index={index}
          in={entry.status !== 'exiting'}
          handleEntered={handleEntered}
          handleExited={handleExited}
        />
      );
    });
});

export const TransitionGroupNode = TransitionGroupNodeInner as (
  props: TransitionGroupNodeProps,
) => React.ReactElement;
