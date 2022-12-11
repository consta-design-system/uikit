import './ChoiceGroup.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconCopy } from '@consta/icons/IconCopy';
import { IconFavoriteStroked } from '@consta/icons/IconFavoriteStroked';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { cnDeprecated } from '##/utils/bem';

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
} from '../ChoiceGroupDeprecated';

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
    icon: IconFavoriteStroked,
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

const cnChoiceGroupVariants = cnDeprecated('ChoiceGroupVariants');

const Variants = () => {
  const multiple = useBoolean('multiple', false);
  const width = useSelect('width', choiceGroupWidth, choiceGroupWidthDefault);
  const size = useSelect('size', choiceGroupSizes, choiceGroupDefaultSize);
  const view = useSelect('view', choiceGroupViews, choiceGroupDefaultView);
  const form = useSelect('form', choiceGroupForms, choiceGroupDefaultForm);
  const withIcon = useBoolean('withIcon', false);
  const onlyIcon = useBoolean('onlyIcon', false, Boolean(withIcon));
  const disabled = useBoolean('disabled', false);
  const disabledItem = useBoolean('disabledItem', false);

  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const [value, setValue] = useState<Item | null>(null);

  const getIcon = withIcon ? (item: Item) => item.icon : undefined;
  const getLabel = (item: Item) => item.name;

  return (
    <form className={cnChoiceGroupVariants()}>
      <div className={cnChoiceGroupVariants('Component')}>
        {multiple ? (
          <ChoiceGroup
            items={items}
            value={valueMultiple}
            getLabel={getLabel}
            onChange={({ value }) => setValueMultiple(value)}
            name="ChoiceGroup"
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
            className={cnChoiceGroupVariants('Component')}
            items={items}
            value={value}
            getLabel={getLabel}
            onChange={({ value }) => setValue(value)}
            name="ChoiceGroup"
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
      </div>
    </form>
  );
};

export default Variants;
