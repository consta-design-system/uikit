import './Slider.css';

import { IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef, useRef, useState } from 'react';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { FieldCaption } from '##/components/FieldCaption';
import { FieldLabel } from '##/components/FieldLabel';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useSortSteps } from '##/hooks/useSortSteps';
import { cn } from '##/utils/bem';

import {
  defaultPropSize,
  defaultTooltipFormatter,
  getIcon,
  getMaxForStartField,
  getMinForEndField,
  getOnChandgeForInput,
  getValidStep,
  getValueForInput,
  isRangeParams,
  PropSize,
  SliderComponent,
  SliderProps,
} from './helper';
import { SliderInput } from './SliderInput/SliderInput';
import { SliderLine } from './SliderLine/SliderLine';
import { SliderPoint } from './SliderPoint/SliderPoint';
import { ActiveButton } from './useSlider/helper';
import { useSlider } from './useSlider/useSlider';
import { useSliderStationing } from './useSliderStationing';

const cnSlider = cn('Slider');

const sizeMap: Record<PropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

export const COMPONENT_NAME = 'Slider' as const;

const SliderRender = <RANGE extends boolean = false>(
  props: SliderProps<RANGE>,
  ref: React.Ref<HTMLDivElement>,
) => {
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
    labelIcon,
    status,
    caption,
    tooltipFormatter = defaultTooltipFormatter,
    className,
    style,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, sliderRef);

  const [focusIndex, setFocusIndex] = useState<number | undefined>();
  const [isHovered, { on, off }] = useFlag(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const sortedSteps = useSortSteps({
    step: getValidStep(min, max, stepProp),
    min,
    max,
  });
  const step = stepProp ? sortedSteps : Math.abs((max - min) / 100);
  const IconRight = getIcon(rightSide);
  const IconLeft = getIcon(leftSide);
  const iconSize = sizeMap[size];

  const {
    onKeyPress,
    onFocus,
    handlePress,
    onSliderClick,
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
    containerRef,
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

  const containerProps = {
    role: 'button',
    tabIndex: 0,
    className: cnSlider('Control'),
    ref: sliderRef,
    onClick: onSliderClick,
  };

  const changeHovered = (status: boolean) => {
    if (status) on();
    else off();
  };

  return (
    <div
      ref={useForkRef([ref, containerRef])}
      className={cnSlider({ size }, [className])}
      style={style}
      {...otherProps}
    >
      {label && (
        <FieldLabel icon={labelIcon} className={cnSlider('Label')} size={size}>
          {label}
        </FieldLabel>
      )}
      <div className={cnSlider('Container')}>
        {(leftSide === 'input' || IconLeft) && (
          <div className={cnSlider('Side', { position: 'left' })}>
            {leftSide === 'input' && (
              <SliderInput
                value={getValueForInput(props, 0)}
                onFocus={() => setFocusIndex(0)}
                onBlur={() => setFocusIndex(undefined)}
                onChange={getOnChandgeForInput(props, 0)}
                size={size}
                min={min}
                inputMode="numeric"
                max={getMaxForStartField(props)}
                status={status}
                step={step}
                disabled={disabled}
              />
            )}
            {IconLeft && (
              <IconLeft size={iconSize ?? undefined} view="secondary" />
            )}
          </div>
        )}
        <div {...containerProps}>
          <SliderLine
            hovered={isHovered || typeof activeButton === 'number'}
            onHover={changeHovered}
            lines={lineSizes}
            disabled={disabled}
            view={view}
          />
          {currentValue.map((val, index) => {
            // let isActive = true;
            // if (
            //   currentValue.length > 1 &&
            //   currentValue[0] === currentValue[1]
            // ) {
            //   if (index === 0 && val === min) {
            //     isActive = false;
            //   }
            //   if (index === 1 && val === max) {
            //     isActive = false;
            //   }
            // }
            const topLayer =
              currentValue.length > 1 &&
              currentValue[0] === currentValue[1] &&
              val === max &&
              index === 0;
            return (
              <SliderPoint
                hovered={isHovered || typeof activeButton === 'number'}
                buttonRef={leftButtonRef}
                popoverPosition={popoverPosition[index]}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                handlePress={handlePress}
                disabled={disabled}
                active={topLayer}
                position={buttonPositions[index]}
                focused={activeButton === index || focusIndex === index}
                buttonLabel={index as ActiveButton}
                withTooltip={withTooltip}
                onHover={changeHovered}
                tooltipFormatter={tooltipFormatter}
                value={val}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={val}
                tooltipZIndex={
                  typeof style?.zIndex === 'number'
                    ? style.zIndex + 1
                    : undefined
                }
                key={cnSlider('Point', { index })}
              />
            );
          })}
        </div>
        {(rightSide === 'input' || IconRight) && (
          <div className={cnSlider('Side', { position: 'right' })}>
            {rightSide === 'input' && (
              <SliderInput
                value={getValueForInput(props, 1)}
                onChange={getOnChandgeForInput(props, 1)}
                onBlur={() => setFocusIndex(undefined)}
                size={size}
                min={getMinForEndField(props)}
                max={max}
                onFocus={() => setFocusIndex(isRangeParams(props) ? 1 : 0)}
                inputMode="numeric"
                status={status}
                step={step}
                disabled={disabled}
              />
            )}
            {IconRight && <IconRight size={iconSize} view="secondary" />}
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
};

export const Slider = forwardRef(SliderRender) as SliderComponent;
