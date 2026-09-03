import { action, Atom, AtomLike, computed, peek, wrap } from '@reatom/core';
import React from 'react';

import { setRefs } from '##/utils/setRef';
import { factoryComponent } from '##/utils/state';

import { SelectItemDefault } from '../types';

type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

type SelectRenderItemProps<ITEM = SelectItemDefault> = {
  item: ITEM;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
  highlightedIndexAtom: AtomLike<number>;
  index: number;
  valueAtom: AtomLike<ITEM[]>;
  getItemKeyAtom: AtomLike<(item: ITEM) => string | number>;
  getOptionActions(props: { index: number; item: ITEM }): {
    onClick: (e: React.MouseEvent) => void;
    onMouseEnter: (e: React.MouseEvent) => void;
  };
  getItemRef: (index: number) => React.Ref<HTMLDivElement>;
  virtualIndex: number;
  listElementsAtom: AtomLike<Atom<HTMLDivElement | null>[]>;
};

export type SelectRenderItemComponent = <ITEM = SelectItemDefault>(
  props: SelectRenderItemProps<ITEM>,
) => React.ReactNode;

export const SelectRenderItem = factoryComponent<
  HTMLDivElement,
  SelectRenderItemProps<SelectItemDefault>
>(
  (
    { highlightedIndexAtom, valueAtom, getItemKeyAtom, listElementsAtom },
    propsAtom,
  ) => {
    const active = computed(() => {
      const getItemKey = peek(() => getItemKeyAtom());

      return !!valueAtom().find(
        (valueItem) => getItemKey(valueItem) === getItemKey(propsAtom().item),
      );
    });

    const hovered = computed(
      () => highlightedIndexAtom() === propsAtom().index,
    );

    const ref = action((el: HTMLDivElement | null) =>
      setRefs(
        [
          propsAtom().ref,
          listElementsAtom()[propsAtom().virtualIndex]?.set,
          propsAtom().getItemRef(propsAtom().index),
        ],
        el,
      ),
    );

    return ({ renderItem, item, getOptionActions, index }) => {
      return renderItem({
        ...getOptionActions({ index, item }),
        ref: wrap(ref),
        item,
        active: active(),
        hovered: hovered(),
      });
    };
  },
) as SelectRenderItemComponent;
