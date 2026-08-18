import {
  abortVar,
  action,
  atom,
  AtomLike,
  computed,
  effect,
  peek,
  wrap,
} from '@reatom/core';

import { named } from '##/utils/state/generateAtomName';

export const resizeObservedAtom = <
  ELEMENT extends HTMLElement | null,
  RETURN_TYPE,
  SUBSCRIBERS extends ELEMENT[] | ELEMENT,
>(
  subscribersAtom: AtomLike<SUBSCRIBERS>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
  name?: string,
) => {
  const n = named(name, 'resizeObservedAtom');

  const localStateAtom = atom<RETURN_TYPE[]>([], n('localStateAtom'));

  const elementsAtom = computed(() => {
    const elements = subscribersAtom();
    return (Array.isArray(elements) ? elements : [elements]) as ELEMENT[];
  }, n('elementsAtom'));

  const updateAction = action(() => {
    localStateAtom.set(elementsAtom().map(mapper));
  }, n('updateAction'));

  const resizeObserverAtom = atom(
    () => new ResizeObserver(wrap(updateAction)),
    n('resizeObserverAtom'),
  );

  effect(() => {
    const resizeObserver = resizeObserverAtom();

    const elements = elementsAtom();
    updateAction();

    for (const el of elements) {
      el && resizeObserver.observe(el);
    }
  }, n('effect'));

  abortVar.subscribe(() => peek(resizeObserverAtom).disconnect());

  return computed(() => {
    const state = localStateAtom();

    const subscribers = subscribersAtom();
    return (
      Array.isArray(subscribers) ? state : state[0]
    ) as SUBSCRIBERS extends ELEMENT[] ? RETURN_TYPE[] : RETURN_TYPE;
  }, n());
};
