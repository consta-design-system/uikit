import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import {
  SwitchGroup,
  switchGroupDefaultDirection,
  switchGroupDefaultSize,
  switchGroupDefaultView,
  switchGroupDirections,
  switchGroupSizes,
  switchGroupViews,
} from '../SwitchGroupDeprecated';

const cnSwitchGroupVariants = cn('SwitchGroupVariants');

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'Свет' },
  { name: 'Вентилятор' },
  { name: 'Кондиционер — не работает', disabled: true },
  { name: 'Чайник' },
  { name: 'Кофеварка' },
];

const Variants = () => {
  const size = useSelect('size', switchGroupSizes, switchGroupDefaultSize);
  const view = useSelect('view', switchGroupViews, switchGroupDefaultView);
  const direction = useSelect(
    'direction',
    switchGroupDirections,
    switchGroupDefaultDirection,
  );
  const disabled = useBoolean('disabled', false);

  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <div className={cnSwitchGroupVariants()}>
      <form>
        <SwitchGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name={cnSwitchGroupVariants()}
          direction={direction}
          size={size}
          view={view}
          disabled={disabled}
        />
      </form>
    </div>
  );
};

export default Variants;
