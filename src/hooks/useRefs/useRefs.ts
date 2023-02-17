import { createRef, useMemo } from 'react';

const isNotNumber = <T>(value: T): value is Exclude<T, number> =>
  typeof value !== 'number';

type Return<T, E extends number | string[]> = E extends string[]
  ? Record<E[number], React.RefObject<T>>
  : Array<React.RefObject<T>>;

export const useRefs = <T, E extends number | string[] = number>(
  elements: E,
  deps: unknown[] = [],
): Return<T, E> =>
  useMemo(() => {
    if (isNotNumber(elements)) {
      const obj: Record<string, React.RefObject<T>> = {};
      for (let index = 0; index < elements.length; index++) {
        obj[elements[index]] = createRef<T>();
      }

      return obj as Return<T, E>;
    }

    return new Array(elements as number)
      .fill(null)
      .map(() => createRef<T>()) as unknown as Return<T, E>;
  }, [typeof elements === 'number' ? elements : elements.join('-'), ...deps]);
