import { TestItem, testItems } from '../__mocks__/mock.data';
import { defaultGroupKey, getGroups } from '../getGroups';

const getGroupId = (item: TestItem) => item.group;

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
    const result = getGroups(testItems, undefined, undefined, undefined, undefined);

    const expected: typeof result = [
      {
        key: defaultGroupKey,
        items: testItems,
        groupIndex: -1,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка с getGroupId', () => {
    const result = getGroups(testItems, getGroupId, undefined, undefined, undefined);

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

  it('групировка с сортировкой', () => {
    const result = getGroups(testItems, getGroupId, undefined, undefined, (a, b) =>
      sortGroup(a.key, b.key),
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
});
