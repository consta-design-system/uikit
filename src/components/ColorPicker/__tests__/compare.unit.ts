import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import {
  equalColorObjects,
  equalColorString,
  equalHex,
} from '../utils/compare';

createRoot();
clearStack();

describe('compare', () => {
  describe('equalColorObjects', () => {
    test('возвращает true для одинаковых объектов', () => {
      const first = { r: 255, g: 0, b: 0 };
      const second = { r: 255, g: 0, b: 0 };
      expect(equalColorObjects(first, second)).toBe(true);
    });

    test('возвращает false для разных объектов', () => {
      const first = { r: 255, g: 0, b: 0 };
      const second = { r: 0, g: 255, b: 0 };
      expect(equalColorObjects(first, second)).toBe(false);
    });

    test('работает с объектами с alpha', () => {
      const first = { r: 255, g: 0, b: 0, a: 1 };
      const second = { r: 255, g: 0, b: 0, a: 1 };
      expect(equalColorObjects(first, second)).toBe(true);
    });

    test('возвращает false при различии в alpha', () => {
      const first = { r: 255, g: 0, b: 0, a: 1 };
      const second = { r: 255, g: 0, b: 0, a: 0.5 };
      expect(equalColorObjects(first, second)).toBe(false);
    });

    test('возвращает true для одной и той же ссылки', () => {
      const obj = { h: 180, s: 50, v: 50 };
      expect(equalColorObjects(obj, obj)).toBe(true);
    });
  });

  describe('equalColorString', () => {
    test('возвращает true для одинаковых строк', () => {
      expect(equalColorString('rgb(255, 0, 0)', 'rgb(255, 0, 0)')).toBe(true);
    });

    test('игнорирует пробелы', () => {
      expect(equalColorString('rgb(255, 0, 0)', 'rgb(255,0,0)')).toBe(true);
      expect(equalColorString('rgb(255, 0, 0)', 'rgb(255, 0,0)')).toBe(true);
    });

    test('возвращает false для разных строк', () => {
      expect(equalColorString('rgb(255, 0, 0)', 'rgb(0, 255, 0)')).toBe(false);
    });
  });

  describe('equalHex', () => {
    test('возвращает true для одинаковых hex в одном регистре', () => {
      expect(equalHex('#ff0000', '#ff0000')).toBe(true);
      expect(equalHex('ff0000', 'ff0000')).toBe(true);
    });

    test('возвращает true для hex в разном регистре', () => {
      expect(equalHex('#FF0000', '#ff0000')).toBe(true);
      expect(equalHex('FF0000', 'ff0000')).toBe(true);
    });

    test('возвращает false для разных hex', () => {
      expect(equalHex('#ff0000', '#00ff00')).toBe(false);
    });

    test('сравнивает сокращённые формы', () => {
      // Функция использует преобразование через hexToRgba, которое должно работать
      // Проверим, что #f00 и #ff0000 считаются равными
      expect(equalHex('#f00', '#ff0000')).toBe(true);
      expect(equalHex('#f00', '#f00')).toBe(true);
    });

    test('работает с alpha hex', () => {
      expect(equalHex('#ff0000ff', '#ff0000ff')).toBe(true);
      expect(equalHex('#ff0000ff', '#ff0000')).toBe(true);
      expect(equalHex('#ff0000', '#ff0000ff')).toBe(true);
    });
  });
});
