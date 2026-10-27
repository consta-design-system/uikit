import React from 'react';

export type UseResizableContentPropDirection = 'vertical' | 'horizontal';

export type UseResizableContentRef = {
  ref: React.RefObject<HTMLElement | null>;
  maxHeight?: number;
  minHeight?: number;
  maxWidth?: number;
  minWidth?: number;
};

export type UseResizableContentSize = { width?: number; height?: number };

type UseResizableContentProps = {
  blocks: Array<UseResizableContentRef | React.RefObject<HTMLElement | null>>;
  direction?: UseResizableContentPropDirection;
  container: React.RefObject<HTMLElement | null>;
  isActive?: boolean;
};

export type UseResizableContent = (props: UseResizableContentProps) => {
  handlers: Array<{
    onMouseDown: React.MouseEventHandler;
    onTouchStart: React.TouchEventHandler;
  }>;
  sizes: UseResizableContentSize[];
};
