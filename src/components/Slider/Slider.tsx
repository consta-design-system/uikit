import './Slider.css';

import React, { useRef } from 'react';

import { useFlag } from '../../hooks/useFlag/useFlag';
import { cn } from '../../utils/bem';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import { SliderLine } from './SliderLine/SliderLine';
import { SliderPoint } from './SliderPoint/SliderPoint';
import { useSlider } from './useSlider/useSlider';
import { defaultPropSize, SliderProps } from './helper';
import { useSliderStationing } from './useSliderStationing';

const cnSlider = cn('Slider');

export function Slider<RANGE extends boolean>(props: SliderProps<RANGE>) {
  const {
    min = 0,
    max = 100,
    onChange,
    value,
    step = 10,
    disabled = false,
    size = defaultPropSize,
    view = 'default',
    leftSide,
    rightSide,
    withTooltip,
    range,
    label,
    status,
    caption,
    className,
    ...otherProps
  } = props;

  const [isHovered, { on, off }] = useFlag(false);

  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const {
    handleTouchStart,
    handleMouseDown,
    onKeyPress,
    onFocus,
    popoverPosition,
    activeButton,
    stopListening,
  } = useSlider({
    disabled,
    range,
    value,
    min,
    max,
    step,
    onChange,
    sliderRef,
    buttonRefs: [leftButtonRef, rightButtonRef],
  });

  const { lineSizes, buttonPositions } = useSliderStationing(
    value,
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
    <div className={cnSlider(null, [className])} {...otherProps}>
      {label && <FieldLabel size={size}>{label}</FieldLabel>}
      <div className={cnSlider('Container', { size })}>
        {leftSide && (
          <div className={cnSlider('Side', { position: 'left' })}>
            {typeof leftSide === 'function' ? leftSide({ value }) : leftSide}
          </div>
        )}
        <div
          className={cnSlider('Control')}
          ref={sliderRef}
          role="button"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseUp={() => stopListening()}
          aria-hidden="true"
        >
          <SliderLine
            hovered={isHovered}
            onHover={(hovered) => changeHovered(hovered)}
            lines={lineSizes}
            view={view}
          />
          <SliderPoint
            hovered={isHovered}
            buttonRef={leftButtonRef}
            popoverPosition={popoverPosition[0]}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            position={buttonPositions[0]}
            focused={activeButton === 'left'}
            buttonLabel="left"
            withTooltip={withTooltip}
            onHover={(hovered) => changeHovered(hovered)}
            value={Array.isArray(value) ? value[0] : value}
          />
          {Array.isArray(value) && range && (
            <SliderPoint
              hovered={isHovered}
              buttonRef={rightButtonRef}
              onFocus={onFocus}
              popoverPosition={popoverPosition[1]}
              onKeyPress={onKeyPress}
              focused={activeButton === 'right'}
              withTooltip={withTooltip}
              position={buttonPositions[1]}
              buttonLabel="right"
              onHover={(hovered) => changeHovered(hovered)}
              value={value[1]}
            />
          )}
        </div>
        {rightSide && (
          <div className={cnSlider('Side', { position: 'right' })}>
            {typeof rightSide === 'function' ? rightSide({ value }) : rightSide}
          </div>
        )}
      </div>
      {caption && <FieldCaption status={status}>{caption}</FieldCaption>}
    </div>
  );
}
