import React, { useState } from 'react';
import { withDocs } from '@storybook-addons/docs';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IIcon } from '../../icons/Icon/Icon';
import { IconCamera } from '../../icons/IconCamera/IconCamera';
import { IconPhoto } from '../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../icons/IconRing/IconRing';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';

import { Tabs } from './Tabs';
import md from './Tabs.md';

type Item = {
  name?: string;
  icon?: React.FC<IIcon>;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Очень длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
];

function Stories({ size, view, onlyIcon, withIcon }) {
  const [value, setValue] = useState<Item[] | null>([
    {
      name: 'Первый',
      icon: IconPhoto,
    },
  ]);

  return (
    <Tabs
      items={items}
      value={value}
      getItemKey={(item) => item.name}
      getItemLabel={(item) => item.name}
      getItemIcon={withIcon ? (item) => item.icon : null}
      onChange={({ value }) => setValue(value)}
      size={size}
      view={view}
      onlyIcon={onlyIcon}
    />
  );
}

const knobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

storiesOf('UI-KIT|/Tabs', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: md,
      },
    }),
  )
  .add('playground', () => <Stories {...knobs()} />);

storiesOf('UI-KIT|/Examples/Tabs', module)
  .add('_size', () => {
    type Item = string;
    const items: Item[] = ['один', 'два', 'три'];
    const [value, setValue] = useState<Item[]>(['три']);
    return (
      <StoryBookExample>
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          size="m"
        />
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          size="s"
        />
      </StoryBookExample>
    );
  })
  .add('_view', () => {
    type Item = string;
    const items = ['один', 'два', 'три'];
    const [value, setValue] = useState<Item[]>(['три']);
    return (
      <StoryBookExample>
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          view="bordered"
        />
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          view="clear"
        />
      </StoryBookExample>
    );
  })
  .add('_icon', () => {
    type Item = {
      name?: string;
      icon?: React.FC<IIcon>;
    };
    const items = [
      {
        name: 'Первый',
        icon: IconPhoto,
      },
      {
        name: 'Второй',
        icon: IconRing,
      },
      {
        name: 'Третий вариант',
        icon: IconCamera,
      },
    ];
    const [value, setValue] = useState<Item[]>([
      {
        name: 'Первый',
        icon: IconPhoto,
      },
    ]);
    return (
      <StoryBookExample>
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
        />
      </StoryBookExample>
    );
  });
