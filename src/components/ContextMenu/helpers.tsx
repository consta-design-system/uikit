import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '../../utils/types/PropsWithHTMLAttributes';
import { Direction, Position } from '../Popover/Popover';

export const defaultGroupId = 'context-menu-no-group';

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
export type ContextMenuPropGetOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent<HTMLDivElement>>;

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
    getOnClick?: ContextMenuPropGetOnClick<ITEM>;
    direction?: Direction;
    possibleDirections?: readonly Direction[];
    subMenuDirection?: ContextMenuPropSubMenuDirection;
    getKey?: ContextMenuPropGetKey<ITEM>;
    getDisabled?: ContextMenuPropGetDisable<ITEM>;
    offset?: number;
    onClickOutside?: ClickOutsideHandler;
    spareDirection?: Direction;
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
  'subMenuDirection' | 'getKey' | 'onClickOutside' | 'offset' | 'isOpen'
>;

export type ContextMenuItemProps<ITEM> = PropsWithHTMLAttributes<
  {
    label: string | number;
    rightSide?: React.ReactNode;
    leftSide?: React.ReactNode;
    size?: ContextMenuPropSize;
    active?: boolean;
    withSubMenu: boolean;
    accent?: ContextMenuAccent;
    disabled?: boolean;
  } & React.RefAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type Level<ITEM> = {
  items: ITEM[];
  activeItem?: string;
  direction?: Direction;
  possibleDirections?: readonly Direction[];
  offset?: number;
} & PositioningProps;

export type ContextMenuItem = <ITEM>(
  props: ContextMenuItemProps<ITEM>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export type ContextMenuType = <ITEM>(props: ContextMenuProps<ITEM>) => React.ReactElement | null;
export type ContextMenuLevelType = <ITEM>(
  props: ContextMenuLevelProps<ITEM>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

type Group<ITEM> = { items: ITEM[]; id: string | number };
type getGroupsResult<ITEM> = Group<ITEM>[];

export function getGroups<ITEM>(
  items: ITEM[],
  getGroupId?: ContextMenuPropGetGroupId<ITEM>,
  sortGroup?: ContextMenuPropSortGroup,
): getGroupsResult<ITEM> {
  if (typeof getGroupId === 'function') {
    const groups: getGroupsResult<ITEM> = [];
    for (const item of items) {
      const id = getGroupId(item) || defaultGroupId;
      const index = groups.findIndex((group) => group.id === id);

      if (index >= 0) {
        groups[index].items.push(item);
      } else {
        const group: Group<ITEM> = { id, items: [item] };
        groups.push(group);
      }
    }

    if (typeof sortGroup === 'function') {
      groups.sort((a, b) => sortGroup(a.id, b.id));
    }

    return groups;
  }
  return [{ items, id: defaultGroupId }];
}
