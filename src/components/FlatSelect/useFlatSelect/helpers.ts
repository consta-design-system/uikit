import React from 'react';

import { scrollIntoView } from '##/utils/scrollIntoView';

type ScrollToIndexFunctionType = (
  optionIndex: number,
  dropdownElement: HTMLDivElement | null,
  optionsRefs: React.RefObject<HTMLDivElement>[],
  onFailure?: () => void,
) => void;

export const scrollToIndex: ScrollToIndexFunctionType = (
  index,
  dropdownElement,
  optionsRefs,
  onFailure,
): void => {
  if (!dropdownElement || index < 0) {
    return;
  }

  const element = optionsRefs[index]?.current;

  if (element) {
    scrollIntoView(element, dropdownElement);
  } else {
    onFailure?.();
  }
};
