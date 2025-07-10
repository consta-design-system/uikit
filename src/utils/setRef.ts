import { MutableRefObject, Ref } from 'react';

export function setRef<T>(ref: Ref<T> | undefined, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref && 'current' in ref) {
    (ref as MutableRefObject<T>).current = value;
  }
}
