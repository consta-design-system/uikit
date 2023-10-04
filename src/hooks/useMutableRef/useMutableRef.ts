import { useRef } from 'react';

export const useMutableRef = <T>(value: T) => {
  const ref = useRef(value);

  ref.current = value;

  return ref;
};
