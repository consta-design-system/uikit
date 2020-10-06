import './Tooltip.stories.css';

import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, object, optionsKnob, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { directions, Position } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { sizes, Tooltip } from '../Tooltip';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Tooltip.mdx';

const cnTooltipStories = cn('TooltipStories');

const getCommonKnobs = () => ({
  size: select('size', sizes, 's'),
  direction: select('direction', directions, 'upCenter'),
  spareDirection: select('spareDirection', directions, 'downStartLeft'),
  possibleDirections: object('possibleDirections', directions),
  onClickOutside: action('onClickOutside'),
  children: <Text size="xs">{text('children', 'Текст тултипа')}</Text>,
});

const TooltipPositionedByCoordsStoryContent = () => {
  const [position, setPosition] = useState<Position>(undefined);

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <div
        className={cnTooltipStories({ for: 'anchor' })}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition(undefined)}
      >
        <Text>Область, в которой работает отслеживание мышки</Text>
      </div>
      <Tooltip
        {...getCommonKnobs()}
        isInteractive={boolean('isInteractive', false)}
        position={position}
      />
    </>
  );
};

export const TooltipPositionedByCoordsStory = createStory(
  () => <TooltipPositionedByCoordsStoryContent />,
  { name: 'с позиционированием по координатам' },
);

export const TooltipPositionedByAnchorStory = createStory(
  () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const handleClickOnAnchor = () => {
      setIsTooltipVisible(!isTooltipVisible);
    };
    const anchorType = optionsKnob('Тип якоря', { Кнопка: 'button', Бейджик: 'badge ' }, 'button', {
      display: 'inline-radio',
    });
    const anchor =
      anchorType === 'button' ? (
        <Button
          label={text('Текст на кнопке', 'Нажми меня')}
          type="button"
          onClick={handleClickOnAnchor}
          ref={anchorRef}
        />
      ) : (
        <Badge
          as="button"
          minified
          size={select('Размер бейджика', ['s', 'm', 'l'], 's')}
          onClick={handleClickOnAnchor}
          ref={anchorRef}
        />
      );

    React.useEffect(() => setIsTooltipVisible(false), [anchorType]);

    const commonKnobs = {
      ...getCommonKnobs(),
      isInteractive: boolean('isInteractive', false),
      equalAnchorWidth: boolean('equalAnchorWidth', false),
    };

    return (
      <>
        <div className={cnTooltipStories()}>{anchor}</div>
        {isTooltipVisible && <Tooltip {...commonKnobs} anchorRef={anchorRef} />}
      </>
    );
  },
  { name: 'с позиционированием по якорю' },
);

export default createMetadata({
  title: 'Components|/Tooltip',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
