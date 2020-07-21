import \* as React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Checkbox } from './Checkbox';

const knobs = () => ({
disabled: boolean('disabled', false),
intermediate: boolean('intermediate', false),
size: select('size', ['m', 'l'], 'm'),
label: text('label', 'Check me, baby!'),
});

storiesOf('Checkbox', module)
.addDecorator(withKnobs)
.add('Чекбокс', () => {
const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    return <Checkbox onChange={handleChange} checked={checked} {...knobs()} />;

});
