/* eslint-disable no-console */
import './Slider.stories.css';

import React, { useCallback, useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import { TextField } from '../../TextField/TextField';
import { Slider, SliderPropSize, SliderPropSizeDefault } from '../Slider';

import mdx from './Slider.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  division: boolean('division', false),
  classname: text('classname', 'inputRange'),
  size: select('size', SliderPropSize, SliderPropSizeDefault),
  step: number('step', 25),
  customStep: boolean('customStep', false),
  min: number('minValue', 0),
  max: number('maxValue', 100),
  withTooltip: boolean('withTooltip', false),
  range: boolean('range', false),
  prefix: boolean('prefix', true),
  suffix: boolean('suffix', false),
});

const cnSliderStories = cn('SliderStories');

export function Playground() {
  const {
    range,
    prefix,
    suffix,
    disabled,
    customStep,
    size,
    step,
    min,
    max,
    withTooltip,
    ...props
  } = defaultKnobs();
  const [value, setValue] = useState([50]);
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = () => {
    setValue((prev) => (prev.length > 1 ? [Number(inputValue), prev[1]] : [Number(inputValue)]));
    setInputValue(undefined);
  };

  const changeInput = useCallback(
    (e) => {
      setInputValue(`${e.value}`);
    },
    [inputValue],
  );

  const getValue = useCallback((val) => {
    return Math.round(val).toString();
  }, []);

  useEffect(() => {
    setValue(range ? [0, 50] : [50]);
  }, [range]);

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div className={cnSliderStories()}>
        <Slider
          disabled={disabled}
          getTooltipContent={withTooltip ? getValue : undefined}
          min={min}
          max={max}
          {...props}
          prefix={
            prefix &&
            !range &&
            (({ value }) => (
              <TextField
                type="number"
                size={size}
                min={min}
                max={max}
                step={customStep ? 1 : step}
                value={
                  inputValue || (Array.isArray(value) ? value[0] : Math.round(value)).toString()
                }
                className={cnSliderStories('Textfield', { prefix })}
                onChange={changeInput}
                onBlur={handleChange}
                onFocus={handleChange}
                disabled={disabled}
                required
              />
            ))
          }
          suffix={
            suffix && (
              <IconSettings className={cnSliderStories('Icon', { disabled, suffix })} size={size} />
            )
          }
          step={customStep ? [6, 19, 33, 57, 74, 96] : step}
          value={range ? value : Math.round(Number(inputValue))}
          onChange={action('onChange')}
          onChangeCommitted={action('onChangeCommitted')}
        />
      </div>
    </EventInterceptorProvider>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Slider',
  id: 'components/Slider',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/drPhFwevwowj4e4xRgRppT/%D0%93%D0%9F%D0%9D-%7C-Consta-%7C-Slider?node-id=4%3A61527',
    },
  },
});
