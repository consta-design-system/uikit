import React, { useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconCopy } from '../../../icons/IconCopy/IconCopy';
import { IconFavorite } from '../../../icons/IconFavorite/IconFavorite';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  ChoiceGroup,
  choiceGroupDefaultForm,
  choiceGroupDefaultSize,
  choiceGroupDefaultView,
  choiceGroupForms,
  choiceGroupSizes,
  choiceGroupViews,
} from '../ChoiceGroup';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './ChoiceGroup.mdx';

declare type Item = {
  name: string;
  icon: React.FC<IconProps>;
};

const items = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
    icon: IconCopy,
  },
  {
    name: 'три',
    icon: IconFavorite,
  },
];

const defaultKnobs = () => ({
  multiple: boolean('multiple', false),
  size: select('size', choiceGroupSizes, choiceGroupDefaultSize),
  view: select('view', choiceGroupViews, choiceGroupDefaultView),
  form: select('form', choiceGroupForms, choiceGroupDefaultForm),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

const cnChoiceGroupStories = cn('ChoiceGroupStories');

export function Playground() {
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const [value, setValue] = useState<Item | null>(null);
  const { multiple, size, view, form, withIcon, onlyIcon } = defaultKnobs();

  const getIcon = withIcon ? (item: Item) => item.icon : undefined;
  const getLabel = (item: Item) => item.name;
  const onChangeMultiple = ({ value }: { value: Item[] | null }) => setValueMultiple(value);
  const onChange = ({ value }: { value: Item | null }) => setValue(value);

  return (
    <div className={cnChoiceGroupStories()}>
      <form>
        {multiple ? (
          <ChoiceGroup
            items={items}
            value={valueMultiple}
            getLabel={getLabel}
            onChange={onChangeMultiple}
            name={cnChoiceGroupStories()}
            multiple
            size={size}
            view={view}
            form={form}
            onlyIcon={onlyIcon}
            getIcon={getIcon}
          />
        ) : (
          <ChoiceGroup
            items={items}
            value={value}
            getLabel={getLabel}
            onChange={onChange}
            name={cnChoiceGroupStories()}
            multiple={false}
            size={size}
            view={view}
            form={form}
            onlyIcon={onlyIcon}
            getIcon={getIcon}
          />
        )}
      </form>
    </div>
  );
}

export default createMetadata({
  title: 'Components|/ChoiceGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
