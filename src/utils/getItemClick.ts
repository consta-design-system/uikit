export type GetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type OnItemClick<ITEM> = (
  item: ITEM,
  props: {
    e: React.MouseEvent;
  },
) => void;

export const getItemClick =
  <ITEM>(
    item: ITEM,
    getItemOnClick: GetItemOnClick<ITEM>,
    onItemClick?: OnItemClick<ITEM>,
  ): React.MouseEventHandler =>
  (e) => {
    onItemClick?.(item, { e });
    getItemOnClick(item)?.(e);
  };
