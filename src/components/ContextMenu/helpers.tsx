import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import { PropsWithAsAttributes } from '../../utils/types/PropsWithAsAttributes';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Direction, Position } from '../Popover/Popover';

export const contextMenuSizes = ['m', 's', 'l'] as const;
export type ContextMenuPropSize = typeof contextMenuSizes[number];
export const contextMenuDefaultSize: ContextMenuPropSize = contextMenuSizes[0];

export const contextMenuAccent = ['alert', 'warning', 'success'] as const;
export type ContextMenuAccent = typeof contextMenuAccent[number];

export type ContextMenuPropGetLabel<ITEM> = (item: ITEM) => string | number;
export type ContextMenuPropGetSide<ITEM> = (item: ITEM) => React.ReactNode | null;
export type ContextMenuPropGetSubItems<ITEM> = (item: ITEM) => ITEM[] | undefined;
export type ContextMenuPropGetAccent<ITEM> = (item: ITEM) => ContextMenuAccent | undefined;
export type ContextMenuPropGetGroupId<ITEM> = (item: ITEM) => string | number | undefined;
export type ContextMenuPropGetKey<ITEM> = (item: ITEM) => string | number;
export type ContextMenuPropGetDisable<ITEM> = (item: ITEM) => boolean | undefined;
export type ContextMenuPropGetGroupLabel = (
  id: string | number | undefined,
) => string | number | undefined;
export type ContextMenuPropSortGroup = (a: string | number, b: string | number) => number;
export type ContextMenuPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type ContextMenuPropGetItemAs<ITEM> = (item: ITEM) => keyof JSX.IntrinsicElements;
export type ContextMenuPropGetItemHTMLAttributes<ITEM> = (
  item: ITEM,
) => JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

export const contextMenuPropSubMenuDirections = [
  'rightStartUp',
  'rightStartDown',
  'leftStartUp',
  'leftStartDown',
] as const;
export type ContextMenuPropSubMenuDirection = typeof contextMenuPropSubMenuDirections[number];
export const contextMenuPropDefaultSubMenuDirection: ContextMenuPropSubMenuDirection =
  contextMenuPropSubMenuDirections[0];

type PositioningProps =
  | {
      anchorRef: React.RefObject<HTMLElement>;
      position?: never;
    }
  | {
      anchorRef?: never;
      position: Position;
    };

export type ContextMenuProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    getLabel: ContextMenuPropGetLabel<ITEM>;
    getLeftSideBar?: ContextMenuPropGetSide<ITEM>;
    getRightSideBar?: ContextMenuPropGetSide<ITEM>;
    getSubItems?: ContextMenuPropGetSubItems<ITEM>;
    getGroupId?: ContextMenuPropGetGroupId<ITEM>;
    getGroupLabel?: ContextMenuPropGetGroupLabel;
    getAccent?: ContextMenuPropGetAccent<ITEM>;
    size?: ContextMenuPropSize;
    sortGroup?: ContextMenuPropSortGroup;
    getOnClick?: ContextMenuPropGetItemOnClick<ITEM>;
    getItemOnClick?: ContextMenuPropGetItemOnClick<ITEM>;
    direction?: Direction;
    possibleDirections?: readonly Direction[];
    subMenuDirection?: ContextMenuPropSubMenuDirection;
    getKey?: ContextMenuPropGetKey<ITEM>;
    getDisabled?: ContextMenuPropGetDisable<ITEM>;
    offset?: number;
    onItemClick?: (props: { e: React.MouseEvent; item: ITEM }) => void;
    onClickOutside?: ClickOutsideHandler;
    spareDirection?: Direction;
    getItemAs?: ContextMenuPropGetItemAs<ITEM>;
    getItemHTMLAttributes?: ContextMenuPropGetItemHTMLAttributes<ITEM>;
  } & PositioningProps,
  HTMLDivElement
>;

export type AddLevel<ITEM> = (
  level: number,
  items: ITEM[],
  anchorRef: React.RefObject<HTMLElement>,
  activeItem: string,
) => void;

export type DeleteLevel = (level: number) => void;

type ContextMenuLevelProps<ITEM> = Omit<
  ContextMenuProps<ITEM> & {
    level: number;
    addLevel: AddLevel<ITEM>;
    deleteLevel: DeleteLevel;
    activeItem?: string;
    onSetDirection?: (direction: Direction) => void;
    hoveredParenLevel: number;
    setHoveredParenLevel: (level: number) => void;
  },
  'subMenuDirection' | 'getKey' | 'onClickOutside' | 'isOpen'
>;

export type ContextMenuItemProps<
  AS extends keyof JSX.IntrinsicElements = 'div'
> = PropsWithAsAttributes<
  {
    label: string | number;
    rightSide?: React.ReactNode;
    leftSide?: React.ReactNode;
    size?: ContextMenuPropSize;
    active?: boolean;
    withSubMenu: boolean;
    accent?: ContextMenuAccent;
    disabled?: boolean;
  },
  AS
> &
  React.RefAttributes<HTMLDivElement>;

export type Level<ITEM> = {
  items: ITEM[];
  activeItem?: string;
  direction?: Direction;
  possibleDirections?: readonly Direction[];
  offset?: number;
} & PositioningProps;

export type ContextMenuItemComponent = <AS extends keyof JSX.IntrinsicElements = 'div'>(
  props: ContextMenuItemProps<AS>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export type ContextMenuComponent = <ITEM>(
  props: ContextMenuProps<ITEM>,
) => React.ReactElement | null;

export type ContextMenuLevelType = <ITEM>(
  props: ContextMenuLevelProps<ITEM>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;
