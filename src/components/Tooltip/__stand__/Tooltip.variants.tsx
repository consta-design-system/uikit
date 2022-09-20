import './Tooltip.variants.css';

import React, { useState } from 'react';

import { useBoolean, useSelect, useText } from '@consta/stand';

import { cn } from '../../../utils/bem';

//import { Badge } from '../../Badge/Badge';
//import { Button } from '../../Button/Button';
import { directions, Position } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { Tooltip, tooltipPropSizes, tooltipPropSizesDefault, tooltipPropStatus } from '../Tooltip';

const cnTooltipVariants = cn('TooltipVariants');

const Variants = () => {
  const size = useSelect('size', tooltipPropSizes, tooltipPropSizesDefault);
  const direction = useSelect('direction', directions, 'upCenter');
  const spareDirection = useSelect('spareDirection', directions, 'downStartLeft');
  const status = useSelect('status', ['', ...tooltipPropStatus], '');
  //const onClickOutside = console.log('onClickOutside');

  const children = useText('children', 'Текст тултипа');

  const [position, setPosition] = useState<Position>(undefined);

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };


  return (
    <>
      <div
        className={cnTooltipVariants({ for: 'anchor' })}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition(undefined)}
      >
        <Text>Область, в которой работает отслеживание мышки</Text>
      </div>
      <Tooltip
        size={size}
        direction={direction}
        spareDirection={spareDirection}
        children={children}
        status={status || undefined}
        isInteractive={useBoolean('isInteractive', false)}
        position={position}
      />
    </>
  );
};



//
// export const Playground = createStory(
//   () => {
//     const anchorRef = useRef<HTMLButtonElement>(null);
//     const [isTooltipVisible, setIsTooltipVisible] = useState(false);
//
//     const handleClickOnAnchor = () => {
//       setIsTooltipVisible(!isTooltipVisible);
//     };
//     const anchorType = optionsKnob('Тип якоря', { Кнопка: 'button', Бейджик: 'badge ' }, 'button', {
//       display: 'inline-radio',
//     });
//     const anchor =
//       anchorType === 'button' ? (
//         <Button
//           label={text('Текст на кнопке', 'Нажми меня')}
//           type="button"
//           onClick={handleClickOnAnchor}
//           ref={anchorRef}
//         />
//       ) : (
//         <Badge
//           as="button"
//           minified
//           size={select('Размер бейджика', ['s', 'm', 'l'], 's')}
//           onClick={handleClickOnAnchor}
//           ref={anchorRef}
//         />
//       );
//
//     React.useEffect(() => setIsTooltipVisible(false), [anchorType]);
//
//     const commonKnobs = {
//       ...getCommonKnobs(),
//       status = useSelect('status', ['', ...tooltipPropStatus], '') || undefined,
//       isInteractive: boolean('isInteractive', false),
//       equalAnchorWidth: boolean('equalAnchorWidth', false),
//     };
//
//     return (
//       <>
//         <div className={cnTooltipVariants()}>{anchor}</div>
//         {isTooltipVisible && <Tooltip {...commonKnobs} anchorRef={anchorRef} />}
//       </>
//     );
//   },
//   {
//     name: 'с позиционированием по якорю',
//   },
// );

export default Variants;
