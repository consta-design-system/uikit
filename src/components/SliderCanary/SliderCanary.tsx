import './Slider.css';

import React, { forwardRef, useRef } from 'react';

import { useFlag } from '../../hooks/useFlag/useFlag';
import { useSortSteps } from '../../hooks/useSortSteps/useSortSteps';
import { IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import { SliderInput } from './SliderInput/SliderInput';
import { SliderLine } from './SliderLine/SliderLine';
import { SliderPoint } from './SliderPoint/SliderPoint';
import { ActiveButton } from './useSlider/helper';
import { useSlider } from './useSlider/useSlider';
import {
  defaultPropSize,
  defaultTooltipFormatter,
  isNotRangeParams,
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

export const COMPONENT_NAME = 'Slider' as const;

function SliderRender<RANGE extends boolean>(
  props: SliderProps<RANGE>,
  ref: React.Ref<HTMLDivElement>,
) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const {
    min = 0,
    max = 100,
    onChange,
    onAfterChange,
    value,
    step: stepProp,
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
    style,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, sliderRef);

  const [isHovered, { on, off }] = useFlag(false);

  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const sortedSteps = useSortSteps({ step: stepProp, min, max });
  const step = stepProp ? sortedSteps : Math.abs((max - min) / 100);

  const IconRight = rightSide;
  const IconLeft =
    isNotRangeParams(props) && props.leftSide && props.leftSide !== 'input'
      ? props.leftSide
      : undefined;

  const iconSize = getByMap(sizeMap, size);

  const {
    onKeyPress,
    onFocus,
    handlePress,
    popoverPosition,
    activeButton,
    currentValue,
  } = useSlider({
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
  });

  const { lineSizes, buttonPositions } = useSliderStationing(
    currentValue.length === 1 ? currentValue[0] : currentValue,
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
    <div ref={ref} className={cnSlider({ size }, [className])} style={style} {...otherProps}>
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
            <IconLeft size={iconSize ?? undefined} view="secondary" />
          </div>
        )}
        <div className={cnSlider('Control')} ref={sliderRef}>
          <SliderLine
            hovered={isHovered || typeof activeButton === 'number'}
            onHover={changeHovered}
            lines={lineSizes}
            disabled={disabled}
            view={view}
          />
          {currentValue.map((val, index) => (
            <SliderPoint
              hovered={isHovered || typeof activeButton === 'number'}
              buttonRef={leftButtonRef}
              popoverPosition={popoverPosition[index]}
              onKeyPress={onKeyPress}
              onFocus={onFocus}
              handlePress={handlePress}
              disabled={disabled}
              position={buttonPositions[index]}
              focused={activeButton === index}
              buttonLabel={index as ActiveButton}
              withTooltip={withTooltip}
              onHover={changeHovered}
              tooltipFormatter={tooltipFormatter}
              value={val}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={val}
              tooltipZIndex={typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined}
              key={cnSlider('Point', { index })}
            />
          ))}
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
