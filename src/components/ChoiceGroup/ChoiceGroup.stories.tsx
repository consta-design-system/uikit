import React, { useState, Fragment } from 'react';
import { select, boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ChoiceGroup } from '../ChoiceGroup/ChoiceGroup';
import { IIcon } from '../Icon';
import IconCamera from '../Icon/icons/Camera';
import IconCopy from '../Icon/icons/Copy';
import IconFavorite from '../Icon/icons/Favorite';

declare type Item = {
  name: string;
  icon?: React.FC<IIcon>;
};

const items = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
  {
    name: 'три',
    icon: IconFavorite,
  },
  {
    name: 'четыре',
  },
];

const onlyIconItems = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
    icon: IconCopy,
  },
  {
    name: 'четыре',
    icon: IconFavorite,
  },
];

const twoItems = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
];

const knobs = () => ({
  multiply: boolean('multiply', false),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['primary', 'ghost', 'secondary'], 'primary'),
  form: select('form', ['default', 'round', 'brick'], 'default'),
});

storiesOf('ChoiceGroup', module)
  .addDecorator(withKnobs)
  .add('Custom', () => {
    const [value, setValue] = useState<Item[] | null>(null);
    const [onlyIconValue, setOnlyIconValue] = useState<Item[] | null>(null);
    const [twoItemsValue, setTwoItemsValue] = useState<Item[] | null>(null);

    console.log(value);
    console.log(onlyIconValue);

    return (
      <Fragment>
        <form className="decorator decorator_indent-b_m">
          <ChoiceGroup<Item>
            {...knobs()}
            items={items}
            value={value}
            getItemKey={(item) => item.name}
            getItemLabel={(item) => item.name}
            onChange={({ value }) => setValue(value)}
            getItemIcon={(item) => item.icon}
            name="ChoiceGroup"
          />
        </form>
        <form className="decorator decorator_indent-b_m">
          <ChoiceGroup<Item>
            {...knobs()}
            onlyIcon={true}
            items={onlyIconItems}
            value={onlyIconValue}
            getItemKey={(item) => item.name}
            getItemLabel={(item) => item.name}
            onChange={({ value }) => setOnlyIconValue(value)}
            getItemIcon={(item) => item.icon}
            name="ChoiceGroup2"
          />
        </form>
        <form className="decorator decorator_indent-b_m">
          <ChoiceGroup<Item>
            {...knobs()}
            items={twoItems}
            value={twoItemsValue}
            getItemKey={(item) => item.name}
            getItemLabel={(item) => item.name}
            onChange={({ value }) => setTwoItemsValue(value)}
            getItemIcon={(item) => item.icon}
            name="ChoiceGroup"
          />
        </form>
      </Fragment>
    );
  });
