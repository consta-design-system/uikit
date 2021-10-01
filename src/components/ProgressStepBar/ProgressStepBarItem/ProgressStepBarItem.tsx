import React, { useRef, useState } from 'react';

import { Text } from '../../Text/Text';
import { Timer } from '../../Timer/Timer';
import { Tooltip } from '../../Tooltip/Tooltip';
import {
  cnProgressStepBar,
  DefaultItem,
  PropDirection,
  PropGetItemContent,
  PropGetItemLabel,
  PropGetItemOnCLick,
  PropGetItemPoint,
  PropGetItemProgress,
  PropGetItemStatus,
  PropGetItemTooltipContent,
  PropSize,
  propStatusDefault,
} from '../helpers';

const propPosition = ['center', 'start', 'end'] as const;
export type PropPosition = typeof propPosition[number];
const propPositionDefault: PropPosition = propPosition[0];

type Props<ITEM> = {
  step: ITEM;
  position?: PropPosition;
  direction: PropDirection;
  size: PropSize;
  getItemLabel: PropGetItemLabel<ITEM>;
  getItemTooltipContent: PropGetItemTooltipContent<ITEM>;
  getItemPoint: PropGetItemPoint<ITEM>;
  getItemProgress: PropGetItemProgress<ITEM>;
  getItemContent: PropGetItemContent<ITEM>;
  getItemOnClick: PropGetItemOnCLick<ITEM>;
  getItemStatus: PropGetItemStatus<ITEM>;
};

type StepComponent = <ITEM = DefaultItem>(props: Props<ITEM>) => React.ReactElement | null;

export const ProgressStepBarItem: StepComponent = (props) => {
  const {
    step,
    direction,
    size,
    position = propPositionDefault,
    getItemContent,
    getItemLabel,
    getItemOnClick,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    ...otherProps
  } = props;

  const [isTooltipHidden, setIsTooltipHidden] = useState<boolean>(true);
  const [isContentHidden, setIsContentHidden] = useState<boolean>(true);

  const anchorRef = useRef<HTMLDivElement>(null);

  const PointContent =
    getItemPoint(step) instanceof SVGElement ? (
      getItemPoint(step)
    ) : (
      <Text
        className={cnProgressStepBar('Point-Text')}
        size={size === 's' ? '2xs' : 'xs'}
        weight="bold"
      >
        {getItemPoint(step)}
      </Text>
    );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickAction = getItemOnClick(step);
    clickAction && clickAction(e);
    setIsContentHidden(!isContentHidden);
  };

  return (
    <>
      <div
        className={cnProgressStepBar('Step', {
          direction,
          position,
          status: getItemStatus(step) || propStatusDefault,
        })}
        {...otherProps}
      >
        <button
          type="button"
          onMouseEnter={() => setIsTooltipHidden(false)}
          onMouseLeave={() => setIsTooltipHidden(true)}
          className={cnProgressStepBar('Point', {
            size,
          })}
          onClick={handleClick}
        >
          {size !== 'xs' &&
            (getItemProgress(step) ? (
              <Timer size={size} progress={getItemProgress(step)} />
            ) : (
              PointContent
            ))}
        </button>
        <div className={cnProgressStepBar('Content')}>
          <Text ref={anchorRef} size={size === 'm' ? 'm' : 's'} view="primary">
            {getItemLabel(step)}
          </Text>
          {getItemContent(step)}
        </div>
      </div>
      {getItemTooltipContent(step) && !isTooltipHidden && (
        <Tooltip
          anchorRef={anchorRef}
          direction={direction === 'horizontal' ? 'downCenter' : 'leftUp'}
          spareDirection={direction === 'horizontal' ? 'upCenter' : 'rightUp'}
        >
          {getItemTooltipContent(step)}
        </Tooltip>
      )}
    </>
  );
};
