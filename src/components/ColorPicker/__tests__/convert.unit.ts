import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import {
  hexToHsva,
  hexToHsvaRound,
  hexToRgba,
  hslaStringToHsva,
  hslaToHsl,
  hslaToHsva,
  hsvaStringToHsva,
  hsvaStringToHsvaRound,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHslaString,
  hsvaToHslString,
  hsvaToHsv,
  hsvaToHsvaString,
  hsvaToHsvRound,
  hsvaToHsvString,
  hsvaToRgba,
  hsvaToRgbaString,
  hsvaToRgbString,
  isHex,
  parseHue,
  rgbaStringToHsva,
  rgbaToHex,
  rgbaToHsva,
  rgbaToHsvaRound,
  rgbaToRgb,
  roundHsva,
} from '../utils/convert';

createRoot();
clearStack();

describe.concurrent('convert', () => {
  describe.concurrent('isHex', () => {
    test('возвращает true для строк, начинающихся с #', () => {
      expect(isHex('#ff0000')).toBe(true);
      expect(isHex('#abc')).toBe(true);
      expect(isHex('#12345678')).toBe(true);
    });

    test('возвращает false для строк без #', () => {
      expect(isHex('ff0000')).toBe(false);
      expect(isHex('abc')).toBe(false);
      expect(isHex('')).toBe(false);
    });
  });

  describe.concurrent('hexToRgba', () => {
    test('преобразует 6-значный hex в rgba', () => {
      expect(hexToRgba('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgba('#00ff00')).toEqual({ r: 0, g: 255, b: 0, a: 1 });
      expect(hexToRgba('#0000ff')).toEqual({ r: 0, g: 0, b: 255, a: 1 });
      expect(hexToRgba('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
      expect(hexToRgba('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
      // дополнительные цвета
      expect(hexToRgba('#ffa500')).toEqual({ r: 255, g: 165, b: 0, a: 1 });
      expect(hexToRgba('#800080')).toEqual({ r: 128, g: 0, b: 128, a: 1 });
      expect(hexToRgba('#808080')).toEqual({ r: 128, g: 128, b: 128, a: 1 });
      expect(hexToRgba('#00ffff')).toEqual({ r: 0, g: 255, b: 255, a: 1 });
    });

    test('преобразует 3-значный hex в rgba', () => {
      expect(hexToRgba('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgba('#0f0')).toEqual({ r: 0, g: 255, b: 0, a: 1 });
      expect(hexToRgba('#00f')).toEqual({ r: 0, g: 0, b: 255, a: 1 });
      expect(hexToRgba('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    });

    test('преобразует 8-значный hex с альфа-каналом', () => {
      expect(hexToRgba('#ff0000ff')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgba('#00ff0080')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
      expect(hexToRgba('#0000ff00')).toEqual({ r: 0, g: 0, b: 255, a: 0 });
    });

    test('преобразует 4-значный hex с альфа-каналом', () => {
      expect(hexToRgba('#f00f')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgba('#0f08')).toEqual({ r: 0, g: 255, b: 0, a: 0.53 });
      // 0x88 = 136, 136/255 ≈ 0.5333, округляется до 0.53 из-за round(a,2)
    });

    test('работает без префикса #', () => {
      expect(hexToRgba('ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });
  });

  describe.concurrent('hexToHsva', () => {
    test('преобразует hex в hsva', () => {
      expect(hexToHsva('#ff0000')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(hexToHsva('#00ff00')).toEqual({ h: 120, s: 100, v: 100, a: 1 });
      expect(hexToHsva('#0000ff')).toEqual({ h: 240, s: 100, v: 100, a: 1 });
      expect(hexToHsva('#ffffff')).toEqual({ h: 0, s: 0, v: 100, a: 1 });
      expect(hexToHsva('#000000')).toEqual({ h: 0, s: 0, v: 0, a: 1 });
      // дополнительные цвета
      expect(hexToHsva('#ffff00')).toEqual({ h: 60, s: 100, v: 100, a: 1 });
      expect(hexToHsva('#800080')).toEqual({
        h: 300,
        s: 100,
        v: 50.19607843137255,
        a: 1,
      });
      expect(hexToHsva('#808080')).toEqual({
        h: 0,
        s: 0,
        v: 50.19607843137255,
        a: 1,
      });
      expect(hexToHsva('#00ffff')).toEqual({ h: 180, s: 100, v: 100, a: 1 });
    });
  });

  describe.concurrent('hexToHsvaRound', () => {
    test('преобразует hex в hsva с округлением', () => {
      // Округление до целых для h, s, v и до двух знаков для a
      expect(hexToHsvaRound('#ff0000')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(hexToHsvaRound('#00ff00')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hexToHsvaRound('#0000ff')).toEqual({
        h: 240,
        s: 100,
        v: 100,
        a: 1,
      });
      // дополнительные цвета
      expect(hexToHsvaRound('#ffff00')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hexToHsvaRound('#800080')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 1,
      });
      expect(hexToHsvaRound('#808080')).toEqual({
        h: 0,
        s: 0,
        v: 50,
        a: 1,
      });
      expect(hexToHsvaRound('#00ffff')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
    });
  });
  describe.concurrent('parseHue', () => {
    test('преобразует градусы в градусы', () => {
      expect(parseHue('180', 'deg')).toBe(180);
      expect(parseHue('180')).toBe(180);
    });

    test('преобразует грады в градусы', () => {
      expect(parseHue('200', 'grad')).toBe(180); // 200 * (360/400) = 180
    });

    test('преобразует радианы в градусы', () => {
      expect(parseHue('3.1415926535', 'rad')).toBeCloseTo(180, 5);
    });

    test('преобразует обороты в градусы', () => {
      expect(parseHue('0.5', 'turn')).toBe(180);
    });
  });

  describe.concurrent('hslaToHsva', () => {
    test('преобразует hsla в hsva', () => {
      expect(hslaToHsva({ h: 0, s: 100, l: 50, a: 1 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaToHsva({ h: 120, s: 100, l: 50, a: 0.5 })).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 0.5,
      });
      expect(hslaToHsva({ h: 0, s: 0, l: 0, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 0,
        a: 1,
      });
      expect(hslaToHsva({ h: 0, s: 0, l: 100, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 100,
        a: 1,
      });
      // дополнительные цвета
      expect(hslaToHsva({ h: 60, s: 100, l: 50, a: 0.8 })).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(hslaToHsva({ h: 300, s: 100, l: 25, a: 0.3 })).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 0.3,
      });
      expect(hslaToHsva({ h: 180, s: 100, l: 50, a: 0 })).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 0,
      });
      expect(hslaToHsva({ h: 0, s: 0, l: 50, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 50,
        a: 1,
      });
    });
  });

  describe.concurrent('hsvaToHsla', () => {
    test('преобразует hsva в hsla', () => {
      expect(hsvaToHsla({ h: 0, s: 100, v: 100, a: 1 })).toEqual({
        h: 0,
        s: 100,
        l: 50,
        a: 1,
      });
      expect(hsvaToHsla({ h: 120, s: 100, v: 100, a: 0.5 })).toEqual({
        h: 120,
        s: 100,
        l: 50,
        a: 0.5,
      });
      expect(hsvaToHsla({ h: 0, s: 0, v: 0, a: 1 })).toEqual({
        h: 0,
        s: 0,
        l: 0,
        a: 1,
      });
      expect(hsvaToHsla({ h: 0, s: 0, v: 100, a: 1 })).toEqual({
        h: 0,
        s: 0,
        l: 100,
        a: 1,
      });
      // дополнительные цвета
      expect(hsvaToHsla({ h: 60, s: 100, v: 100, a: 0.8 })).toEqual({
        h: 60,
        s: 100,
        l: 50,
        a: 0.8,
      });
      expect(hsvaToHsla({ h: 300, s: 100, v: 50, a: 0.3 })).toEqual({
        h: 300,
        s: 100,
        l: 25,
        a: 0.3,
      });
      expect(hsvaToHsla({ h: 180, s: 100, v: 100, a: 0 })).toEqual({
        h: 180,
        s: 100,
        l: 50,
        a: 0,
      });
      expect(hsvaToHsla({ h: 0, s: 0, v: 50, a: 1 })).toEqual({
        h: 0,
        s: 0,
        l: 50,
        a: 1,
      });
    });
  });

  describe.concurrent('hsvaToRgba', () => {
    test('преобразует hsva в rgba', () => {
      expect(hsvaToRgba({ h: 0, s: 100, v: 100, a: 1 })).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 1,
      });
      expect(hsvaToRgba({ h: 120, s: 100, v: 100, a: 1 })).toEqual({
        r: 0,
        g: 255,
        b: 0,
        a: 1,
      });
      expect(hsvaToRgba({ h: 240, s: 100, v: 100, a: 1 })).toEqual({
        r: 0,
        g: 0,
        b: 255,
        a: 1,
      });
      expect(hsvaToRgba({ h: 0, s: 0, v: 100, a: 1 })).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      });
      expect(hsvaToRgba({ h: 0, s: 0, v: 0, a: 1 })).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
      // дополнительные цвета
      expect(hsvaToRgba({ h: 60, s: 100, v: 100, a: 0.8 })).toEqual({
        r: 255,
        g: 255,
        b: 0,
        a: 0.8,
      });
      expect(hsvaToRgba({ h: 300, s: 100, v: 50, a: 0.3 })).toEqual({
        r: 128,
        g: 0,
        b: 128,
        a: 0.3,
      });
      expect(hsvaToRgba({ h: 180, s: 100, v: 100, a: 0 })).toEqual({
        r: 0,
        g: 255,
        b: 255,
        a: 0,
      });
      expect(hsvaToRgba({ h: 0, s: 0, v: 50, a: 1 })).toEqual({
        r: 128,
        g: 128,
        b: 128,
        a: 1,
      });
    });
  });

  describe.concurrent('rgbaToHsva', () => {
    test('преобразует rgba в hsva', () => {
      expect(rgbaToHsva({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaToHsva({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaToHsva({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
        h: 240,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaToHsva({ r: 255, g: 255, b: 255, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 100,
        a: 1,
      });
      expect(rgbaToHsva({ r: 0, g: 0, b: 0, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 0,
        a: 1,
      });
      // дополнительные цвета
      expect(rgbaToHsva({ r: 255, g: 255, b: 0, a: 0.8 })).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(rgbaToHsva({ r: 128, g: 0, b: 128, a: 0.3 })).toEqual({
        h: 300,
        s: 100,
        v: 50.19607843137255,
        a: 0.3,
      });
      expect(rgbaToHsva({ r: 0, g: 255, b: 255, a: 0 })).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 0,
      });
      expect(rgbaToHsva({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 50.19607843137255,
        a: 1,
      });
    });
  });

  describe.concurrent('hsvaToHex', () => {
    test('преобразует hsva в hex', () => {
      expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 1 })).toBe('#ff0000');
      expect(hsvaToHex({ h: 120, s: 100, v: 100, a: 1 })).toBe('#00ff00');
      expect(hsvaToHex({ h: 240, s: 100, v: 100, a: 1 })).toBe('#0000ff');
      expect(hsvaToHex({ h: 0, s: 0, v: 100, a: 1 })).toBe('#ffffff');
      expect(hsvaToHex({ h: 0, s: 0, v: 0, a: 1 })).toBe('#000000');
      // дополнительные цвета
      expect(hsvaToHex({ h: 60, s: 100, v: 100, a: 1 })).toBe('#ffff00');
      expect(hsvaToHex({ h: 300, s: 100, v: 50, a: 1 })).toBe('#800080');
      expect(hsvaToHex({ h: 180, s: 100, v: 100, a: 1 })).toBe('#00ffff');
      expect(hsvaToHex({ h: 0, s: 0, v: 50, a: 1 })).toBe('#808080');
    });

    test('преобразует hsva с альфа-каналом в hex с альфа-каналом', () => {
      expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 0.5 })).toBe('#ff000080');
      expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 0 })).toBe('#ff000000');
      // дополнительные цвета с альфа-каналом
      expect(hsvaToHex({ h: 60, s: 100, v: 100, a: 0.8 })).toBe('#ffff00cc');
      expect(hsvaToHex({ h: 300, s: 100, v: 50, a: 0.3 })).toBe('#8000804d');
    });
  });

  describe.concurrent('rgbaToHex', () => {
    test('преобразует rgba в hex', () => {
      expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 1 })).toBe('#ff0000');
      expect(rgbaToHex({ r: 0, g: 255, b: 0, a: 1 })).toBe('#00ff00');
      expect(rgbaToHex({ r: 0, g: 0, b: 255, a: 1 })).toBe('#0000ff');
      expect(rgbaToHex({ r: 255, g: 255, b: 255, a: 1 })).toBe('#ffffff');
      expect(rgbaToHex({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000000');
      // дополнительные цвета
      expect(rgbaToHex({ r: 255, g: 255, b: 0, a: 1 })).toBe('#ffff00');
      expect(rgbaToHex({ r: 128, g: 0, b: 128, a: 1 })).toBe('#800080');
      expect(rgbaToHex({ r: 0, g: 255, b: 255, a: 1 })).toBe('#00ffff');
      expect(rgbaToHex({ r: 128, g: 128, b: 128, a: 1 })).toBe('#808080');
    });

    test('преобразует rgba с альфа-каналом в hex с альфа-каналом', () => {
      expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('#ff000080');
      expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 0 })).toBe('#ff000000');
      // дополнительные цвета с альфа-каналом
      expect(rgbaToHex({ r: 255, g: 255, b: 0, a: 0.8 })).toBe('#ffff00cc');
      expect(rgbaToHex({ r: 128, g: 0, b: 128, a: 0.3 })).toBe('#8000804d');
    });
  });
  describe.concurrent('hslaStringToHsva', () => {
    test('преобразует строку hsl в hsva', () => {
      expect(hslaStringToHsva('hsl(0, 100%, 50%)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(120, 100%, 50%)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(0, 0%, 0%)')).toEqual({
        h: 0,
        s: 0,
        v: 0,
        a: 1,
      });
      // дополнительные цвета
      expect(hslaStringToHsva('hsl(60, 100%, 50%)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(300, 100%, 25%)')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(180, 100%, 50%)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(0, 0%, 50%)')).toEqual({
        h: 0,
        s: 0,
        v: 50,
        a: 1,
      });
    });

    test('преобразует строку hsla в hsva', () => {
      expect(hslaStringToHsva('hsla(0, 100%, 50%, 0.5)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.5,
      });
      expect(hslaStringToHsva('hsla(120, 100%, 50%, 0)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 0,
      });
      // дополнительные цвета с альфа-каналом
      expect(hslaStringToHsva('hsla(60, 100%, 50%, 0.8)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(hslaStringToHsva('hsla(300, 100%, 25%, 0.3)')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 0.3,
      });
    });

    test('обрабатывает разные единицы измерения hue', () => {
      expect(hslaStringToHsva('hsl(180deg, 100%, 50%)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hslaStringToHsva('hsl(200grad, 100%, 50%)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
      const result = hslaStringToHsva('hsl(3.14159rad, 100%, 50%)');
      expect(result.h).toBeCloseTo(180, 3);
      expect(result.s).toBe(100);
      expect(result.v).toBe(100);
      expect(result.a).toBe(1);
      expect(hslaStringToHsva('hsl(0.5turn, 100%, 50%)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
    });
  });

  describe.concurrent('hsvaStringToHsva', () => {
    test('преобразует строку hsv в hsva', () => {
      expect(hsvaStringToHsva('hsv(0, 100%, 100%)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hsvaStringToHsva('hsv(120, 100%, 100%)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 1,
      });
      // дополнительные цвета
      expect(hsvaStringToHsva('hsv(60, 100%, 100%)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hsvaStringToHsva('hsv(300, 100%, 50%)')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 1,
      });
      expect(hsvaStringToHsva('hsv(180, 100%, 100%)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(hsvaStringToHsva('hsv(0, 0%, 50%)')).toEqual({
        h: 0,
        s: 0,
        v: 50,
        a: 1,
      });
    });

    test('преобразует строку hsva в hsva', () => {
      expect(hsvaStringToHsva('hsva(0, 100%, 100%, 0.5)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.5,
      });
      expect(hsvaStringToHsva('hsva(120, 100%, 100%, 0)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 0,
      });
      // дополнительные цвета с альфа-каналом
      expect(hsvaStringToHsva('hsva(60, 100%, 100%, 0.8)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(hsvaStringToHsva('hsva(300, 100%, 50%, 0.3)')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 0.3,
      });
    });
  });

  describe.concurrent('rgbaStringToHsva', () => {
    test('преобразует строку rgb в hsva', () => {
      expect(rgbaStringToHsva('rgb(255, 0, 0)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgb(0, 255, 0)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgb(0, 0, 255)')).toEqual({
        h: 240,
        s: 100,
        v: 100,
        a: 1,
      });
      // дополнительные цвета
      expect(rgbaStringToHsva('rgb(255, 255, 0)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgb(128, 0, 128)')).toEqual({
        h: 300,
        s: 100,
        v: 50.19607843137255,
        a: 1,
      });
      expect(rgbaStringToHsva('rgb(0, 255, 255)')).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgb(128, 128, 128)')).toEqual({
        h: 0,
        s: 0,
        v: 50.19607843137255,
        a: 1,
      });
    });

    test('преобразует строку rgba в hsva', () => {
      expect(rgbaStringToHsva('rgba(255, 0, 0, 0.5)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.5,
      });
      expect(rgbaStringToHsva('rgba(0, 255, 0, 0)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 0,
      });
      // дополнительные цвета с альфа-каналом
      expect(rgbaStringToHsva('rgba(255, 255, 0, 0.8)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(rgbaStringToHsva('rgba(128, 0, 128, 0.3)')).toEqual({
        h: 300,
        s: 100,
        v: 50.19607843137255,
        a: 0.3,
      });
    });

    test('обрабатывает проценты', () => {
      expect(rgbaStringToHsva('rgb(100%, 0%, 0%)')).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgba(0%, 100%, 0%, 50%)')).toEqual({
        h: 120,
        s: 100,
        v: 100,
        a: 0.5,
      });
      // дополнительные цвета в процентах
      expect(rgbaStringToHsva('rgb(100%, 100%, 0%)')).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 1,
      });
      expect(rgbaStringToHsva('rgba(50%, 0%, 50%, 30%)')).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 0.3,
      });
    });
  });

  describe.concurrent('hsvaToHslString', () => {
    test('возвращает строку hsl', () => {
      expect(hsvaToHslString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'hsl(0, 100%, 50%)',
      );
      expect(hsvaToHslString({ h: 120, s: 100, v: 100, a: 1 })).toBe(
        'hsl(120, 100%, 50%)',
      );
      // дополнительные цвета
      expect(hsvaToHslString({ h: 60, s: 100, v: 100, a: 1 })).toBe(
        'hsl(60, 100%, 50%)',
      );
      expect(hsvaToHslString({ h: 300, s: 100, v: 50, a: 1 })).toBe(
        'hsl(300, 100%, 25%)',
      );
      expect(hsvaToHslString({ h: 180, s: 100, v: 100, a: 1 })).toBe(
        'hsl(180, 100%, 50%)',
      );
      expect(hsvaToHslString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'hsl(0, 0%, 50%)',
      );
    });
  });

  describe.concurrent('hsvaToHslaString', () => {
    test('возвращает строку hsla', () => {
      expect(hsvaToHslaString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'hsla(0, 100%, 50%, 1)',
      );
      expect(hsvaToHslaString({ h: 120, s: 100, v: 100, a: 0.5 })).toBe(
        'hsla(120, 100%, 50%, 0.5)',
      );
      // дополнительные цвета
      expect(hsvaToHslaString({ h: 60, s: 100, v: 100, a: 0.8 })).toBe(
        'hsla(60, 100%, 50%, 0.8)',
      );
      expect(hsvaToHslaString({ h: 300, s: 100, v: 50, a: 0.3 })).toBe(
        'hsla(300, 100%, 25%, 0.3)',
      );
      expect(hsvaToHslaString({ h: 180, s: 100, v: 100, a: 0 })).toBe(
        'hsla(180, 100%, 50%, 0)',
      );
      expect(hsvaToHslaString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'hsla(0, 0%, 50%, 1)',
      );
    });
  });

  describe.concurrent('hsvaToHsvString', () => {
    test('возвращает строку hsv', () => {
      expect(hsvaToHsvString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'hsv(0, 100%, 100%)',
      );
      expect(hsvaToHsvString({ h: 120, s: 100, v: 100, a: 1 })).toBe(
        'hsv(120, 100%, 100%)',
      );
      // дополнительные цвета
      expect(hsvaToHsvString({ h: 60, s: 100, v: 100, a: 1 })).toBe(
        'hsv(60, 100%, 100%)',
      );
      expect(hsvaToHsvString({ h: 300, s: 100, v: 50, a: 1 })).toBe(
        'hsv(300, 100%, 50%)',
      );
      expect(hsvaToHsvString({ h: 180, s: 100, v: 100, a: 1 })).toBe(
        'hsv(180, 100%, 100%)',
      );
      expect(hsvaToHsvString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'hsv(0, 0%, 50%)',
      );
    });
  });

  describe.concurrent('hsvaToHsvaString', () => {
    test('возвращает строку hsva', () => {
      expect(hsvaToHsvaString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'hsva(0, 100%, 100%, 1)',
      );
      expect(hsvaToHsvaString({ h: 120, s: 100, v: 100, a: 0.5 })).toBe(
        'hsva(120, 100%, 100%, 0.5)',
      );
      // дополнительные цвета
      expect(hsvaToHsvaString({ h: 60, s: 100, v: 100, a: 0.8 })).toBe(
        'hsva(60, 100%, 100%, 0.8)',
      );
      expect(hsvaToHsvaString({ h: 300, s: 100, v: 50, a: 0.3 })).toBe(
        'hsva(300, 100%, 50%, 0.3)',
      );
      expect(hsvaToHsvaString({ h: 180, s: 100, v: 100, a: 0 })).toBe(
        'hsva(180, 100%, 100%, 0)',
      );
      expect(hsvaToHsvaString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'hsva(0, 0%, 50%, 1)',
      );
    });
  });

  describe.concurrent('hsvaToRgbString', () => {
    test('возвращает строку rgb', () => {
      expect(hsvaToRgbString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'rgb(255, 0, 0)',
      );
      expect(hsvaToRgbString({ h: 120, s: 100, v: 100, a: 1 })).toBe(
        'rgb(0, 255, 0)',
      );
      // дополнительные цвета
      expect(hsvaToRgbString({ h: 60, s: 100, v: 100, a: 1 })).toBe(
        'rgb(255, 255, 0)',
      );
      expect(hsvaToRgbString({ h: 300, s: 100, v: 50, a: 1 })).toBe(
        'rgb(128, 0, 128)',
      );
      expect(hsvaToRgbString({ h: 180, s: 100, v: 100, a: 1 })).toBe(
        'rgb(0, 255, 255)',
      );
      expect(hsvaToRgbString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'rgb(128, 128, 128)',
      );
    });
  });

  describe.concurrent('hsvaToRgbaString', () => {
    test('возвращает строку rgba', () => {
      expect(hsvaToRgbaString({ h: 0, s: 100, v: 100, a: 1 })).toBe(
        'rgba(255, 0, 0, 1)',
      );
      expect(hsvaToRgbaString({ h: 120, s: 100, v: 100, a: 0.5 })).toBe(
        'rgba(0, 255, 0, 0.5)',
      );
      // дополнительные цвета
      expect(hsvaToRgbaString({ h: 60, s: 100, v: 100, a: 0.8 })).toBe(
        'rgba(255, 255, 0, 0.8)',
      );
      expect(hsvaToRgbaString({ h: 300, s: 100, v: 50, a: 0.3 })).toBe(
        'rgba(128, 0, 128, 0.3)',
      );
      expect(hsvaToRgbaString({ h: 180, s: 100, v: 100, a: 0 })).toBe(
        'rgba(0, 255, 255, 0)',
      );
      expect(hsvaToRgbaString({ h: 0, s: 0, v: 50, a: 1 })).toBe(
        'rgba(128, 128, 128, 1)',
      );
    });
  });
  describe.concurrent('roundHsva', () => {
    test('округляет компоненты hsva', () => {
      expect(roundHsva({ h: 0.4, s: 99.6, v: 100.2, a: 0.666666 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.67,
      });
      expect(roundHsva({ h: 179.9, s: 0.1, v: 0.9, a: 0.123456 })).toEqual({
        h: 180,
        s: 0,
        v: 1,
        a: 0.12,
      });
      // дополнительные цвета
      expect(roundHsva({ h: 60.7, s: 99.9, v: 100.1, a: 0.555555 })).toEqual({
        h: 61,
        s: 100,
        v: 100,
        a: 0.56,
      });
      expect(roundHsva({ h: 300.2, s: 50.4, v: 49.8, a: 0.987654 })).toEqual({
        h: 300,
        s: 50,
        v: 50,
        a: 0.99,
      });
      expect(roundHsva({ h: 180.5, s: 0.0, v: 50.5, a: 0.0 })).toEqual({
        h: 181,
        s: 0,
        v: 51,
        a: 0.0,
      });
      expect(roundHsva({ h: 0.0, s: 0.0, v: 0.0, a: 1.0 })).toEqual({
        h: 0,
        s: 0,
        v: 0,
        a: 1.0,
      });
    });
  });

  describe.concurrent('rgbaToRgb', () => {
    test('удаляет альфа-канал', () => {
      expect(rgbaToRgb({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
        r: 255,
        g: 0,
        b: 0,
      });
    });
  });

  describe.concurrent('hslaToHsl', () => {
    test('удаляет альфа-канал', () => {
      expect(hslaToHsl({ h: 0, s: 100, l: 50, a: 0.5 })).toEqual({
        h: 0,
        s: 100,
        l: 50,
      });
    });
  });

  describe.concurrent('hsvaToHsv', () => {
    test('удаляет альфа-канал', () => {
      expect(hsvaToHsv({ h: 0, s: 100, v: 100, a: 0.5 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
      });
    });
  });

  describe.concurrent('hsvaToHsvRound', () => {
    test('удаляет альфа-канал и округляет', () => {
      expect(hsvaToHsvRound({ h: 0.4, s: 99.6, v: 100.2, a: 0.5 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
      });
    });
  });

  describe.concurrent('rgbaToHsvaRound', () => {
    test('преобразует rgba в hsva с округлением', () => {
      expect(rgbaToHsvaRound({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.5,
      });
      // дополнительные цвета
      expect(rgbaToHsvaRound({ r: 255, g: 255, b: 0, a: 0.8 })).toEqual({
        h: 60,
        s: 100,
        v: 100,
        a: 0.8,
      });
      expect(rgbaToHsvaRound({ r: 128, g: 0, b: 128, a: 0.3 })).toEqual({
        h: 300,
        s: 100,
        v: 50,
        a: 0.3,
      });
      expect(rgbaToHsvaRound({ r: 0, g: 255, b: 255, a: 0 })).toEqual({
        h: 180,
        s: 100,
        v: 100,
        a: 0,
      });
      expect(rgbaToHsvaRound({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
        h: 0,
        s: 0,
        v: 50,
        a: 1,
      });
    });
  });

  describe.concurrent('hsvaStringToHsvaRound', () => {
    test('преобразует строку hsva в hsva с округлением', () => {
      expect(
        hsvaStringToHsvaRound('hsva(0.4, 99.6%, 100.2%, 0.666666)'),
      ).toEqual({
        h: 0,
        s: 100,
        v: 100,
        a: 0.67,
      });
      // дополнительные цвета
      expect(
        hsvaStringToHsvaRound('hsva(60.7, 99.9%, 100.1%, 0.555555)'),
      ).toEqual({
        h: 61,
        s: 100,
        v: 100,
        a: 0.56,
      });
      expect(
        hsvaStringToHsvaRound('hsva(300.2, 50.4%, 49.8%, 0.987654)'),
      ).toEqual({
        h: 300,
        s: 50,
        v: 50,
        a: 0.99,
      });
      expect(hsvaStringToHsvaRound('hsva(180.5, 0%, 50.5%, 0)')).toEqual({
        h: 181,
        s: 0,
        v: 51,
        a: 0.0,
      });
      expect(hsvaStringToHsvaRound('hsva(0, 0%, 0%, 1)')).toEqual({
        h: 0,
        s: 0,
        v: 0,
        a: 1.0,
      });
    });
  });
});
