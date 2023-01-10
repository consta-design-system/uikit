import './ChoiceGroup.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconCopy } from '@consta/icons/IconCopy';
import { IconFavoriteStroked } from '@consta/icons/IconFavoriteStroked';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

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

declare type Item = {
  label: string;
  icon: IconComponent;
  disabled?: boolean;
};

const items: Item[] = [
  {
    label: 'один',
    icon: IconCamera,
  },
  {
    label: 'два',
    icon: IconCopy,
    disabled: true,
  },
  {
    label: 'три',
    icon: IconFavoriteStroked,
    disabled: true,
  },
  {
    label: 'четыре',
    icon: IconCamera,
  },
  {
    label: 'пять',
    icon: IconCamera,
  },
];

const cnChoiceGroupVariants = cn('ChoiceGroupVariants');

const Variants = () => {
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const [value, setValue] = useState<Item | null>(null);

  const multiple = useBoolean('multiple', false);
  const width = useSelect('width', choiceGroupWidth, choiceGroupWidthDefault);
  const size = useSelect('size', choiceGroupSizes, choiceGroupDefaultSize);
  const view = useSelect('view', choiceGroupViews, choiceGroupDefaultView);
  const form = useSelect('form', choiceGroupForms, choiceGroupDefaultForm);
  const withIcon = useBoolean('withIcon', false);
  const onlyIcon = useBoolean('onlyIcon', false, Boolean(withIcon));
  const disabled = useBoolean('disabled', false);
  const disabledItem = useBoolean('disabledItem', false);

  const getItemIcon = withIcon ? (item: Item) => item.icon : () => undefined;
  const getItemDisabled = disabledItem
    ? (item: Item) => item.disabled
    : () => undefined;

  return (
    <form className={cnChoiceGroupVariants()}>
      <div className={cnChoiceGroupVariants('Component')}>
        {multiple ? (
          <ChoiceGroup
            items={items}
            value={valueMultiple}
            onChange={({ value }) => setValueMultiple(value)}
            name="ChoiceGroup"
            multiple
            size={size}
            view={view}
            width={width}
            form={form}
            onlyIcon={onlyIcon}
            getItemIcon={getItemIcon}
            disabled={disabled}
            getItemDisabled={getItemDisabled}
          />
        ) : (
          <ChoiceGroup
            items={items}
            value={value}
            onChange={({ value }) => setValue(value)}
            name="ChoiceGroup"
            multiple={false}
            size={size}
            view={view}
            width={width}
            form={form}
            onlyIcon={onlyIcon}
            getItemIcon={getItemIcon}
            disabled={disabled}
            getItemDisabled={getItemDisabled}
          />
        )}
      </div>
    </form>
  );
};

export default Variants;
