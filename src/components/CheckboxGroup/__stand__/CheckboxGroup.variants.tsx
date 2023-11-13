import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import {
  CheckboxGroup,
  checkboxGroupDefaultAlign,
  checkboxGroupDefaultDirection,
  checkboxGroupDefaultSize,
  checkboxGroupDefaultView,
  checkboxGroupPropAlign,
  checkboxGroupPropDirections,
  checkboxGroupPropSizes,
  checkboxGroupPropViews,
} from '../CheckboxGroup';

type Item = {
  label: string;
  disabled?: boolean;
};

const items: Item[] = [
  { label: 'один' },
  { label: 'два' },
  { label: 'три' },
  { label: 'disabled', disabled: true },
  { label: 'пять' },
];

const Variants = () => {
  const size = useSelect(
    'size',
    checkboxGroupPropSizes,
    checkboxGroupDefaultSize,
  );
  const view = useSelect(
    'view',
    checkboxGroupPropViews,
    checkboxGroupDefaultView,
  );
  const direction = useSelect(
    'direction',
    checkboxGroupPropDirections,
    checkboxGroupDefaultDirection,
  );
  const align = useSelect(
    'align',
    checkboxGroupPropAlign,
    checkboxGroupDefaultAlign,
  );
  const disabled = useBoolean('disabled', false);

  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <form>
      <CheckboxGroup
        value={value}
        items={items}
        onChange={setValue}
        name="CheckboxGroup"
        direction={direction}
        size={size}
        view={view}
        disabled={disabled}
        align={align}
      />
    </form>
  );
};

export default Variants;
