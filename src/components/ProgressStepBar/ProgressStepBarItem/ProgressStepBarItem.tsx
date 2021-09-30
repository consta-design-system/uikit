import React, { useRef } from 'react';

import { Timer } from '../../Timer/Timer';
import { Tooltip } from '../../Tooltip/Tooltip';
import {
  cnProgressStepBar,
  DefaultItem,
  PropDirection,
  PropGetItemContent,
  PropGetItemKey,
  PropGetItemLabel,
  PropGetItemOnCLick,
  PropGetItemPoint,
  PropGetItemProgress,
  PropGetItemStatus,
  PropGetItemTooltipContent,
  PropSize,
  propStatusDefault,
} from '../helpers';

type Props<ITEM> = {
  step: ITEM;
  direction: PropDirection;
  size: PropSize;
  getItemLabel: PropGetItemLabel<ITEM>;
  getItemKey: PropGetItemKey<ITEM>;
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
    getItemContent,
    getItemKey,
    getItemLabel,
    getItemOnClick,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef} className={cnProgressStepBar('Step', { direction })} {...otherProps}>
        <button
          type="button"
          className={cnProgressStepBar('Point', {
            size,
            status: getItemStatus(step) || propStatusDefault,
          })}
          onClick={() => getItemOnClick(step)}
        >
          {size !== 'xs' && (getItemProgress(step) ? <Timer size={size} /> : getItemPoint(step))}
        </button>
        <div className={cnProgressStepBar('Content')}>
          {getItemLabel(step)}
          {getItemContent(step)}
        </div>
      </div>
      {getItemTooltipContent(step) && (
        <Tooltip
          anchorRef={containerRef}
          direction={direction === 'horizontal' ? 'downCenter' : 'leftUp'}
        >
          {getItemTooltipContent(step)}
        </Tooltip>
      )}
    </>
  );
};
