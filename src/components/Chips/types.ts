import { IconComponent } from '@consta/icons/Icon';

import { BadgePropStatus } from '##/components/Badge';
import { AsAttributes, AsTags } from '##/utils/types/AsTags';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const chipsPropSize = ['xs', 's', 'm', 'l'] as const;
export type ChipsPropSize = typeof chipsPropSize[number];
export const chipsPropSizeDefault: ChipsPropSize = 'm';

export const chipsPropActiveView = ['primary', 'secondary'] as const;
export type ChipsPropActiveView = typeof chipsPropActiveView[number];
export const chipsPropActiveViewDefault: ChipsPropActiveView = 'primary';

export type ChipsPropStatus = BadgePropStatus;

export type ChipsItemProps = {
  size?: ChipsPropSize;
  activeView?: ChipsPropActiveView;
  interactive?: boolean;
  onRightIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  /**
   * "error" deprecated since version 5.13.0 use "alert"
   */
  status?: ChipsPropStatus;
  label: string;
  active?: boolean;
  disabled?: boolean;
};

export type ChipsDefaultItem = Omit<
  ChipsItemProps,
  'size' | 'activeView' | 'interactive' | 'onRightIconClick'
> & {
  attributes?: Omit<AsAttributes, 'children' | 'ref'>;
  as?: AsTags;
  ref?: React.RefObject<HTMLElement>;
};

// export type ChipsPropGetItemKey<ITEM> = (item: ITEM) => ChipsDefaultItem['key'];
export type ChipsPropGetItemStatus<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['status'];
export type ChipsPropGetItemLabel<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['label'];
export type ChipsPropGetItemIconLeft<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['iconLeft'];
export type ChipsPropGetItemIconRight<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['iconRight'];
export type ChipsPropGetItemRef<ITEM> = (item: ITEM) => ChipsDefaultItem['ref'];
export type ChipsPropGetItemAs<ITEM> = (item: ITEM) => ChipsDefaultItem['as'];
export type ChipsPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['attributes'];
export type ChipsPropGetItemActive<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['active'];
export type ChipsPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['disabled'];
export type ChipsPropOnItemClick<ITEM> = (
  item: ITEM,
  props: { e: React.MouseEvent },
) => void;
export type ChipsPropItemOnRightIconClick<ITEM> = (
  item: ITEM,
  props: { e: React.MouseEvent },
) => void;

export type ChipsProps<ITEM = ChipsDefaultItem> = PropsWithHTMLAttributesAndRef<
  {
    size?: ChipsPropSize;
    activeView?: ChipsPropActiveView;
    items: ITEM[];
    interactive?: boolean;
    disabled?: boolean;
    /**
     * "error" deprecated since version 5.13.0 use "alert"
     */
    getItemStatus?: ChipsPropGetItemStatus<ITEM>;
    getItemLabel?: ChipsPropGetItemLabel<ITEM>;
    getItemIconLeft?: ChipsPropGetItemIconLeft<ITEM>;
    getItemIconRight?: ChipsPropGetItemIconRight<ITEM>;
    getItemRef?: ChipsPropGetItemRef<ITEM>;
    getItemAs?: ChipsPropGetItemAs<ITEM>;
    getItemAttributes?: ChipsPropGetItemAttributes<ITEM>;
    getItemActive?: ChipsPropGetItemActive<ITEM>;
    getItemDisabled?: ChipsPropGetItemDisabled<ITEM>;
    onItemClick?: ChipsPropOnItemClick<ITEM>;
    onItemRightIconClick?: ChipsPropItemOnRightIconClick<ITEM>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: string }
    ? {}
    : {
        getItemLabel: ChipsPropGetItemLabel<ITEM>;
      });

export type ChipsComponent = <ITEM = ChipsDefaultItem>(
  props: ChipsProps<ITEM>,
) => React.ReactElement | null;
