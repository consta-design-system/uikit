import './PopoverExample.css';

import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { Popover, Position } from '##/components/Popover';
import { Text } from '##/components/Text';
import { cn } from '##/utils/bem';

const cnPopoverExample = cn('PopoverExample');

export const PopoverPositionedByCoordsExample = () => {
  const [position, setPosition] = useState<Position>(undefined);

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <Example col={1}>
        <div
          className={cnPopoverExample({ for: 'position' })}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(undefined)}
        >
          <Text size="m" view="primary" lineHeight="m">
            Область, в которой работает отслеживание мышки
          </Text>
        </div>
      </Example>
      <Popover
        direction="upCenter"
        spareDirection="downStartLeft"
        offset="2xs"
        arrowOffset={0}
        onClickOutside={() => {}}
        isInteractive={false}
        position={position}
      >
        {(direction) => (
          <div className={cnPopoverExample('Content', { for: 'position' })}>
            <Text size="xs" view="primary" lineHeight="m">
              Это содержимое поповера: здесь может быть что угодно, например,
              этот текст.
            </Text>
            <Text size="xs" view="primary" lineHeight="m">
              Направление: {direction}
            </Text>
          </div>
        )}
      </Popover>
    </>
  );
};

export const PopoverPositionedByAnchorExample = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleClickOnAnchor = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <>
      <Example>
        <div className={cnPopoverExample()}>
          <Button
            label="Нажмите меня"
            type="button"
            onClick={handleClickOnAnchor}
            ref={anchorRef}
          />
        </div>
      </Example>
      {isPopoverVisible && (
        <Popover
          direction="upCenter"
          spareDirection="downStartLeft"
          offset="2xs"
          arrowOffset={0}
          onClickOutside={() => {}}
          isInteractive
          anchorRef={anchorRef}
          equalAnchorWidth={false}
        >
          <div className={cnPopoverExample('Content')}>
            <Text size="xs" view="primary" lineHeight="m">
              Это содержимое поповера: здесь может быть что угодно, например,
              этот текст.
            </Text>
          </div>
        </Popover>
      )}
    </>
  );
};
