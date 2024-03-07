import {
  ChipsItemProps,
  ChipsPropActiveView,
  ChipsPropGetItemIconLeft,
  ChipsPropGetItemLabel,
  ChipsPropGetItemRef,
  ChipsPropGetItemStatus,
  ChipsPropSize,
} from '##/components/Chips';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type ChipsChoiceDefaultItem = Omit<
  ChipsItemProps,
  | 'size'
  | 'activeView'
  | 'interactive'
  | 'onRightIconClick'
  | 'iconRight'
  | 'as'
> & {
  key: string;
};

export type ChipsChoicePropGetItemKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;

export type ChipsChoicePropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: MULTIPLE extends true ? ITEM[] | null : ITEM,
  props: {
    e: React.MouseEvent;
  },
) => void;

export type ChipsChoicePropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null;

export type ChipsChoiceProps<
  ITEM = ChipsChoiceDefaultItem,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    size?: ChipsPropSize;
    activeView?: ChipsPropActiveView;
    items: ITEM[];
    getItemStatus?: ChipsPropGetItemStatus<ITEM>;
    getItemLabel?: ChipsPropGetItemLabel<ITEM>;
    getItemIconLeft?: ChipsPropGetItemIconLeft<ITEM>;
    getItemRef?: ChipsPropGetItemRef<ITEM>;
    onChange: ChipsChoicePropOnChange<ITEM, MULTIPLE>;
    multiple?: MULTIPLE;
    value?: ChipsChoicePropValue<ITEM, MULTIPLE>;
    getItemKey?: ChipsChoicePropGetItemKey<ITEM>;
    disabled?: boolean;
  },
  HTMLDivElement
> &
  (ITEM extends { label: string }
    ? {}
    : {
        getItemLabel?: ChipsPropGetItemLabel<ITEM>;
      });

export type ChipsChoiceComponent = <
  ITEM = ChipsChoiceDefaultItem,
  MULTIPLE extends boolean = false,
>(
  props: ChipsChoiceProps<ITEM, MULTIPLE>,
) => React.ReactElement | null;
