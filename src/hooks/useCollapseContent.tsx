import React, { useState } from 'react';
import { UnmountClosed as CollapseComponent } from 'react-collapse';

export const useCollapseContent = ({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) => {
  const [isOpened, setIsOpened] = useState(defaultOpen);
  const clickHandler = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    onClick: clickHandler,
    content: (
      <CollapseComponent isOpened={isOpened} theme={{ content: 'ReactCollapse--content' }}>
        {children}
      </CollapseComponent>
    ),
  };
};
