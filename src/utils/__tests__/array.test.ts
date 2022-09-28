import { sortBy, updateAt } from '../array';

describe('sortBy', () => {
  it('сортирует по числовому параметру', () => {
    const arr = [
      { a: 2 },
      { a: 200 },
      { a: 1 },
      { a: 100 },
      { a: 10 },
      { a: 20 },
    ];

    expect(sortBy(arr, 'a')).toEqual([
      { a: 1 },
      { a: 2 },
      { a: 10 },
      { a: 20 },
      { a: 100 },
      { a: 200 },
    ]);
  });

  it('сортирует функцией сортировки', () => {
    const arr = [
      {
        date: {
          day: 10,
          year: 2020,
        },
      },
      {
        date: {
          day: 66,
          year: 2020,
        },
      },
      {
        date: {
          day: 1,
          year: 2020,
        },
      },
    ];

    type DateType = typeof arr[number]['date'];
    const sortFn = (a: DateType, b: DateType): number => a.day - b.day;

    expect(sortBy(arr, 'date', 'asc', sortFn)).toEqual([
      {
        date: {
          day: 1,
          year: 2020,
        },
      },
      {
        date: {
          day: 10,
          year: 2020,
        },
      },
      {
        date: {
          day: 66,
          year: 2020,
        },
      },
    ]);
  });

  it('сортирует по числовому параметру в убывающем порядке', () => {
    const arr = [
      { a: 2 },
      { a: 200 },
      { a: 1 },
      { a: 100 },
      { a: 10 },
      { a: 20 },
    ];

    expect(sortBy(arr, 'a', 'desc')).toEqual([
      { a: 200 },
      { a: 100 },
      { a: 20 },
      { a: 10 },
      { a: 2 },
      { a: 1 },
    ]);
  });

  it('сохраняет порядок элементов, если у них одинаковый параметр', () => {
    const arr = [
      { a: 1, b: 'b1' },
      { a: 1, b: 'b2' },
    ];

    expect(sortBy(arr, 'a')).toEqual([
      { a: 1, b: 'b1' },
      { a: 1, b: 'b2' },
    ]);
  });

  it('сортирует по строковому параметру', () => {
    const arr = [
      { name: 'Андрей' },
      { name: 'Вадим' },
      { name: 'Никита' },
      { name: 'Сергей' },
      { name: 'Евгений' },
      { name: 'Алексей' },
      { name: 'Анна' },
    ];

    expect(sortBy(arr, 'name')).toEqual([
      { name: 'Алексей' },
      { name: 'Андрей' },
      { name: 'Анна' },
      { name: 'Вадим' },
      { name: 'Евгений' },
      { name: 'Никита' },
      { name: 'Сергей' },
    ]);
  });

  it('сортирует по строковому параметру в убывающем порядке', () => {
    const arr = [
      { name: 'Андрей' },
      { name: 'Вадим' },
      { name: 'Никита' },
      { name: 'Сергей' },
      { name: 'Евгений' },
      { name: 'Алексей' },
      { name: 'Анна' },
    ];

    expect(sortBy(arr, 'name', 'desc')).toEqual([
      { name: 'Сергей' },
      { name: 'Никита' },
      { name: 'Евгений' },
      { name: 'Вадим' },
      { name: 'Анна' },
      { name: 'Андрей' },
      { name: 'Алексей' },
    ]);
  });
});

describe('updateAt', () => {
  it('обновляет элемент по индексу', () => {
    expect(updateAt([0, 1, 2, 3], 2, 999)).toEqual([0, 1, 999, 3]);
  });

  it('ничего не делает, если индекс за пределами массива', () => {
    expect(updateAt([0, 1, 2, 3], 4, 999)).toEqual([0, 1, 2, 3]);
  });
});
