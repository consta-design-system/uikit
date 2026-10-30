import { AtomLike } from '@reatom/core';
import { useAction } from '@reatom/react';
import { useEffect } from 'react';

export type UseClickOutsideHandler = (event: MouseEvent) => void;

type UseClickOutsideProps = {
  isActiveAtom?: AtomLike<boolean>;
  ignoreClicksElementsAtom?: AtomLike<(HTMLElement | null)[]>;
  handler?: UseClickOutsideHandler;
};

export const useClickOutsideAtom = ({
  isActiveAtom,
  ignoreClicksElementsAtom,
  handler,
}: UseClickOutsideProps) => {
  const fn = useAction((e: MouseEvent) => {
    const isActive = isActiveAtom && isActiveAtom();
    const ignoreClicksElements =
      ignoreClicksElementsAtom && ignoreClicksElementsAtom();

    isActive &&
      handler &&
      ignoreClicksElements?.length &&
      ignoreClicksElements.every((el) => !el?.contains(e.target as Node)) &&
      handler(e);
  });

  useEffect(() => {
    document.addEventListener('mousedown', fn);

    return () => {
      document.removeEventListener('mousedown', fn);
    };
  }, []);
};
