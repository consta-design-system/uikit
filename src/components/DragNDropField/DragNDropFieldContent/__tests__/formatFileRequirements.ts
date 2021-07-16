import { formatFileRequirements } from '../formatFileRequirements';

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
