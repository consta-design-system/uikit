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
import { TextField, textFieldPropSize, textFieldPropSizeDefault } from '../../TextField/TextField';
import { Slider } from '../Slider';

import mdx from './Slider.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  division: boolean('division', true),
  classname: text('classname', 'inputRange'),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  step: number('step', 25),
  customStep: boolean('customStep', false),
  min: number('minValue', -50),
  max: number('maxValue', 200),
  withTooltip: boolean('withTooltip', true),
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
    ...props
  } = defaultKnobs();
  const [value, setValue] = useState([50]);
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = () => {
    setValue((prev) => (prev.length > 1 ? [Number(inputValue), prev[1]] : [Number(inputValue)]));
    setInputValue(undefined);
  };

  const getValue = useCallback((val) => {
    return val;
  }, []);

  useEffect(() => {
    setValue(range ? [0, 50] : [50]);
  }, [range]);

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div className={cnSliderStories()}>
        <Slider
          disabled={disabled}
          getTooltipContent={getValue}
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
                value={inputValue || (Array.isArray(value) ? value[0] : value || 0).toString()}
                className={cnSliderStories('Textfield', { prefix })}
                onChange={(e) => setInputValue(e.value || '0')}
                onBlur={handleChange}
                disabled={disabled}
                required
              />
            ))
          }
          suffix={
            suffix && <IconSettings className={cnSliderStories('Icon', { disabled, suffix })} />
          }
          step={customStep ? [20, 17, 22, 20] : step}
          value={range ? value : value[0]}
          onChange={action('onChange')}
          onChangeCommitted={(_, v) => setValue(v)}
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
