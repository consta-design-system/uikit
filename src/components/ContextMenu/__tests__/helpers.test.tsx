import { TestItem, testItems } from '../__mocks__/mock.data';
import { defaultGroupId, getGroups } from '../helpers';

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
    const result = getGroups(testItems);

    const expected: typeof result = [
      {
        id: defaultGroupId,
        items: testItems,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка с getGroupId', () => {
    const result = getGroups(testItems, getGroupId);

    const expected: typeof result = [
      {
        id: 2,
        items: [
          { group: 2, name: 'Скрепка' },
          { group: 2, name: 'Чемодан' },
          { group: 2, name: 'Солнце' },
        ],
      },
      {
        id: 1,
        items: [
          { group: 1, name: 'Глаз' },
          { group: 1, name: 'Две галочки' },
        ],
      },
    ];

    expect(result).toEqual(expected);
  });

  it('групировка с сортировкой', () => {
    const result = getGroups(testItems, getGroupId, sortGroup);

    const expected: typeof result = [
      {
        id: 1,
        items: [
          { group: 1, name: 'Глаз' },
          { group: 1, name: 'Две галочки' },
        ],
      },
      {
        id: 2,
        items: [
          { group: 2, name: 'Скрепка' },
          { group: 2, name: 'Чемодан' },
          { group: 2, name: 'Солнце' },
        ],
      },
    ];

    expect(result).toEqual(expected);
  });
});
