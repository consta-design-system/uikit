import { action, AtomLike } from '@reatom/core';

type PropCallbackResult<T, K extends keyof T> =
  NonNullable<T[K]> extends (...args: infer A) => infer R
    ? (...args: A) => R | undefined
    : NonNullable<T[K]> | undefined;

type PropCallbackTuple<T, K extends readonly (keyof T)[]> = {
  [I in keyof K]: K[I] extends keyof T ? PropCallbackResult<T, K[I]> : never;
};

const propCallback = <T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  name: K,
) =>
  action((...args) => {
    const fn = propsAtom()[name];
    if (typeof fn === 'function') {
      fn(...args);
    }
  }) as unknown as PropCallbackResult<T, K>;

// Перегрузка 1: одиночный ключ -> T[K]
export function propAction<T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  name: K,
): PropCallbackResult<T, K>;

// Перегрузка 2: кортеж ключей -> кортеж T[K1], T[K2], ...
export function propAction<T extends {}, K extends readonly (keyof T)[]>(
  propsAtom: AtomLike<T>,
  name: readonly [...K],
): PropCallbackTuple<T, K>;

// Реализация (сигнатура здесь может быть широкой)
export function propAction<T extends {}, K extends keyof T>(
  propsAtom: AtomLike<T>,
  name: K[] | K,
) {
  if (Array.isArray(name)) {
    return name.map((n) => propCallback(propsAtom, n));
  }
  return propCallback(propsAtom, name);
}
