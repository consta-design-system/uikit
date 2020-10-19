import './Popover.stories.css';

import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata, createStory, getStoryIds } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { directions, Popover, Position } from '../Popover';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Popover.mdx';

const cnPopoverStories = cn('PopoverStories');

const getCommonKnobs = () => ({
  direction: select('direction', directions, 'upCenter'),
  spareDirection: select('spareDirection', directions, 'downStartLeft'),
  offset: number('offset', 5),
  arrowOffset: number('arrowOffset', 0),
  possibleDirections: object('possibleDirections', directions),
  onClickOutside: action('onClickOutside'),
});

const getText = () => <Text size="xs">{text('children', 'Контент поповера')}</Text>;

const ExamplePopoverContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => (
  <div {...rest} className={cnPopoverStories('Content')}>
    {children}
  </div>
);

export const PopoverPositionedByCoordsStory = createStory(
  () => {
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    return (
      <>
        <div
          className={cnPopoverStories({ for: 'anchor' })}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(undefined)}
        >
          <Text>Область, в которой работает отслеживание мышки</Text>
        </div>
        <Popover
          {...getCommonKnobs()}
          isInteractive={boolean('isInteractive', false)}
          position={position}
        >
          {(direction) => (
            <ExamplePopoverContent>
              {getText()}
              <Text size="xs">Напраление: {direction}</Text>
            </ExamplePopoverContent>
          )}
        </Popover>
      </>
    );
  },
  { name: 'с позиционированием по координатам' },
);

export const PopoverPositionedByAnchorStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const handleClickOnAnchor = () => {
      setIsPopoverVisible(!isPopoverVisible);
    };

    const commonKnobs = {
      ...getCommonKnobs(),
      isInteractive: boolean('isInteractive', true),
      equalAnchorWidth: boolean('equalAnchorWidth', false),
    };

    return (
      <>
        <div className={cnPopoverStories()}>
          <Button label="Нажми меня" type="button" onClick={handleClickOnAnchor} ref={anchorRef} />
        </div>
        {isPopoverVisible && (
          <Popover {...commonKnobs} anchorRef={anchorRef}>
            <ExamplePopoverContent>{getText()}</ExamplePopoverContent>
          </Popover>
        )}
      </>
    );
  },
  { name: 'с позиционированием по якорю' },
);

/**
 * Стори для воспроизведения проблемы с бесконечным зацикливанием позиций поповера:
 * Когда поповер пытается развернуться в upRight, то по размерам выходит, что он не влезает и его надо развернуть в left
 * Аналогично когда поповер пытается развернуться в left, то по размерам ему не хватает места и его надо развернуть в upRight
 */
export const PopoverBannedPositionsStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const handleClickOnAnchor = () => {
      setIsPopoverVisible(!isPopoverVisible);
    };

    return (
      <>
        <Button label="Нажми меня" type="button" onClick={handleClickOnAnchor} ref={anchorRef} />
        {isPopoverVisible && (
          <Popover
            anchorRef={anchorRef}
            offset={0}
            direction="upRight"
            possibleDirections={['upRight', 'leftCenter']}
          >
            {(direction) => (
              <ExamplePopoverContent
                style={
                  direction === 'upRight'
                    ? {
                        width: 10,
                        height: 50,
                      }
                    : {
                        width: 50,
                        height: 10,
                      }
                }
              >
                {direction}
              </ExamplePopoverContent>
            )}
          </Popover>
        )}
      </>
    );
  },
  { name: 'dev: предотвращение бесконечного цикла смены позиций' },
);

export default createMetadata({
  title: 'Components|/Popover',
  excludeStories:
    process.env.NODE_ENV === 'development'
      ? undefined
      : getStoryIds({ PopoverBannedPositionsStory }),
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
