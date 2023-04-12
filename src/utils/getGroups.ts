export type Group<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
  groupIndex: number;
};

export type SelectAllItem = {
  checkedCount: number;
  totalCount: number;
  groupKey: string | number;
  __optionSelctAll: true;
};

export type CountedGroup<ITEM, GROUP> = Omit<Group<ITEM, GROUP>, 'items'> & {
  items: Array<SelectAllItem | ITEM>;
};

type GetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetItemKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
type GetGroupKey<GROUP> = (item: GROUP) => string | number | undefined;
type SortGroups<ITEM, GROUP> = (
  a: Group<ITEM, GROUP>,
  b: Group<ITEM, GROUP>,
) => number;
type GetGroupsResult<ITEM, GROUP> = Group<ITEM, GROUP>[];

export const defaultGroupKey = 'no-group';

const getItemGroupKeyGuard = <ITEM>(
  getter: GetGroupKey<ITEM>,
  item: ITEM,
  noGroupKey: string,
) => {
  const key = getter(item);

  return typeof key === 'undefined' ? noGroupKey : key;
};

/**
 * @param items список который нужно групировать
 * @param getItemGroupKey признак принадлежности к группе
 * @param groups список групп
 * @param getGroupKey результат функции должен вернуть уникальный ключ группы
 * @param sortGroups сортировка групп
 * @param noGroupKey ключ группы которая создаться если item небудет принадлежать ни к одной из групп
 */

export function getGroups<ITEM, GROUP>(
  items: ITEM[],
  getItemGroupKey: GetItemGroupKey<ITEM> | undefined,
  groups: GROUP[] | undefined,
  getGroupKey: GetGroupKey<GROUP> | undefined,
  sortGroups: SortGroups<ITEM, GROUP> | undefined,
  noGroupKey = defaultGroupKey,
): GetGroupsResult<ITEM, GROUP> {
  if (typeof getItemGroupKey !== 'function') {
    return [{ items, key: noGroupKey, groupIndex: -1 }];
  }

  const resultGroups: GetGroupsResult<ITEM, GROUP> = [];
  for (const item of items) {
    const itemGroupKey = getItemGroupKeyGuard(
      getItemGroupKey,
      item,
      noGroupKey,
    );
    const resultGroupIndex = resultGroups.findIndex(
      (group) => group.key === itemGroupKey,
    );

    if (resultGroupIndex >= 0) {
      resultGroups[resultGroupIndex].items.push(item);
    } else {
      const groupIndex =
        getGroupKey && groups
          ? groups.findIndex((g) => getGroupKey(g) === itemGroupKey)
          : -1;

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

export function getCountedGroups<ITEM, GROUP>(
  groups: GetGroupsResult<ITEM, GROUP>,
  values: ITEM[] | undefined | null,
  selectAll: boolean,
  getItemKey: GetItemKey<ITEM>,
  getItemDisabled?: GetItemDisabled<ITEM>,
): CountedGroup<ITEM, GROUP>[] {
  const copyGroups: CountedGroup<ITEM, GROUP>[] = [...groups];
  if (selectAll) {
    groups.forEach((group, index) => {
      let totalCount = 0;
      let checkedCount = 0;
      group.items.forEach((item) => {
        if (!(getItemDisabled && getItemDisabled?.(item))) {
          totalCount += 1;
        }
        if (values?.find((el) => getItemKey(item) === getItemKey(el))) {
          checkedCount += 1;
        }
      });
      copyGroups[index].items = [
        {
          __optionSelctAll: true,
          totalCount,
          groupKey: group.key,
          checkedCount,
        },
        ...copyGroups[index].items,
      ];
    });
  }
  return copyGroups;
}
