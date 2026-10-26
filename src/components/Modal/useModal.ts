import { useAction, useAtom } from '@reatom/react';
import React, { useEffect, useRef } from 'react';

import { useTheme } from '##/components/Theme';
import { useForkRef } from '##/hooks/useForkRef';
import { useGlobalKeys } from '##/hooks/useGlobalKeys';
import { getElementHeight } from '##/hooks/useResizeObserved';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useElementAtomEventListener } from '##/utils/state/useElementAtomEventListener';
import { useRefAtom } from '##/utils/state/useRefAtom';
import { useResizeObservedAtom } from '##/utils/state/useResizeObservedAtom';

export const useModal = ({
  ref,
  isOpen,
  onEsc,
  onOpen,
  onClose,
  ignoreOutsideClicksRefs,
}: {
  isOpen: boolean | undefined;
  onEsc: ((event: KeyboardEvent) => void) | undefined;
  onOpen: (() => void) | undefined;
  onClose: (() => void) | undefined;
  ref: React.ForwardedRef<HTMLDivElement>;
  ignoreOutsideClicksRefs: React.RefObject<HTMLElement>[] | undefined;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [windowElAtom, windowRefCallback] = useRefAtom<HTMLDivElement>();
  const [contentElAtom, contentRefCallback] = useRefAtom<HTMLDivElement>();
  const [scrollElAtom, scrollRefCallback] = useRefAtom<HTMLDivElement>();
  const modalRefForked = useForkRef([modalRef, windowRefCallback, ref]);

  const { theme } = useTheme();

  const scrollTopAtom = useCreateAtom<number>(0);
  const updateScrollTop = useAction(() =>
    scrollTopAtom.set(scrollElAtom()?.scrollTop || 0),
  );

  const [shadowHeader] = useAtom<boolean>(() => scrollTopAtom() > 0);
  const elScrollDimensionsAtom = useResizeObservedAtom(
    useCreateAtom(() => [scrollElAtom()]),
    (el) => [el?.scrollHeight || 0, el?.clientHeight || 0] as const,
  );

  const [shadowFooter] = useAtom<boolean>(() => {
    const scrollTop = scrollTopAtom();
    const [[scrollHeight, clientHeight] = [0, 0]] = elScrollDimensionsAtom();

    return scrollTop < scrollHeight - clientHeight;
  });

  const heightAtom = useResizeObservedAtom(
    useCreateAtom(() => [windowElAtom(), contentElAtom()]),
    getElementHeight,
  );

  const [scrollable] = useAtom(() => {
    const [modalHeight = 0, contentHeight = 0] = heightAtom();
    return modalHeight < contentHeight;
  });

  useElementAtomEventListener(scrollElAtom, 'scroll', updateScrollTop);

  useEffect(() => {
    const unsubscribe = scrollElAtom.subscribe(updateScrollTop);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  useGlobalKeys({
    Escape: (e: KeyboardEvent) => isOpen && onEsc && onEsc(e),
  });

  return {
    shadowHeader,
    shadowFooter,
    scrollable,
    theme,
    portalRef,
    windowRef: modalRefForked,
    contentRef: contentRefCallback,
    scrollRef: scrollRefCallback,
    windowElAtom,
    ignoreOutsideClicksRefs: [...(ignoreOutsideClicksRefs || []), modalRef],
  };
};
