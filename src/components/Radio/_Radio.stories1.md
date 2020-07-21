import React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Radio } from './Radio';

const knobs = () => ({
checked: boolean('checked', false),
disabled: boolean('disabled', false),
size: select('size', ['m', 'l'], 'm'),
label: text('label', 'I am radio'),
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

storiesOf('Radio', module)
.addDecorator(withKnobs)
.add('Радио кнопка', () => {
return <Radio {...knobs()} onChange={emptyFunction} />;
});
