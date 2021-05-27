type Group<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
  groupIndex: number;
};
type GetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetGroupKey<GROUP> = (item: GROUP) => string | number | undefined;
type SortGroups<ITEM, GROUP> = (a: Group<ITEM, GROUP>, b: Group<ITEM, GROUP>) => number;
type GetGroupsResult<ITEM, GROUP> = Group<ITEM, GROUP>[];

export const defaultGroupKey = 'no-group';

export function getGroups<ITEM, GROUP>(
  // Items
  items: ITEM[],
  getItemGroupKey: GetItemGroupKey<ITEM> | undefined,
  // Groups
  groups: GROUP[] | undefined,
  getGroupKey: GetGroupKey<GROUP> | undefined,
  sortGroups: SortGroups<ITEM, GROUP> | undefined,
  noGroupKey = defaultGroupKey,
): GetGroupsResult<ITEM, GROUP> {
  if (typeof getItemGroupKey === 'function') {
    const resultGroups: GetGroupsResult<ITEM, GROUP> = [];
    for (const item of items) {
      const itemGroupKey = getItemGroupKey(item) || noGroupKey;
      const resultGroupIndex = resultGroups.findIndex((group) => group.key === itemGroupKey);

      if (resultGroupIndex >= 0) {
        resultGroups[resultGroupIndex].items.push(item);
      } else {
        const groupIndex =
          getGroupKey && groups ? groups.findIndex((g) => getGroupKey(g) === itemGroupKey) : -1;

        const resultGroup: Group<ITEM, GROUP> = {
          key: itemGroupKey,
          items: [item],
          groupIndex,
          group: groups ? groups[groupIndex] : undefined,
        };

        resultGroups.push(resultGroup);
      }
    }

    if (typeof sortGroups === 'function') {
      resultGroups.sort(sortGroups);
    } else if (groups && getGroupKey) {
      resultGroups.sort((a, b) => {
        if (a.groupIndex > b.groupIndex) return 1;
        if (a.groupIndex < b.groupIndex) return -1;
        return 0;
      });
    }

    return resultGroups;
  }
  return [{ items, key: noGroupKey, groupIndex: -1 }];
}
