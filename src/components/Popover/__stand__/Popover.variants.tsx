import './Popover.variants.css';

import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../utils/bem';

//import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { directions, Popover, popoverPropOffset, Position } from '../Popover';

const cnPopoverVariants = cn('PopoverVariants');

const ExamplePopoverContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => (
  <div {...rest} className={cnPopoverVariants('Content')}>
    {children}
  </div>
);

const Variants = () => {
  const getText = useText(
        'children',
        'Это содержимое поповера: здесь может быть что угодно, например, этот текст.',
      );
  const direction = useSelect('direction', directions, 'upCenter');
  const spareDirection = useSelect('spareDirection', directions, 'downStartLeft');
  const offset = useSelect('offset', popoverPropOffset, '2xs');
  const arrowOffset = useNumber('arrowOffset', 0);
  const possibleDirections = useText('possibleDirections', directions);
  const onClickOutside = console.log('onClickOutside');
  const isInteractive = useBoolean('isInteractive', false);

  const [position, setPosition] = useState<Position>(undefined);

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <div
        className={cnPopoverVariants({ for: 'anchor' })}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition(undefined)}
      >
        <Text>Область, в которой работает отслеживание мышки</Text>
      </div>
      <Popover
        direction={direction}
        spareDirection={spareDirection}
        offset={offset}
        arrowOffset={arrowOffset}
        possibleDirections={possibleDirections}
        isInteractive={isInteractive}
        onClickOutside={onClickOutside}
        position={position}
      >
        {(direction) => (
          <ExamplePopoverContent>
            <Text size="xs">{getText}</Text>
            <Text size="xs">Направление: {direction}</Text>
          </ExamplePopoverContent>
        )}
      </Popover>
    </>
  );
}

export default Variants;
