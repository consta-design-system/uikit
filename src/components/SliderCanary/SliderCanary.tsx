import './Slider.css';

import React, { forwardRef, useRef } from 'react';

import { useFlag } from '../../hooks/useFlag/useFlag';
import { IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import { SliderInput } from './SliderInput/SliderInput';
import { SliderLine } from './SliderLine/SliderLine';
import { SliderPoint } from './SliderPoint/SliderPoint';
import { getActiveValue } from './useSlider/helper';
import { useSlider } from './useSlider/useSlider';
import {
  defaultPropSize,
  defaultTooltipFormatter,
  isNotRangeParams,
  isRangeParams,
  PropSize,
  SliderComponent,
  SliderProps,
} from './helper';
import { useSliderStationing } from './useSliderStationing';

const cnSlider = cn('Slider');

const sizeMap: Record<PropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

function SliderRender<RANGE extends boolean>(
  props: SliderProps<RANGE>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    min = 0,
    max = 100,
    onChange,
    onAfterChange,
    value,
    step = 1,
    disabled = false,
    size = defaultPropSize,
    view = 'default',
    leftSide,
    rightSide,
    withTooltip,
    range = false,
    label,
    status,
    caption,
    tooltipFormatter = defaultTooltipFormatter,
    className,
    ...otherProps
  } = props;

  const [isHovered, { on, off }] = useFlag(false);

  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const IconRight = rightSide;
  const IconLeft =
    isNotRangeParams && props.leftSide && props.leftSide !== 'input' ? props.leftSide : undefined;

  const iconSize = getByMap(sizeMap, size);

  const { onKeyPress, onFocus, dragPoint, popoverPosition, activeButton, currentValue } = useSlider(
    {
      disabled,
      range,
      value,
      min,
      max,
      step,
      onChange,
      onAfterChange,
      sliderRef,
      buttonRefs: [leftButtonRef, rightButtonRef],
    },
  );

  const { lineSizes, buttonPositions } = useSliderStationing(
    currentValue,
    min,
    max,
    view,
    range,
    step,
    [leftButtonRef, rightButtonRef],
    sliderRef,
  );

  const changeHovered = (status: boolean) => {
    if (status) on();
    else off();
  };

  return (
    <div ref={ref} className={cnSlider({ size }, [className])} {...otherProps}>
      {label && (
        <FieldLabel className={cnSlider('Label')} size={size}>
          {label}
        </FieldLabel>
      )}
      <div className={cnSlider('Container')}>
        {leftSide === 'input' && isNotRangeParams(props) && (
          <div className={cnSlider('Side', { position: 'left' })}>
            <SliderInput
              value={props.value}
              onChange={(params) => isNotRangeParams(props) && props.onChange?.(params)}
              size={size}
              min={min}
              max={max}
              status={status}
              step={step}
              disabled={disabled}
            />
          </div>
        )}
        {IconLeft && (
          <div className={cnSlider('Side', { position: 'left' })}>
            <IconLeft size={iconSize} view="secondary" />
          </div>
        )}
        <div className={cnSlider('Control')} ref={sliderRef}>
          <SliderLine
            hovered={isHovered}
            onHover={changeHovered}
            lines={lineSizes}
            disabled={disabled}
            view={view}
          />
          <SliderPoint
            hovered={isHovered}
            buttonRef={leftButtonRef}
            popoverPosition={popoverPosition[0]}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            disabled={disabled}
            onMouseDown={dragPoint}
            position={buttonPositions[0]}
            focused={activeButton === 'left'}
            buttonLabel="left"
            withTooltip={withTooltip}
            onHover={changeHovered}
            value={tooltipFormatter(getActiveValue(currentValue, 'left'))}
          />
          {isRangeParams(props) && (
            <SliderPoint
              hovered={isHovered}
              buttonRef={rightButtonRef}
              onFocus={onFocus}
              popoverPosition={popoverPosition[1]}
              onKeyPress={onKeyPress}
              disabled={disabled}
              onMouseDown={dragPoint}
              focused={activeButton === 'right'}
              withTooltip={withTooltip}
              position={buttonPositions[1]}
              buttonLabel="right"
              onHover={changeHovered}
              value={tooltipFormatter(getActiveValue(currentValue, 'right'))}
            />
          )}
        </div>
        {IconRight && (
          <div className={cnSlider('Side', { position: 'right' })}>
            <IconRight size={iconSize} view="secondary" />
          </div>
        )}
      </div>
      {caption && (
        <FieldCaption className={cnSlider('Caption')} status={status}>
          {caption}
        </FieldCaption>
      )}
    </div>
  );
}

export const Slider = forwardRef(SliderRender) as SliderComponent;
