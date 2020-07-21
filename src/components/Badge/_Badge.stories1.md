import \* as React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconUser } from '../../icons/IconUser/IconUser';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';

import { Badge } from './Badge';
import md from './Badge.md';

function Stories({ label, size, view, status, form, minified, icon }) {
const Icon = icon ? IconUser : null;
return (
<Badge
      icon={Icon}
      label={label}
      size={size}
      view={view}
      status={status}
      form={form}
      minified={minified}
    />
);
}

const defaultKnobs = () => ({
label: text('label', 'Statusing along'),
size: select('size', ['s', 'm', 'l'], 'm'),
view: select('view', ['filled', 'stroked'], 'filled'),
status: select('status', ['success', 'error', 'warning', 'normal', 'system'], 'success'),
form: select('form', ['default', 'round'], 'default'),
minified: boolean('minified', false),
icon: boolean('icon', false),
});

storiesOf('UI-KIT|/Badge', module)
.addDecorator(withKnobs)
.addDecorator(
withDocs({
readme: {
content: md,
},
}),
)
.add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/Badge', module)
.add('\_size', () => (
<StoryBookExample>
<Badge size="s" label="Badge" />
<Badge size="m" label="Badge" />
<Badge size="l" label="Badge" />
</StoryBookExample>
))
.add('\_view', () => (
<StoryBookExample>
<Badge view="filled" label="Badge" />
<Badge view="stroked" label="Badge" />
</StoryBookExample>
))
.add('\_status', () => (
<StoryBookExample>
<Badge status="success" label="Badge" />
<Badge status="error" label="Badge" />
<Badge status="warning" label="Badge" />
<Badge status="normal" label="Badge" />
<Badge status="system" label="Badge" />
</StoryBookExample>
))
.add('\_minified', () => (
<StoryBookExample>
<Badge minified label="Badge" />
</StoryBookExample>
))
.add('\_icon', () => (
<StoryBookExample>
<Badge icon={IconUser} label="Badge" />
</StoryBookExample>
))
.add('\_as', () => (
<StoryBookExample>
<Badge as="a" href="#" label="Badge" />
</StoryBookExample>
));
