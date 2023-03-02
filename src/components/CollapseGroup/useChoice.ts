import { useEffect, useState } from 'react';

import { useChoiceGroupIndexed } from '##/hooks/useChoiceGroupIndexed';

import {
  CollapseGroupPropOnOpen,
  CollapseGroupPropOpened,
  CollapseGroupProps,
} from './helpers';

type ChoiceGroupIndexedParams = {
  value: CollapseGroupPropOpened<boolean>;
  multiple: boolean;
  callBack: CollapseGroupPropOnOpen<boolean>;
  isNullableValue: true;
};

export const useChoice = <ITEM, IS_ACCORDION extends boolean>(
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
) => {
  const [openedKeys, setOpenedKeys] = useState<typeof props.opened>(
    props.opened,
  );

  const callBack: CollapseGroupPropOnOpen<
    Exclude<typeof props.isAccordion, undefined>
  > = (params) => {
    setOpenedKeys(params.value);
    props.onOpen?.(params);
  };

  const choiceGroupIndexedParams: ChoiceGroupIndexedParams = {
    value: openedKeys,
    multiple: !props.isAccordion,
    callBack,
    isNullableValue: true,
  };

  useEffect(() => {
    setOpenedKeys(props.opened);
  }, [props.opened]);

  return useChoiceGroupIndexed(choiceGroupIndexedParams);
};
