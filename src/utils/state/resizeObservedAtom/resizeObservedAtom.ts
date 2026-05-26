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

export const resizeObservedAtom = <
  ELEMENT extends HTMLElement | null,
  RETURN_TYPE,
  SUBSCRIBERS extends ELEMENT[] | ELEMENT,
>(
  subscribersAtom: AtomLike<SUBSCRIBERS>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
) => {
  const localStateAtom = atom<RETURN_TYPE[]>([]);

  const elementsAtom = computed(() => {
    const elements = subscribersAtom();
    return (Array.isArray(elements) ? elements : [elements]) as ELEMENT[];
  });

  const updateAction = action(() => {
    localStateAtom.set(elementsAtom().map(mapper));
  });

  const resizeObserverAtom = atom(() => new ResizeObserver(wrap(updateAction)));

  effect(() => {
    const resizeObserver = resizeObserverAtom();
    const elements = elementsAtom();
    updateAction();

    for (const el of elements) {
      el && resizeObserver.observe(el);
    }
  });

  abortVar.subscribe(() => peek(resizeObserverAtom).disconnect());

  return computed(() => {
    const state = localStateAtom();

    const subscribers = subscribersAtom();
    return (
      Array.isArray(subscribers) ? state : state[0]
    ) as SUBSCRIBERS extends ELEMENT[] ? RETURN_TYPE[] : RETURN_TYPE;
  });
};
