import { action, AtomLike } from '@reatom/core';

import { named } from '##/utils/state/generateAtomName';

type PropCallbackResult<T, K extends keyof T> =
  NonNullable<T[K]> extends (...args: infer A) => infer R
    ? (...args: A) => R | undefined
    : NonNullable<T[K]> | undefined;

type PropCallbackTuple<T, K extends readonly (keyof T)[]> = {
  [I in keyof K]: K[I] extends keyof T ? PropCallbackResult<T, K[I]> : never;
};

const propCallback = <T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  key: K,
  name?: string,
) =>
  action((...args) => {
    const fn = propsAtom()[key];
    if (typeof fn === 'function') {
      fn(...args);
    }
  }, name) as unknown as PropCallbackResult<T, K>;

// Перегрузка 1: одиночный ключ -> T[K]
export function propAction<T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  key: K,
  name?: string,
): PropCallbackResult<T, K>;

// Перегрузка 2: кортеж ключей -> кортеж T[K1], T[K2], ...
export function propAction<T extends {}, K extends readonly (keyof T)[]>(
  propsAtom: AtomLike<T>,
  key: readonly [...K],
  name?: string,
): PropCallbackTuple<T, K>;

// Реализация (сигнатура здесь может быть широкой)
export function propAction<T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  key: K[] | K,
  name?: string,
) {
  const n = named(name, 'propAction');

  if (Array.isArray(key)) {
    return key.map((k) => propCallback(propsAtom, k, n(k as string)));
  }
  return propCallback(propsAtom, key, n(key as string));
}
