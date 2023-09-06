import { IconCheck } from '@consta/icons/IconCheck';
import { IconSelect } from '@consta/icons/IconSelect';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Chips } from '##/components/ChipsCanary/ChipsCanary';
import { ContextMenu } from '##/components/ContextMenu';
import { useRefs } from '##/hooks/useRefs';

const filters = [
  ['Нефть', 'Газ', 'Жидкость'],
  ['За год', 'За квартал', 'За месяц'],
  ['Все скважены', 'Скважена №1', 'Скважена №2', 'Скважена №3'],
];

const getItemLabel = (item: string) => item;
const getItemIconRight = () => IconSelect;

export const ChipsWithContextMenuExample = () => {
  const [values, setValues] = useState(filters.map((item) => item[0]));
  const [activeMenu, setActiveMenu] = useState(-1);
  const refs = useRefs<HTMLButtonElement>(filters.length);

  return (
    <Example col={1}>
      <Chips
        items={values}
        getItemIconRight={getItemIconRight}
        getItemLabel={getItemLabel}
        getItemRef={(_, index) => refs[index]}
        onItemClick={(_, { index }) => setActiveMenu(index)}
        interactive
      />
      {filters.map((filter, index) => {
        return (
          <ContextMenu
            key={index}
            anchorRef={refs[index]}
            items={filter}
            getItemLabel={getItemLabel}
            isOpen={activeMenu === index}
            onClickOutside={() => setActiveMenu(-1)}
            onItemClick={({ item }) => {
              setValues((state) => {
                const newState = [...state];
                newState[index] = item;
                return newState;
              });
            }}
            getItemRightIcon={(item) =>
              item === values[index] ? IconCheck : undefined
            }
            direction="downStartLeft"
            offset="2xs"
          />
        );
      })}
    </Example>
  );
};
