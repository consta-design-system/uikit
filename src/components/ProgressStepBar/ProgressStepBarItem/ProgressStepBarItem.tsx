import './ProgressStepBarItem.css';

import { IconComponent } from '@consta/icons/Icon';
import React, { useMemo, useRef } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import { useMouseLeave } from '##/hooks/useMouseLeave';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { Direction } from '../../Popover/Popover';
import { ProgressSpin } from '../../ProgressSpin/ProgressSpin';
import { Text } from '../../Text/Text';
import { Tooltip } from '../../Tooltip/Tooltip';
import {
  PointNumbersMap,
  ProgressStepBarItemComponent,
  propPositionDefault,
  propStatusDefault,
} from '../helpers';

const cnProgressStepBarItem = cn('ProgressStepBarItem');

const possibleVerticalDirections: Direction[] = [
  'leftCenter',
  'rightCenter',
  'rightUp',
  'downCenter',
];
const possibleHorizontalDirections: Direction[] = [
  'downCenter',
  'upCenter',
  'downStartLeft',
  'downStartRight',
];

const renderPointContent = (
  point: PointNumbersMap | IconComponent | undefined,
  size: 'm' | 's',
  progress: boolean | undefined,
) => {
  if (progress) return <ProgressSpin size={size} />;
  if (!point) return null;

  if (typeof point === 'number') {
    return (
      <Text
        className={cnProgressStepBarItem('PointText')}
        size={size === 's' ? '2xs' : 'xs'}
        weight="bold"
      >
        {point}
      </Text>
    );
  }

  const Icon = point;

  return <Icon className={cnProgressStepBarItem('PointIcon')} size="xs" />;
};

export const ProgressStepBarItem: ProgressStepBarItemComponent =
  React.forwardRef((props, ref) => {
    const {
      content,
      tooltipContent,
      label,
      point,
      status,
      progress,
      direction,
      size,
      pointRef: pointRefProp,
      onClick,
      position = propPositionDefault,
      tooltipZIndex,
      className,
      ...otherProps
    } = props;

    const [isTooltipVisible, setTooltipVisible] = useFlag();

    const anchorRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const pointRef = useRef<HTMLButtonElement>(null);

    const pointForkedRef = useForkRef([pointRef, pointRefProp]);

    const pointProps = {
      onMouseEnter: setTooltipVisible.on,
      className: cnProgressStepBarItem(
        'Point',
        {
          size,
          pointer: !!onClick,
        },
        [onClick ? cnMixFocus() : undefined],
      ),
      children: size !== 'xs' && renderPointContent(point, size, progress),
      ref: pointForkedRef,
      onClick,
    };

    const { tooltipDirection, possibleDirections, spareDirection } = useMemo<{
      tooltipDirection: Direction;
      possibleDirections: Direction[];
      spareDirection: Direction;
    }>(() => {
      if (direction === 'vertical') {
        return {
          tooltipDirection: 'leftUp',
          possibleDirections: possibleVerticalDirections,
          spareDirection: 'rightCenter',
        };
      }
      let spareDirection: Direction = 'downCenter';
      if (position === 'start') {
        spareDirection = 'rightCenter';
      }
      if (position === 'end') {
        spareDirection = 'leftCenter';
      }
      return {
        tooltipDirection: 'downCenter',
        possibleDirections: possibleHorizontalDirections,
        spareDirection,
      };
    }, [direction, position]);

    useMouseLeave({
      isActive: isTooltipVisible,
      refs: [anchorRef, pointRef, tooltipRef],
      handler: setTooltipVisible.off,
      debounce: 100,
    });

    return (
      <>
        <div
          ref={ref}
          className={cnProgressStepBarItem(
            {
              direction,
              position,
              status: status || propStatusDefault,
              size,
            },
            [className],
          )}
          {...otherProps}
        >
          <button tabIndex={-1} type="button" {...pointProps} />
          {(label || content) && (
            <div
              className={cnProgressStepBarItem('Content', {
                bottomOffset: !!content,
              })}
            >
              {label && (
                <Text
                  className={cnProgressStepBarItem('Label')}
                  ref={anchorRef}
                  size={size}
                  onMouseEnter={setTooltipVisible.on}
                  lineHeight={size === 's' ? 'xs' : size}
                  view="primary"
                >
                  {label}
                </Text>
              )}
              {content}
            </div>
          )}
        </div>
        {tooltipContent && isTooltipVisible && (
          <Tooltip
            ref={tooltipRef}
            anchorRef={pointRef}
            className={cnProgressStepBarItem('Tooltip')}
            direction={tooltipDirection}
            style={{ zIndex: tooltipZIndex }}
            isInteractive={false}
            possibleDirections={possibleDirections}
            spareDirection={spareDirection}
          >
            {tooltipContent}
          </Tooltip>
        )}
      </>
    );
  });
