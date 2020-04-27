import * as React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withDocs } from '@storybook-addons/docs';
import { storiesOf } from '@storybook/react';
import { IconUser } from '../../icons/IconUser/IconUser';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from './Badge';

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
        content: require('./Badge.md')['default'],
      },
    })
  )
  // .addDecorator(
  //   figmaDecorator({
  //     url: 'https://www.figma.com/file/FLCwrJTceo6xB9VInayasa/UI-Kit%2FDefault?node-id=2222%3A5588',
  //   })
  // )
  .add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/Badge', module)
  .add('_size', () => (
    <StoryBookExample>
      <Badge size="s" label="Badge" />
      <Badge size="m" label="Badge" />
      <Badge size="l" label="Badge" />
    </StoryBookExample>
  ))
  .add('_view', () => (
    <StoryBookExample>
      <Badge view="filled" label="Badge" />
      <Badge view="stroked" label="Badge" />
    </StoryBookExample>
  ))
  .add('_status', () => (
    <StoryBookExample>
      <Badge status="success" label="Badge" />
      <Badge status="error" label="Badge" />
      <Badge status="warning" label="Badge" />
      <Badge status="normal" label="Badge" />
      <Badge status="system" label="Badge" />
    </StoryBookExample>
  ))
  .add('_minified', () => (
    <StoryBookExample>
      <Badge minified label="Badge" />
    </StoryBookExample>
  ))
  .add('_icon', () => (
    <StoryBookExample>
      <Badge icon={IconUser} label="Badge" />
    </StoryBookExample>
  ))
  .add('_as', () => (
    <StoryBookExample>
      <Badge<{ href: string }> as="a" href="#" label="Badge" />
    </StoryBookExample>
  ));
