import { Group, groups, Item, items } from '../__mocks__/getGroups.mock';
import { defaultGroupKey, getGroups } from '../getGroups';

const getItemGroupKey = (item: Item) => item.group;
const getGroupKey = (group: Group) => group.id;

const sortGroup = (a: number | string, b: number | string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

describe('helper getGroups', () => {
  it('групировка без getGroupId', () => {
    const result = getGroups(items, undefined, undefined, undefined, undefined);

    const expected: typeof result = [
      {
        key: defaultGroupKey,
        items,
        groupIndex: -1,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка без массива групп', () => {
    const result = getGroups(
      items,
      getItemGroupKey,
      undefined,
      undefined,
      undefined,
    );

    const expected: typeof result = [
      {
        key: 2,
        items: [
          { group: 2, name: 'Скрепка' },
          { group: 2, name: 'Чемодан' },
          { group: 2, name: 'Солнце' },
        ],
        group: undefined,
        groupIndex: -1,
      },
      {
        key: 1,
        items: [
          { group: 1, name: 'Глаз' },
          { group: 1, name: 'Две галочки' },
        ],
        group: undefined,
        groupIndex: -1,
      },
    ];
    expect(result).toEqual(expected);
  });

  it('групировка без массива групп и с сортировкой', () => {
    const result = getGroups(
      items,
      getItemGroupKey,
      undefined,
      undefined,
      (a, b) => sortGroup(a.key, b.key),
    );

    const expected: typeof result = [
      {
        key: 1,
        items: [
          { group: 1, name: 'Глаз' },
          { group: 1, name: 'Две галочки' },
        ],
        group: undefined,
        groupIndex: -1,
      },
      {
        key: 2,
        items: [
          { group: 2, name: 'Скрепка' },
          { group: 2, name: 'Чемодан' },
          { group: 2, name: 'Солнце' },
        ],
        group: undefined,
        groupIndex: -1,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка c массивом групп', () => {
    const result = getGroups(
      items,
      getItemGroupKey,
      groups,
      getGroupKey,
      undefined,
    );

    const expected: typeof result = [
      {
        key: 1,
        items: [
          {
            name: 'Глаз',
            group: 1,
          },
          {
            name: 'Две галочки',
            group: 1,
          },
        ],
        groupIndex: 0,
        group: {
          id: 1,
          label: 'Первая группа',
        },
      },
      {
        key: 2,
        items: [
          {
            name: 'Скрепка',
            group: 2,
          },
          {
            name: 'Чемодан',
            group: 2,
          },
          {
            name: 'Солнце',
            group: 2,
          },
        ],
        groupIndex: 1,
        group: {
          id: 2,
          label: 'Вторая группа',
        },
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка c массивом групп и с сортировкой', () => {
    const result = getGroups(
      items,
      getItemGroupKey,
      groups,
      getGroupKey,
      (a, b) => sortGroup(a.group?.label || 0, b.group?.label || 0),
    );

    const expected: typeof result = [
      {
        key: 2,
        items: [
          {
            name: 'Скрепка',
            group: 2,
          },
          {
            name: 'Чемодан',
            group: 2,
          },
          {
            name: 'Солнце',
            group: 2,
          },
        ],
        groupIndex: 1,
        group: {
          id: 2,
          label: 'Вторая группа',
        },
      },
      {
        key: 1,
        items: [
          {
            name: 'Глаз',
            group: 1,
          },
          {
            name: 'Две галочки',
            group: 1,
          },
        ],
        groupIndex: 0,
        group: {
          id: 1,
          label: 'Первая группа',
        },
      },
    ];

    expect(result).toEqual(expected);
  });
});
