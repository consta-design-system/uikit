import './TooltipPosition.css';

import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button/Button';
import { directions, Position } from '##/components/Popover/Popover';
import { Text } from '##/components/Text/Text';
import {
  Tooltip,
  tooltipPropSizesDefault,
} from '##/components/Tooltip/Tooltip';
import { useFlag } from '##/hooks/useFlag/useFlag';
import { cn } from '##/utils/bem';

const cnTooltipPosition = cn('TooltipPosition');

export const TooltipPositionedCoords = () => {
  const [position, setPosition] = useState<Position>(undefined);

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <Example col={1}>
        <div
          className={cnTooltipPosition({ for: 'anchor' })}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(undefined)}
        >
          <Text>Область, в которой работает отслеживание мышки</Text>
        </div>
      </Example>

      <Tooltip
        direction="upCenter"
        spareDirection="downStartLeft"
        possibleDirections={directions}
        size={tooltipPropSizesDefault}
        position={position}
        isInteractive={false}
      >
        <Text size="xs">Текст тултипа</Text>
      </Tooltip>
    </>
  );
};

export const TooltipPositionedAnchor = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useFlag();

  return (
    <>
      <Example col={1}>
        <div className={cnTooltipPosition()}>
          <Button
            label="Нажми меня"
            type="button"
            onClick={setIsTooltipVisible.toggle}
            ref={anchorRef}
          />
        </div>
      </Example>
      {isTooltipVisible && (
        <Tooltip
          direction="upCenter"
          spareDirection="downStartLeft"
          possibleDirections={directions}
          size={tooltipPropSizesDefault}
          anchorRef={anchorRef}
        >
          <Text size="xs">Текст тултипа</Text>,
        </Tooltip>
      )}
    </>
  );
};
