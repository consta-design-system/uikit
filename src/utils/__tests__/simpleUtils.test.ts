import { moveElement } from '../simpleUtils';

const array = [0, 1, 2, 3, 4];

test('Первый за последний', () => {
  expect(moveElement(array, 0, 5)).toEqual([1, 2, 3, 4, 0]);
});

test('Последний за первый', () => {
  expect(moveElement(array, 4, 0)).toEqual([4, 0, 1, 2, 3]);
});

test('Центральный на первый', () => {
  expect(moveElement(array, 2, 0)).toEqual([2, 0, 1, 3, 4]);
});

test('Центральный за последний', () => {
  expect(moveElement(array, 2, 5)).toEqual([0, 1, 3, 4, 2]);
});

test('Перестановка в центре налево', () => {
  expect(moveElement(array, 2, 1)).toEqual([0, 2, 1, 3, 4]);
});

test('Перестановка в центре направо', () => {
  expect(moveElement(array, 2, 4)).toEqual([0, 1, 3, 2, 4]);
});

test('Новый индекс меньше 0', () => {
  expect(() => {
    moveElement(array, 3, -42);
  }).toThrow('Некорректный аргумент newIndex');
});

test('Новый индекс выходит за границы массива', () => {
  expect(() => {
    moveElement(array, 3, array.length + 42);
  }).toThrow('Некорректный аргумент newIndex');
});

test('Новый индекс не число', () => {
  expect(() => {
    moveElement(array, 3, NaN);
  }).toThrow('Некорректный аргумент newIndex');
});

test('Старый индекс меньше 0', () => {
  expect(() => {
    moveElement(array, -42, 3);
  }).toThrow('Некорректный аргумент oldIndex');
});

test('Старый индекс выходит за границы массива', () => {
  expect(() => {
    moveElement(array, array.length + 42, 3);
  }).toThrow('Некорректный аргумент oldIndex');
});

test('Старый индекс не число', () => {
  expect(() => {
    moveElement(array, NaN, 3);
  }).toThrow('Некорректный аргумент oldIndex');
});

test('Новый индекс равен старому', () => {
  expect(() => {
    moveElement(array, 2, 2);
  }).toThrow('newIndex равен oldIndex');
});
