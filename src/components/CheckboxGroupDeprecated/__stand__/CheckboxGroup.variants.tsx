import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import {
  CheckboxGroup,
  checkboxGroupDefaultDirection,
  checkboxGroupDefaultSize,
  checkboxGroupDefaultView,
  checkboxGroupDirections,
  checkboxGroupSizes,
  checkboxGroupViews,
} from '../CheckboxGroupDeprecated';

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три' },
  { name: 'disabled', disabled: true },
  { name: 'пять' },
];

const Variants = () => {
  const size = useSelect('size', checkboxGroupSizes, checkboxGroupDefaultSize);
  const view = useSelect('view', checkboxGroupViews, checkboxGroupDefaultView);
  const direction = useSelect(
    'direction',
    checkboxGroupDirections,
    checkboxGroupDefaultDirection,
  );
  const disabled = useBoolean('disabled', false);

  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <form>
      <CheckboxGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
        direction={direction}
        size={size}
        view={view}
        disabled={disabled}
      />
    </form>
  );
};

export default Variants;
