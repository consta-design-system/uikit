import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { Tooltip } from '##/components/Tooltip';
import { useHover } from '##/hooks/useHover';

export const UseHoverExample = () => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useHover({
    isActive: true,
    refs: [buttonRef, tooltipRef],
    onHover: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  });

  return (
    <Example>
      <Button ref={buttonRef} label="Наведи на меня" />
      <Tooltip isOpen={isHovered} ref={tooltipRef} anchorRef={buttonRef}>
        Я появился
      </Tooltip>
    </Example>
  );
};
