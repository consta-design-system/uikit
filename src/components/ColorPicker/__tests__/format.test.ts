import { formatClassName } from '../utils/format';

describe('formatClassName', () => {
  it('объединяет непустые строки через пробел', () => {
    expect(formatClassName(['class1', 'class2', 'class3'])).toBe(
      'class1 class2 class3',
    );
  });

  it('игнорирует пустые значения', () => {
    expect(
      formatClassName(['class1', '', 'class2', null, undefined, 'class3']),
    ).toBe('class1 class2 class3');
  });

  it('возвращает пустую строку, если все значения пустые', () => {
    expect(formatClassName([null, undefined, ''])).toBe('');
  });

  it('обрабатывает массив из одного элемента', () => {
    expect(formatClassName(['single'])).toBe('single');
  });
});
