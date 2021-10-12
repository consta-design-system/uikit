import './ProgressStepBarItem.css';

import React, { forwardRef, useRef, useState } from 'react';

import { cn } from '../../../utils/bem';
import { ProgressSpin } from '../../ProgressSpin/ProgressSpin';
import { Text } from '../../Text/Text';
import { Tooltip } from '../../Tooltip/Tooltip';
import { DefaultItem, PropDirection, PropSize, propStatusDefault, StepBarItem } from '../helpers';

const propPosition = ['center', 'start', 'end'] as const;
export type PropPosition = typeof propPosition[number];
const propPositionDefault: PropPosition = propPosition[0];

type Props<ITEM> = {
  step: StepBarItem;
  position?: PropPosition;
  direction: PropDirection;
  size: PropSize;
  onItemClick?: (e: React.MouseEvent) => void;
};

type StepComponent = <ITEM>(
  props: Props<ITEM> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement | null;

const cnProgressStepBarItem = cn('ProgressStepBarItem');

function ProgressStepBarItemRender<ITEM = DefaultItem>(
  props: Props<ITEM>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    step,
    direction,
    size,
    onItemClick,
    position = propPositionDefault,
    ...otherProps
  } = props;

  const [isTooltipHidden, setIsTooltipHidden] = useState<boolean>(true);
  const [isContentHidden, setIsContentHidden] = useState<boolean>(true);

  const anchorRef = useRef<HTMLDivElement>(null);

  const PointContent =
    step.point instanceof SVGElement ? (
      step.point
    ) : (
      <Text
        className={cnProgressStepBarItem('Point-Text')}
        size={size === 's' ? '2xs' : 'xs'}
        weight="bold"
      >
        {step.point?.toString()[0]}
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
          status: step.status || propStatusDefault,
        })}
        {...otherProps}
      >
        <button
          ref={ref}
          type="button"
          onMouseEnter={() => setIsTooltipHidden(false)}
          onMouseLeave={() => setIsTooltipHidden(true)}
          className={cnProgressStepBarItem('Point', {
            size,
          })}
          onClick={handleClick}
        >
          {size !== 'xs' && (step.progress ? <ProgressSpin size={size} /> : PointContent)}
        </button>
        <div className={cnProgressStepBarItem('Content')}>
          <Text
            className={cnProgressStepBarItem('Label', { size })}
            ref={anchorRef}
            size={size}
            lineHeight={size === 's' ? 'xs' : size}
            view="primary"
          >
            {step.label}
          </Text>
          {step.content}
        </div>
      </div>
      {step.tooltipContent && !isTooltipHidden && (
        <Tooltip
          anchorRef={anchorRef}
          direction={direction === 'horizontal' ? 'downCenter' : 'leftUp'}
          spareDirection={direction === 'horizontal' ? 'upCenter' : 'rightUp'}
        >
          {step.tooltipContent}
        </Tooltip>
      )}
    </>
  );
}

export const ProgressStepBarItem = forwardRef(ProgressStepBarItemRender) as StepComponent;
