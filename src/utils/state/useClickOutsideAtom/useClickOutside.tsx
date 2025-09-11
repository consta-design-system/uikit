import { AtomMut } from '@reatom/core';
import { useAction } from '@reatom/npm-react';
import { useEffect } from 'react';

import { useSendToAtom } from '##/utils/state/useSendToAtom';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type UseClickOutsideProps = {
  isActiveAtom?: AtomMut<boolean>;
  ignoreClicksElementsAtom?: AtomMut<(HTMLElement | null)[]>;
  handler?: ClickOutsideHandler;
};

export const useClickOutsideAtom = ({
  isActiveAtom,
  ignoreClicksElementsAtom,
  handler,
}: UseClickOutsideProps) => {
  const handlerAtom = useSendToAtom([handler]);

  const fn = useAction((ctx, e: MouseEvent) => {
    const isActive = isActiveAtom && ctx.get(isActiveAtom);
    const ignoreClicksElements =
      ignoreClicksElementsAtom && ctx.get(ignoreClicksElementsAtom);
    const handler = ctx.get(handlerAtom)[0];
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
