import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import {
  Checkbox,
  checkboxPropAlign,
  checkboxPropAlignDefault,
  checkboxPropSize,
  checkboxPropSizeDefault,
  checkboxPropView,
  checkboxPropViewDefault,
} from '../Checkbox';

import mdx from './Checkbox.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  intermediate: boolean('intermediate', false),
  size: select('size', checkboxPropSize, checkboxPropSizeDefault),
  view: select('view', checkboxPropView, checkboxPropViewDefault),
  align: select('align', checkboxPropAlign, checkboxPropAlignDefault),
  label: text('label', 'Отметьте меня'),
});

const cnCheckboxStories = cn('CheckboxStories');

export function Playground() {
  const { disabled, intermediate, size, view, align, label } = defaultKnobs();

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }) => setChecked(checked);

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div className={cnCheckboxStories()}>
        <Checkbox
          disabled={disabled}
          intermediate={intermediate}
          size={size}
          view={view}
          label={label}
          onChange={handleChange}
          checked={checked}
          align={align}
        />
      </div>
    </EventInterceptorProvider>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Checkbox',
  id: 'components/Checkbox',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=56%3A37365',
    },
  },
});
