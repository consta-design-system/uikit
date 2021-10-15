import './Slider.css';

import React, { useEffect } from 'react';

import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Popover } from '../Popover/Popover';
import { Text } from '../Text/Text';

import { checkFill, getPercent } from './helpers';
import { useActive } from './useActive';
import { useSlider } from './useSlider';

export type SliderProps = Omit<
  PropsWithHTMLAttributes<
    {
      className?: string;
      step?: number | number[];
      min: number;
      max: number;
      disabled?: boolean;
      division?: boolean;
      getTooltipContent?: (value: number) => string;
      value?: number[] | number;
      onChange?: (
        event: Event | React.TouchEvent | React.MouseEvent,
        value: number,
        index: number,
      ) => void;
      onAfterChange?: (
        event: Event | React.TouchEvent | React.MouseEvent,
        value: number,
        index: number,
      ) => void;
      onChangeCommitted?: (
        event: Event | React.TouchEvent | React.MouseEvent,
        value: number[],
      ) => void;
      prefix?:
        | React.ReactNode
        | (({ value }: { value: number | number[] }) => React.ReactElement)
        | undefined;
      suffix?:
        | React.ReactNode
        | (({ value }: { value: number | number[] }) => React.ReactElement)
        | undefined;
    },
    HTMLDivElement
  >,
  'children'
>;

export const cnSlider = cn('Slider');

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(({ ...props }, ref) => {
  const { className, step = 1, disabled, getTooltipContent, division, prefix, suffix } = props;
  const {
    isActiveOne,
    changerActiveOne,
    isActiveTwo,
    changerActiveTwo,
    pointValueOne,
    pointValueTwo,
    clearActive,
  } = useActive();
  const {
    handleTouchStart,
    handleMouseDown,
    popoverPosition,
    sliderRef,
    valueDerived,
    dividedValue,
    minValue,
    maxValue,
    range,
    stopListening,
  } = useSlider(props, { clearActive, pointValueOne, pointValueTwo });

  useEffect(() => {
    return () => {
      if (isActiveOne || isActiveTwo) stopListening();
    };
  }, [minValue, maxValue, isActiveOne, isActiveTwo]);

  return (
    <div className={cnSlider({ disabled }, [className])} ref={ref}>
      {prefix && (
        <div className={cnSlider('Prefix', { disabled })}>
          {typeof prefix === 'function' ? prefix({ value: valueDerived }) : prefix}
        </div>
      )}
      <div
        role="button"
        aria-hidden="true"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        ref={sliderRef}
        className={cnSlider('Input', { division: division && !!step })}
      >
        {division && !!step && Array.isArray(dividedValue) && (
          <div className={cnSlider('Input-divided', { disabled })}>
            {dividedValue?.map((item: number, index: number) => (
              <div
                key={index}
                className={cnSlider(
                  'Input-divide',
                  {
                    first: index === 0,
                    last: index === dividedValue.length - 1,
                    fill: checkFill(
                      dividedValue?.reduce(
                        (acc, item, i) => (i <= index - 1 ? acc + item : acc),
                        0,
                      ),
                      valueDerived,
                      minValue,
                    ),
                    disabled,
                    focus:
                      isActiveOne ||
                      (isActiveTwo &&
                        checkFill(
                          dividedValue?.reduce(
                            (acc, item, i) => (i <= index - 1 ? acc + item : acc),
                            0,
                          ),
                          valueDerived,
                          minValue,
                        )),
                  },
                  [cnMixFocus()],
                )}
                style={{
                  width: `${Math.trunc(getPercent(item, minValue, maxValue))}%`,
                }}
              />
            ))}
          </div>
        )}
        {(!division || !step) && (
          <div
            className={cnSlider('Fill', { focus: isActiveOne || isActiveTwo, disabled }, [
              cnMixFocus(),
            ])}
            style={{
              width: `${getPercent(
                Array.isArray(valueDerived)
                  ? valueDerived[1] - valueDerived[0]
                  : valueDerived - minValue,
                minValue,
                maxValue,
              )}%`,
              left: `${Math.round(Array.isArray(valueDerived) ? valueDerived[0] : 0)}%`,
            }}
          />
        )}
        {range.current && (
          <>
            <button
              type="button"
              aria-label="Left pin"
              onMouseDown={changerActiveOne.on}
              onTouchStart={changerActiveOne.on}
              className={cnSlider('Point', { focus: isActiveOne || isActiveTwo, disabled }, [
                cnMixFocus(),
              ])}
              ref={pointValueOne}
              style={{
                left: `${Math.round(
                  Array.isArray(valueDerived) ? valueDerived[0] : valueDerived,
                )}%`,
              }}
            />
            {!!getTooltipContent && isActiveOne && (
              <Popover
                direction="downCenter"
                spareDirection="upCenter"
                offset={18}
                position={popoverPosition}
              >
                <div className={cnSlider('Tooltip')}>
                  <Text size="xs">
                    {Math.round(Array.isArray(valueDerived) ? valueDerived[0] : valueDerived)}
                  </Text>
                </div>
              </Popover>
            )}
          </>
        )}
        <button
          type="button"
          aria-label="Right pin"
          onMouseDown={changerActiveTwo.on}
          onTouchStart={changerActiveTwo.on}
          className={cnSlider('Point', { focus: isActiveOne || isActiveTwo, disabled }, [
            cnMixFocus(),
          ])}
          ref={pointValueTwo}
          style={{
            left: `${Math.trunc(
              getPercent(
                (Array.isArray(valueDerived) ? valueDerived[1] : valueDerived) - minValue,
                minValue,
                maxValue,
              ),
            )}%`,
          }}
        />
        {!!getTooltipContent && isActiveTwo && (
          <Popover
            direction="downCenter"
            spareDirection="upCenter"
            offset={18}
            position={popoverPosition}
          >
            <div className={cnSlider('Tooltip')}>
              <Text size="xs">
                {getTooltipContent(Array.isArray(valueDerived) ? valueDerived[1] : valueDerived)}
              </Text>
            </div>
          </Popover>
        )}
      </div>
      {suffix && (
        <div className={cnSlider('Suffix', { disabled })}>
          {typeof suffix === 'function' ? suffix({ value: valueDerived }) : suffix}
        </div>
      )}
    </div>
  );
});

export * from './helpers';
