import './DateTimeSlider.css';

import { IconForward } from '@consta/icons/IconForward';
import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

type Data = {
  label: string | number;
  current?: boolean;
  valueRange?: number[];
  date: Date;
  items: {
    label: string;
    date: Date;
    current?: boolean;
  }[];
};

export type DateTimeSliderProps = PropsWithHTMLAttributes<
  {
    onChange?: (date: Date) => void;
    onPrev?: () => void;
    onNext?: () => void;
    children?: never;
    data: Data[];
  },
  HTMLDivElement
>;

export const cnDateTimeSlider = cn('DateTimeSlider');

const getCurrentItem = (data: Data[]) => {
  const index =
    data
      .find((item) => item.current)
      ?.items.findIndex((item) => item.current) || 0;

  return index < 0 ? 0 : index;
};

export const DateTimeSlider: React.FC<DateTimeSliderProps> = (props) => {
  const { className, onChange, data, onPrev, onNext, ...otherProps } = props;

  const currentItemIndex = getCurrentItem(data);

  return (
    <div {...otherProps} className={cnDateTimeSlider(null, [className])}>
      <Button
        className={cnDateTimeSlider('Button', { direction: 'prev' })}
        view="ghost"
        iconLeft={IconForward}
        type="button"
        onClick={onPrev}
      />
      <div
        className={cnDateTimeSlider('Slider')}
        style={{ ['--current-item' as string]: currentItemIndex }}
      >
        <div className={cnDateTimeSlider('SliderBody')}>
          <div className={cnDateTimeSlider('Selector')} />
          {data.map((year, index) => (
            <Text
              className={cnDateTimeSlider('ParentLabel', {
                position: index.toString(),
              })}
              weight="bold"
              size="s"
              key={year.label}
              view={year.current ? undefined : 'ghost'}
            >
              {year.label}
            </Text>
          ))}
          {data.map((year, index) => (
            <div
              key={year.label}
              className={cnDateTimeSlider('Parent', {
                position: index.toString(),
                selected: !!year.valueRange,
              })}
              style={
                year.valueRange && {
                  ['--value-offset' as string]: `${year.valueRange[0]}%`,
                  ['--value-width' as string]: `${year.valueRange[1]}%`,
                }
              }
            >
              {year.items.map((item, index) => (
                <button
                  className={cnDateTimeSlider('Item')}
                  key={index}
                  onFocus={() => onChange?.(item.date)}
                  type="button"
                >
                  <Text
                    className={cnDateTimeSlider('ItemLabel')}
                    size="2xs"
                    view="ghost"
                    align="center"
                  >
                    {item.label}
                  </Text>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={cnDateTimeSlider('Button', { direction: 'next' })}
        view="ghost"
        type="button"
        iconLeft={IconForward}
        onClick={onNext}
      />
    </div>
  );
};
