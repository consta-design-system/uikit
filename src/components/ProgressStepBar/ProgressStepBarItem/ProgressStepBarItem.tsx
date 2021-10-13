import './ProgressStepBarItem.css';

import React, { useRef, useState } from 'react';

import { cn } from '../../../utils/bem';
import { Direction } from '../../Popover/Popover';
import { ProgressSpin } from '../../ProgressSpin/ProgressSpin';
import { Text } from '../../Text/Text';
import { Tooltip } from '../../Tooltip/Tooltip';
import { ProgressStepBarItemProps, propPositionDefault, propStatusDefault } from '../helpers';

type StepComponent = (props: ProgressStepBarItemProps) => React.ReactElement | null;

const cnProgressStepBarItem = cn('ProgressStepBarItem');

const possibleVerticalDirections: Direction[] = ['leftCenter', 'rightUp', 'downCenter'];
const possibleHorizontalDirections: Direction[] = ['upCenter', 'downLeft', 'rightUp'];

export const ProgressStepBarItem: StepComponent = (props) => {
  const {
    content,
    tooltipContent,
    label,
    point,
    status,
    progress,
    direction,
    size,
    buttonRef,
    onItemClick,
    position = propPositionDefault,
    ...otherProps
  } = props;

  const [isTooltipHidden, setIsTooltipHidden] = useState<boolean>(true);
  const [isContentHidden, setIsContentHidden] = useState<boolean>(true);

  const anchorRef = useRef<HTMLDivElement>(null);

  const PointContent =
    point instanceof SVGElement ? (
      point
    ) : (
      <Text
        className={cnProgressStepBarItem('Point-Text')}
        size={size === 's' ? '2xs' : 'xs'}
        weight="bold"
      >
        {point}
      </Text>
    );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onItemClick?.(e);
    setIsContentHidden(!isContentHidden);
  };

  return (
    <>
      <div
        className={cnProgressStepBarItem({
          direction,
          position,
          status: status || propStatusDefault,
          size,
        })}
        {...otherProps}
      >
        <button
          ref={buttonRef}
          type="button"
          onMouseEnter={() => setIsTooltipHidden(false)}
          onMouseLeave={() => setIsTooltipHidden(true)}
          className={cnProgressStepBarItem('Point', {
            size,
          })}
          onClick={handleClick}
        >
          {size !== 'xs' && (progress ? <ProgressSpin size={size} /> : PointContent)}
        </button>
        <div className={cnProgressStepBarItem('Content')}>
          <Text
            className={cnProgressStepBarItem('Label')}
            ref={anchorRef}
            size={size}
            onMouseEnter={() => setIsTooltipHidden(false)}
            onMouseLeave={() => setIsTooltipHidden(true)}
            lineHeight={size === 's' ? 'xs' : size}
            view="primary"
          >
            {label}
          </Text>
          {content}
        </div>
      </div>
      {tooltipContent && !isTooltipHidden && (
        <Tooltip
          anchorRef={anchorRef}
          direction={direction === 'horizontal' ? 'downCenter' : 'leftUp'}
          possibleDirections={
            direction === 'horizontal' ? possibleHorizontalDirections : possibleVerticalDirections
          }
        >
          {tooltipContent}
        </Tooltip>
      )}
    </>
  );
};
