import * as React from 'react';
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
import { Slider, sliderPropSize, sliderPropSizeDefault } from '../Slider';

import mdx from './Slider.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  division: boolean('division', true),
  size: select('Size', sliderPropSize, sliderPropSizeDefault),
  classname: text('classname', 'inputRange'),
  step: number('step', 25),
  customStep: boolean('customStep', false),
  min: number('minValue', -50),
  max: number('maxValue', 200),
  withTooltip: boolean('withTooltip', true),
  range: boolean('range', false),
  prefix: boolean('prefix', false),
  suffix: boolean('suffix', false),
});

const cnSliderStories = cn('SliderStories');

export function Playground() {
  const { range, prefix, suffix, customStep, size, step, ...props } = defaultKnobs();

  const value = React.useMemo(() => (range ? [0, 60] : 0), [range]);

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div className={cnSliderStories()}>
        <Slider
          {...props}
          prefix={
            prefix &&
            (({ value }) => (
              <TextField size={size} value={(Array.isArray(value) ? value[0] : value).toString()} />
            ))
          }
          suffix={suffix && <IconSettings />}
          step={customStep ? [20, 17, 22, 20] : step}
          value={value}
          onChange={action('onChange')}
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
