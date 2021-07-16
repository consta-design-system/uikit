import { formatFileRequirements, formatMaxFileSize } from '../helpers';

describe('formatFileRequirements', () => {
  it('возвращает undefined, если требований нет', () => {
    expect(formatFileRequirements(undefined, undefined)).toBe(undefined);
    expect(formatFileRequirements('', undefined)).toBe(undefined);
    expect(formatFileRequirements([], 0)).toBe(undefined);
  });

  it('возвращает требования по форматам файла', () => {
    expect(formatFileRequirements(['.jpg', '.png'], undefined)).toBe(
      'Поддерживаемые форматы: .jpg, .png',
    );
    expect(formatFileRequirements(['.jpg', '.png'], 0)).toBe('Поддерживаемые форматы: .jpg, .png');
  });

  it('возвращает требования по размеру файла', () => {
    expect(formatFileRequirements(undefined, 1024 * 1024)).toBe('Размер файла до 1 Мбайт');
    expect(formatFileRequirements([], 1024 * 1024)).toBe('Размер файла до 1 Мбайт');
  });

  it('возвращает требования по форматам и размеру файла', () => {
    expect(formatFileRequirements(['.jpg', '.png'], 1024 * 1024)).toBe(
      'Поддерживаемые форматы: .jpg, .png, до 1 Мбайт',
    );
  });
});

describe('formatMaxFileSize', () => {
  it('форматирует байты', () => {
    expect(formatMaxFileSize(1)).toBe('1 байт');
    expect(formatMaxFileSize(1023)).toBe('1023 байт');
  });

  it('форматирует килобайты', () => {
    expect(formatMaxFileSize(1024)).toBe('1 Кбайт');
    expect(formatMaxFileSize(1024 * 1024 - 1)).toBe('1023.9 Кбайт');
  });

  it('форматирует мегабайты', () => {
    expect(formatMaxFileSize(1024 * 1024)).toBe('1 Мбайт');
    expect(formatMaxFileSize(1024 * 1024 * 1024 - 1)).toBe('1023.9 Мбайт');
  });

  it('форматирует гигабайты', () => {
    expect(formatMaxFileSize(1024 * 1024 * 1024)).toBe('1 Гбайт');
    expect(formatMaxFileSize(1024 * 1024 * 1024 * 234.56)).toBe('234.5 Гбайт');
  });
});
