import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Example } from '@consta/stand';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { DatePicker } from '##/components/DatePicker/DatePicker';
import { FieldGroup } from '##/components/FieldGroup';
import { useFlag } from '##/hooks/useFlag';

const Icon = withAnimateSwitcherHOC({
  startIcon: IconArrowDown,
  startDirection: 0,
  endDirection: 180,
});

export const DatePickerExampleDropdownOpen = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [open, setOpen] = useFlag();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
    if (open) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <Example col={1}>
      <AnimateIconSwitcherProvider active={open}>
        <FieldGroup>
          <Button
            ref={buttonRef}
            label={open ? 'Закрыть' : 'Открыть'}
            onClick={setOpen.toggle}
            iconLeft={Icon}
            onlyIcon
          />
          <DatePicker
            inputRef={inputRef}
            placeholder="Выберите вариант"
            value={value}
            onChange={({ value }) => setValue(value)}
            dropdownOpen={open}
            onDropdownOpen={onDropdownOpen}
            ignoreOutsideClicksRefs={[buttonRef]}
          />
        </FieldGroup>
      </AnimateIconSwitcherProvider>
    </Example>
  );
};
