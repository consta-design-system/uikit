import { boolean, select } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
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
import mdx from './ChoiceGroup.docs.mdx';

declare type Item = {
  name: string;
  icon: IconComponent;
  disabled?: boolean;
};

const items = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
    icon: IconCopy,
    disabled: true,
  },
  {
    name: 'три',
    icon: IconFavorite,
    disabled: true,
  },
  {
    name: 'четыре',
    icon: IconCamera,
  },
  {
    name: 'пять',
    icon: IconCamera,
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
  disabled: boolean('disabled', false),
  disabledItem: boolean('disabledItem', false),
});

const cnChoiceGroupStories = cn('ChoiceGroupStories');

export const Playground = () => {
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const [value, setValue] = useState<Item | null>(null);
  const {
    multiple,
    size,
    view,
    width,
    form,
    withIcon,
    onlyIcon,
    disabled,
    disabledItem,
  } = defaultKnobs();

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
            disabled={disabled}
            getDisabled={disabledItem ? (item) => item.disabled : undefined}
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
            disabled={disabled}
            getDisabled={disabledItem ? (item) => item.disabled : undefined}
          />
        )}
      </form>
    </div>
  );
};

export default createMetadata({
  title: 'Компоненты|/Базовые/ChoiceGroup',
  id: 'components/ChoiceGroup',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5156%3A79693',
    },
  },
});
