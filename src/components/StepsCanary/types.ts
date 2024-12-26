import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type StepsPropSize = 's' | 'm' | 'l';

export type StepsPropOnChange<ITEM> = (
  value: ITEM,
  props: {
    e: React.MouseEvent;
  },
) => void;

export type StepItemStatus = 'resolved' | 'error';

export type StepsPropGetItemLabel<ITEM> = (item: ITEM) => string;

export type StepsPropGetItemDescription<ITEM> = (
  item: ITEM,
) => string | undefined;

export type StepsPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;

export type StepsPropGetItemStatus<ITEM> = (
  item: ITEM,
) => StepItemStatus | undefined;

export type StepsPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;

export type StepsItemDefault = {
  label: string;
  description?: string;
  disabled?: boolean;
  status?: StepItemStatus;
  icon?: IconComponent;
};

export type StepsProps<ITEM = StepsItemDefault> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    value: ITEM;
    onChange: StepsPropOnChange<ITEM>;
    getItemLabel?: StepsPropGetItemLabel<ITEM>;
    getItemDisabled?: StepsPropGetItemDisabled<ITEM>;
    getItemStatus?: StepsPropGetItemStatus<ITEM>;
    getItemDescription?: StepsPropGetItemDescription<ITEM>;
    getItemIcon?: StepsPropGetItemIcon<ITEM>;
    size?: StepsPropSize;
    className?: string;
    withNumber?: boolean;
    fitMode?: 'scroll' | 'scrollWithButtons';
    labelWordWrap?: boolean;
  },
  HTMLDivElement
> &
  (ITEM extends { label: StepsItemDefault['label'] }
    ? {}
    : {
        getItemLabel: StepsPropGetItemLabel<ITEM>;
      });

export type StepsComponent = <ITEM>(
  props: StepsProps<ITEM>,
) => React.ReactElement | null;
