import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Example } from '@consta/stand';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { FieldGroup } from '##/components/FieldGroup';
import { useFlag } from '##/hooks/useFlag';

import { AutoComplete } from '../../..';

type Item = {
  label: string;
  id: number | string;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

const Icon = withAnimateSwitcherHOC({
  startIcon: IconArrowDown,
  startDirection: 0,
  endDirection: 180,
});

export const AutoCompleteExampleDropdownOpen = () => {
  const [value, setValue] = useState<string | null>();
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
          <AutoComplete
            inputRef={inputRef}
            placeholder="Выберите вариант"
            items={items}
            value={value}
            onChange={setValue}
            dropdownOpen={open}
            onDropdownOpen={onDropdownOpen}
            ignoreOutsideClicksRefs={[buttonRef]}
            searchFunction={(item, searchValue) => {
              if (!searchValue) {
                return true;
              }
              return (
                item.label
                  .toLocaleLowerCase()
                  .indexOf(searchValue.toLocaleLowerCase()) !== -1
              );
            }}
          />
        </FieldGroup>
      </AnimateIconSwitcherProvider>
    </Example>
  );
};
