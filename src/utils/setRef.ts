import { LegacyRef, MutableRefObject } from 'react';

export function setRef<T>(ref: LegacyRef<T> | undefined, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    (ref as MutableRefObject<T>).current = value;
  }
  // Игнорируем строковые ref (устаревшие)
}
