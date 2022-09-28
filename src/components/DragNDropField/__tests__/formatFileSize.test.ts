import { formatFileSize } from '../formatFileSize';
import { defaultLocale } from '../locale';

describe('formatMaxFileSize', () => {
  it('форматирует байты', () => {
    expect(formatFileSize(1, defaultLocale)).toBe('1 байт');
    expect(formatFileSize(1023, defaultLocale)).toBe('1023 байт');
  });

  it('форматирует килобайты', () => {
    expect(formatFileSize(1024, defaultLocale)).toBe('1 Кб');
    expect(formatFileSize(1024 * 1024 - 1, defaultLocale)).toBe('1023.9 Кб');
  });

  it('форматирует мегабайты', () => {
    expect(formatFileSize(1024 * 1024, defaultLocale)).toBe('1 Мб');
    expect(formatFileSize(1024 * 1024 * 1024 - 1, defaultLocale)).toBe(
      '1023.9 Мб',
    );
  });

  it('форматирует гигабайты', () => {
    expect(formatFileSize(1024 * 1024 * 1024, defaultLocale)).toBe('1 Гб');
    expect(formatFileSize(1024 * 1024 * 1024 * 234.56, defaultLocale)).toBe(
      '234.5 Гб',
    );
  });
});
