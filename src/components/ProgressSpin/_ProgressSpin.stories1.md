import \* as React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';

import { ProgressSpin } from './ProgressSpin';
import md from './ProgressSpin.md';

function Stories({ size, progress, animation }) {
return <ProgressSpin size={size} progress={progress} animation={animation} />;
}

const defaultKnobs = () => ({
progress: number('progress', 50),
size: select('size', ['s', 'm'], 'm'),
animation: boolean('animation', false),
});

storiesOf('UI-KIT|/ProgressSpin', module)
.addDecorator(withKnobs)
.addDecorator(
withDocs({
readme: {
content: md,
},
}),
)
.add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/ProgressSpin', module)
.add('\_size', () => (
<StoryBookExample>
<ProgressSpin progress={70} size="m" />
<ProgressSpin progress={70} size="s" />
</StoryBookExample>
))
.add('\_progress', () => (
<StoryBookExample>
<ProgressSpin progress={20} size="m" />
<ProgressSpin progress={40} size="m" />
<ProgressSpin progress={60} size="m" />
<ProgressSpin progress={80} size="m" />
</StoryBookExample>
));
