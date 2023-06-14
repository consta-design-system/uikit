import { useNumber, useSelect, useText } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button/Button';

import { directions } from '../../Popover/Popover';
import {
  Tooltip,
  tooltipPropSizes,
  tooltipPropSizesDefault,
  tooltipPropStatus,
} from '../Tooltip';

const Variants = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const size = useSelect('size', tooltipPropSizes, tooltipPropSizesDefault);
  const direction = useSelect('direction', directions, 'upCenter');
  const spareDirection = useSelect(
    'spareDirection',
    directions,
    'downStartLeft',
  );

  const status = useSelect('status', tooltipPropStatus);

  const children = useText('children', 'Текст тултипа');
  const offset = useNumber('offset', 0);

  const handleClickOnAnchor = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <>
      <Button
        label="Нажми меня"
        type="button"
        onClick={handleClickOnAnchor}
        ref={anchorRef}
      />
      {isTooltipVisible && (
        <Tooltip
          size={size}
          anchorRef={anchorRef}
          direction={direction}
          spareDirection={spareDirection}
          status={status}
          offset={offset}
        >
          {children}
        </Tooltip>
      )}
    </>
  );
};

export default Variants;
