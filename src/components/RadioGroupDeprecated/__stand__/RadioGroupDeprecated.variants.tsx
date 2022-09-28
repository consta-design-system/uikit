import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Item, items } from '../__mocks__/data.mock';
import {
  RadioGroup,
  radioGroupDefaultDirection,
  radioGroupDefaultSize,
  radioGroupDefaultView,
  radioGroupDirections,
  radioGroupPropAlign,
  radioGroupPropAlignDefault,
  radioGroupSizes,
  radioGroupViews,
} from '../RadioGroupDeprecated';

const Variants = () => {
  const direction = useSelect(
    'direction',
    radioGroupDirections,
    radioGroupDefaultDirection,
  );
  const size = useSelect('size', radioGroupSizes, radioGroupDefaultSize);
  const view = useSelect('view', radioGroupViews, radioGroupDefaultView);
  const disabled = useBoolean('disabled', false);
  const disabledItem = useBoolean('disabledItem', false);
  const align = useSelect(
    'align',
    radioGroupPropAlign,
    radioGroupPropAlignDefault,
  );

  const [value, setValue] = React.useState<Item | null>(null);

  const onChange = ({ value }: { value: Item }) => setValue(value);

  return (
    <form>
      <RadioGroup
        align={align}
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={disabledItem ? (item) => item.disabled : undefined}
        onChange={onChange}
        name="RadioGroupVariants"
        direction={direction}
        size={size}
        view={view}
        disabled={disabled}
      />
    </form>
  );
};

export default Variants;
