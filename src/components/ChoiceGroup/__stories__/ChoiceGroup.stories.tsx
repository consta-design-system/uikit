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
  choiceGroupWidth,
  choiceGroupWidthDefault,
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
  width: select('width', choiceGroupWidth, choiceGroupWidthDefault),
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
  const { multiple, size, view, width, form, withIcon, onlyIcon } = defaultKnobs();

  const getIcon = withIcon ? (item: Item) => item.icon : undefined;
  const getLabel = (item: Item) => item.name;

  return (
    <div className={cnChoiceGroupStories()}>
      <form>
        {multiple ? (
          <ChoiceGroup
            items={items}
            value={valueMultiple}
            getLabel={getLabel}
            onChange={({ value }) => setValueMultiple(value)}
            name={cnChoiceGroupStories()}
            multiple
            size={size}
            view={view}
            width={width}
            form={form}
            onlyIcon={onlyIcon}
            getIcon={getIcon}
          />
        ) : (
          <ChoiceGroup
            items={items}
            value={value}
            getLabel={getLabel}
            onChange={({ value }) => setValue(value)}
            name={cnChoiceGroupStories()}
            multiple={false}
            size={size}
            view={view}
            width={width}
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
  title: 'Компоненты|/ChoiceGroup',
  id: 'components/ChoiceGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
