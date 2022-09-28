import { formatFileRequirements } from '../formatFileRequirements';

describe('formatFileRequirements', () => {
  it('возвращает undefined, если требований нет', () => {
    expect(formatFileRequirements(undefined, undefined, undefined)).toBe(
      undefined,
    );
    expect(formatFileRequirements('', undefined, undefined)).toBe(undefined);
    expect(formatFileRequirements([], 0, 0)).toBe(undefined);
  });

  it('возвращает требования по форматам файла', () => {
    expect(formatFileRequirements(['.jpg', '.png'], undefined, undefined)).toBe(
      'Подходят файлы .jpg, .png',
    );
    expect(formatFileRequirements(['.jpg', '.png'], 0, 0)).toBe(
      'Подходят файлы .jpg, .png',
    );
  });

  it('возвращает требования по размеру файла', () => {
    expect(formatFileRequirements(undefined, 1024 * 1024, undefined)).toBe(
      'Подходят файлы до 1 Мб',
    );

    expect(formatFileRequirements(undefined, undefined, 1024 * 1024)).toBe(
      'Подходят файлы от 1 Мб',
    );

    expect(formatFileRequirements([], 1024 * 1024, 1024 * 1024)).toBe(
      'Подходят файлы от 1 Мб до 1Мб',
    );
  });

  it('возвращает требования по форматам и размеру файла', () => {
    expect(
      formatFileRequirements(['.jpg', '.png'], 1024 * 1024, 1024 * 1024),
    ).toBe('Подходят файлы .jpg, .png от 1 Мб до 1Мб');
  });
});
