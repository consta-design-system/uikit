import React from 'react';
import computeScrollIntoView from 'compute-scroll-into-view';

export type KeyHandler = () => (prop: {}, e: React.KeyboardEvent) => void;

export type KeyProps = {
  onKeyDown?(e: React.KeyboardEvent): void;
  onChange(e: React.SyntheticEvent<HTMLButtonElement>): void;
  onFocus(e: React.FocusEvent<HTMLButtonElement>): void;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  onBlur(e: React.FocusEvent<HTMLButtonElement>): void;
};

export type UserKeysProps = {
  [key: string]: (
    prop: { keyCode: number; key: string; shift: boolean; meta: boolean },
    e: React.KeyboardEvent<Element>,
  ) => void;
};

export const useKeys = (userKeys: UserKeysProps) => {
  return ({ onKeyDown, ...rest }: KeyProps): KeyProps => {
    return {
      ...rest,
      onKeyDown: (e: React.KeyboardEvent): void => {
        const { keyCode, key, shiftKey: shift, metaKey: meta } = e;
        const handler = userKeys[key] || userKeys[keyCode];
        if (typeof handler === 'function') {
          handler(
            {
              keyCode,
              key,
              shift,
              meta,
            },
            e,
          );
        }
        if (typeof onKeyDown === 'function') {
          onKeyDown(e);
        }
      },
    };
  };
};

export function useClickOutsideRef(
  enable: boolean,
  fn: (e: React.SyntheticEvent) => void,
  userRef: React.MutableRefObject<HTMLDivElement | null>,
): void {
  const localRef = React.useRef();
  const fnRef = React.useRef<(e: React.SyntheticEvent) => void>();

  fnRef.current = fn;
  const elRef = userRef || localRef;

  const handle = React.useCallback(
    (e) => {
      const isTouch = e.type === 'touchstart';
      if (e.type === 'click' && isTouch) {
        return;
      }
      const el = elRef.current;
      if (el && !el.contains(e.target) && fnRef.current) fnRef.current(e);
    },
    [elRef],
  );

  React.useEffect(() => {
    if (enable) {
      document.addEventListener('touchstart', handle, true);
      document.addEventListener('click', handle, true);
    }

    return (): void => {
      document.removeEventListener('touchstart', handle, true);
      document.removeEventListener('click', handle, true);
    };
  }, [enable, handle]);
}

export function scrollIntoView(node: HTMLDivElement, menuNode: HTMLDivElement): void {
  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  });
  actions.forEach((action) => {
    const { el, top, left } = action;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}

export function usePrevious<T>(value: T): T {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
