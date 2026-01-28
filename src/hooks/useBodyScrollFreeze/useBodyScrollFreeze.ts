import { useEffect } from 'react';

import { cn } from '##/utils/bem';

export const cnBodyScrollFreeze = cn('BodyScrollFreeze');
export const SCROLLBAR_WIDTH_VAR = '--body-scroll-freeze-scrollbar-width';

const isClassName = (element: HTMLElement, className: string) => {
  return element.classList.contains(className);
};

const addClassName = (element: HTMLElement, className: string) => {
  if (!isClassName(element, className)) {
    element.classList.add(className);
  }
};

const removeClassName = (element: HTMLElement, className: string) => {
  if (isClassName(element, className)) {
    element.classList.remove(className);
  }
};

const addCssVariable = (variableName: string, value: string) => {
  document.documentElement.style.setProperty(variableName, value);
};

const removeCssVariable = (variableName: string) => {
  document.documentElement.style.removeProperty(variableName);
};

const getScrollBarWidth = () =>
  typeof window !== 'undefined'
    ? window.innerWidth - document.documentElement.clientWidth
    : 0;

const bodyAddStyles = () => {
  const scrollBarWidth = getScrollBarWidth();

  addCssVariable(SCROLLBAR_WIDTH_VAR, `${scrollBarWidth}px`);

  addClassName(document.documentElement, cnBodyScrollFreeze());
};

const bodyRemoveStyles = () => {
  removeClassName(document.documentElement, cnBodyScrollFreeze());

  removeCssVariable(SCROLLBAR_WIDTH_VAR);
};

export const useBodyScrollFreeze = (isActive: boolean): void => {
  useEffect(() => {
    if (!isActive) return;
    if (typeof window === 'undefined') return;

    bodyAddStyles();

    return bodyRemoveStyles;
  }, [isActive]);
};
