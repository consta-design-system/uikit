import { useEffect, useState } from 'react';

import { useChoiceGroupIndexed } from '../../hooks/useChoiceGroupIndexed/useChoiceGroupIndexed';

import { CollapseGroupProps } from './helpers';

export const useChoice = <ITEM>(props: CollapseGroupProps<ITEM>) => {
  const [openedKeys, setOpenedKeys] = useState(props.opened);

  useEffect(() => {
    setOpenedKeys(props.opened);
  }, [props.opened]);

  return useChoiceGroupIndexed(
    props.isAccordion
      ? {
          value: (openedKeys as typeof props.opened) ?? null,
          multiple: false,
          callBack: (params) => {
            setOpenedKeys(params.value);
            props.onOpen?.(params);
          },
          isNullableValue: true,
        }
      : {
          value: (openedKeys as typeof props.opened) ?? [],
          multiple: true,
          callBack: (params) => {
            setOpenedKeys(params.value);
            props.onOpen?.(params);
          },
        },
  );
};
