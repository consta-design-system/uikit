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
import { Tooltip, tooltipPropSizes, tooltipPropSizesDefault, tooltipPropStatus } from '../Tooltip';

import mdx from './Tooltip.docs.mdx';

const cnTooltipStories = cn('TooltipStories');

const getCommonKnobs = () => ({
  size: select('size', tooltipPropSizes, tooltipPropSizesDefault),
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
        status={select('status', ['', ...tooltipPropStatus], '') || undefined}
        isInteractive={boolean('isInteractive', false)}
        position={position}
      />
    </>
  );
};

export const TooltipPositionedByCoordsStory = createStory(
  () => <TooltipPositionedByCoordsStoryContent />,
  {
    name: 'с позиционированием по координатам',
  },
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
      status: select('status', ['', ...tooltipPropStatus], '') || undefined,
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
  {
    name: 'с позиционированием по якорю',
  },
);

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Tooltip',
  id: 'components/Tooltip',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A17463',
    },
  },
});
