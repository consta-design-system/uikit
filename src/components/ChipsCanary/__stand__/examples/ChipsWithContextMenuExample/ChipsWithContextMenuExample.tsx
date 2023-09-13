import './ChipsWithContextMenuExample.css';

import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconSelect } from '@consta/icons/IconSelect';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { ChipsItem } from '##/components/ChipsCanary/';
import { ContextMenu } from '##/components/ContextMenu';
import { cn } from '##/utils/bem';

const filters = [
  ['Нефть', 'Газ', 'Жидкость'],
  ['За год', 'За квартал', 'За месяц'],
  ['Все скважены', 'Скважена №1', 'Скважена №2', 'Скважена №3'],
];

const getItemLabel = (item: string) => item;

type ChipsItemWithMenuProps = {
  value: string;
  menu: string[];
  isOpen: boolean;
  onChange: (item: string) => void;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  onClickOutside: (event: MouseEvent) => void;
};

const ChipsItemIcon = withAnimateSwitcherHOC({
  startIcon: IconSelect,
  startDirection: 0,
  endDirection: 180,
});

const cnChipsWithContextMenuExample = cn('ChipsWithContextMenuExample');

const ChipsItemWithMenu = (props: ChipsItemWithMenuProps) => {
  const { value, menu, onChange, isOpen, onClick, onClickOutside } = props;
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <>
      <AnimateIconSwitcherProvider active={isOpen}>
        <ChipsItem
          onClick={onClick}
          ref={ref}
          label={value}
          iconRight={ChipsItemIcon}
          interactive
        />
      </AnimateIconSwitcherProvider>
      <ContextMenu
        anchorRef={ref}
        items={menu}
        getItemLabel={getItemLabel}
        isOpen={isOpen}
        onClickOutside={onClickOutside}
        onItemClick={({ item }) => onChange(item)}
        getItemRightIcon={(item) => (item === value ? IconCheck : undefined)}
        direction="downStartLeft"
        offset="2xs"
      />
    </>
  );
};

export const ChipsWithContextMenuExample = () => {
  const [values, setValues] = useState(filters.map((item) => item[0]));
  const [activeMenu, setActiveMenu] = useState(-1);

  return (
    <Example col={1}>
      <div className={cnChipsWithContextMenuExample()}>
        {filters.map((item, index) => {
          return (
            <ChipsItemWithMenu
              key={index}
              value={values[index]}
              menu={filters[index]}
              onChange={(item) => {
                setValues((state) => {
                  const newState = [...state];
                  newState[index] = item;
                  return newState;
                });
              }}
              onClickOutside={() => setActiveMenu(-1)}
              onClick={() => setActiveMenu(index)}
              isOpen={activeMenu === index}
            />
          );
        })}
      </div>
    </Example>
  );
};
